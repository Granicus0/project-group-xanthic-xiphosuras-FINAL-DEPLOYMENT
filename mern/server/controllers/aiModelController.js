import Model from '../models/aiModel.js';
import User from '../models/userModel.js';
import logger from '../logger.js';
import mongoose from 'mongoose';
import { spawn } from 'child_process'
import { io } from 'socket.io-client'


export const createModel = async (req, res) => {

    logger.logRequestDetails(req);

    const { model_name, model_address, metaData_address, model_description, model_type, user } = req.body;

    try {
        // Optionally check if the referenced user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const model = new Model({
            model_name,
            model_address,
            metaData_address,
            model_description,
            model_type,
            user
        });
        await model.save();
        res.status(201).json(model);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const beginModelTraining = async (req, res, io) => {

    const csvFile = req.file;
    const modelName = req.body.modelName;
    const modelType = req.body.modelType;

    // files uploaded by the user are temporarily stored in /server/uploads. Use this folder to retrieve the CSV file.
    // Start a Python process. The relative path is just the server folder, NOT the current directory.
    const pythonProcess = spawn('python3', ['python_demo/training.py', '-csvp', 'python_demo/Dataset/adult.csv', '-schemap', 'python_demo/schemas/adult_train_schema.json', '-id', '3', '-l', 'income', '-p', 'once', '-m', 'RF']);

    // Log any errors from executing the python script (bruh this saved so much trouble...)
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonProcess.stdout.on('data', (data) => {
        const update = data.toString();
        console.log(`Python output: ${update}`);
        io.emit('training_update', update); 
    });

    // On process completion 
    pythonProcess.on('close', (code) => {
        console.log(`Model training finished. Python process exited with code ${code}`);
        res.status(200).send('Model training finished');
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

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such model' })
    }
    try {
        const model = await Model.findByIdAndDelete(id);
        if (!model) {
            return res.status(404).json({ error: "Model not found" });
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

