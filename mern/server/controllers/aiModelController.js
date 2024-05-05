import Model from '../models/aiModel.js';
import User from '../models/userModel.js';
import logger from '../logger.js';
import mongoose from 'mongoose';
import { spawn } from 'child_process'
import { io } from 'socket.io-client'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import gfs from 'gridfs-stream'

export const makrPrediction = async (req, res, io) => {
    const modelId = req.body._id;
    const csvFilePath = 'uploads/' + req.file.filename
    const pyPredictFile = 'python/testing.py'
    const pythonProcess = spawn('python3', [pyPredictFile, '-csvp', csvFilePath, '-id', modelId]);
   
    // Log any errors from executing the python script (bruh this saved so much trouble...)
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });


    pythonProcess.stdout.on('data', (data) => {
        // ANY data that has been printed to the console from ANY of the python files executed will be captured here and converted to a string
        const update = data.toString();
        // Log the output to the console for our own sake (debugging mainly)
        console.log(`Python output: ${update}`);

        // THIS IS THE LINE THAT ACTUALLY BEAMS THE UPDATE BACK TO THE CLIENT.
        // This 'predict_update' string is special! Notice how this is the *exact same string* that is inside of 
        // client/pages/modelProgressPage/ModelProgress.jsx
        io.emit('predict_update', update);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Model prediction finished. Python process exited with code ${code}`);
        res.status(200).send("Model tarining complete");
    });


}

export const beginModelTraining = async (req, res, io) => {

    const modelName = req.body.modelName;
    const modelType = req.body.modelType;
    const userId = req.body.userId;
    const predictVariable = req.body.selectedColumn
    let modelId; // Declare the variable outside the try-catch block to widen its scope

    try {
        // check if the referenced user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create the model document in the database
        const newModel = await Model.create({
            model_name: modelName,
            model_type: modelType,
            user: userId,  // This assumes that userId is correctly formatted as an ObjectId
            model_address : predictVariable //This isn't model_address, but instead it's the label that the user want to predict.
        });

        // Accessing the ObjectId of the newly created model
        modelId = newModel._id;

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    console.log("Training request recieved for: " + modelName + " of type: " + modelType + " from: " + userId)

    // files uploaded by the user are temporarily stored in /server/uploads. Use this folder to retrieve the CSV file.
    // Start a Python process. The relative path is just the server folder, NOT the current directory.
    // Grab the CSV file the user has just uploaded
    const csvFilePath = 'uploads/' + req.file.filename
    console.log("Path of user uploaded file: " + csvFilePath)
    const pyTrainFile = 'python/training.py'
    //const pyAnalyseFile = 'python/analyse.py'
    console.log("Selected variable for prediction: " + predictVariable)

    const process = 'once'


    // we do not need to use python/analyse.py to generate schemas anymore it will be done in training.py
    //const analyzeCsvPythonProcess = spawn('python', [pyAnalyseFile, '-csvp', csvFilePath, '-schema_file', req.file.filename + '.json', '-id', 'schemas'])
    //const schemaPath = 'schemas/' + req.file.filename + '.json'
    //const pythonProcess = spawn('python', [pyTrainFile, '-csvp', csvFilePath, '-schemap', schemaPath, '-id', modelId, '-l', predictVariable, '-p', process, '-m', modelType, '-pickle', modelId]);
    const pythonProcess = spawn('python3', ['-u', pyTrainFile, '-csvp', csvFilePath, '-id', modelId, '-l', predictVariable, '-p', process, '-m', modelType]);

    // Log any errors from executing the python script (bruh this saved so much trouble...)
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    // THIS is how we communicate live data back to the client.
    // In the python files, wherever you want to output data, make sure you print it like this:

    // ``` print("Print something here", flush=True) ```

    // Setting flush=True flushes the buffer immediately and lets our backend capture these inputs
    // inside this function through 'stdout'
    pythonProcess.stdout.on('data', (data) => {
        // ANY data that has been printed to the console from ANY of the python files executed will be captured here and converted to a string
        const update = data.toString();
        // Log the output to the console for our own sake (debugging mainly)
        console.log(`Python output: ${update}`);

        // THIS IS THE LINE THAT ACTUALLY BEAMS THE UPDATE BACK TO THE CLIENT.
        // This 'training_update' string is special! Notice how this is the *exact same string* that is inside of 
        // client/pages/modelProgressPage/ModelProgress.jsx
        io.emit('training_update', update);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Model training finished. Python process exited with code ${code}`);
        res.status(200).send("Model tarining complete");
    });

};

export const getModelsByUser = async (req, res) => {
    logger.logRequestDetails(req);
    const userId = req.params.userId; // Retrieve the user ID from the URL parameters

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json([{ message: "User not found." }]);
        }

        // Find models associated with this user
        const models = await Model.find({ user: user._id });
        if (models.length === 0) {
            // If no models are found, send a 200 response with a message
            res.status(200).json([]);
        } else {
            // If models are found, send them in the response
            res.status(200).json(models);
        }
    } catch (error) {
        // Handle errors and respond accordingly
        res.status(500).json({ error: error.message });
    }
};

// Update a model
export const updateModel = async (req, res) => {
    logger.logRequestDetails(req);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such model' })
    }
    const { model_address, metaData_address, model_description, model_type } = req.body;
    try {
        const model = await Model.findByIdAndUpdate(id, {
            model_address,
            metaData_address,
            model_description,
            model_type
        }, { new: true });
        if (!model) {
            return res.status(404).json({ error: "Model not found" });
        }
        res.status(200).json(model);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a model
export const deleteModel = async (req, res) => {
    logger.logRequestDetails(req);
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such model' })
    }

    const modelDir = path.join(__dirname, '../binary', id);

    try {
        const model = await Model.findByIdAndDelete(id);
        if (!model) {
            return res.status(404).json({ error: "Model not found" });
        }

        // Check if the directory exists and remove it
        try {
            await fs.promises.access(modelDir, fs.constants.F_OK);
            await fs.promises.rm(modelDir, { recursive: true, force: true }); // `rm` with options for recursive and force
            console.log(`Directory ${modelDir} deleted successfully`);
        } catch (dirError) {
            if (dirError.code === 'ENOENT') {
                // ENOENT is the error code for "No such file or directory", ignore it
                console.log(`Directory does not exist, no action needed: ${modelDir}`);
            } else {
                // Log other errors that might indicate more serious problems
                console.error(`Error while attempting to delete directory: ${dirError}`);
            }
        }
        
        res.status(200).json({ message: "Model deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single model by its ID
export const getModelById = async (req, res) => {
    logger.logRequestDetails(req);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such model' })
    }
    try {
        const model = await Model.findById(id);
        if (!model) {
            return res.status(404).json({ error: "Model not found" });
        }
        res.status(200).json(model);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

