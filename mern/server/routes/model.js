import express from 'express'
import multer from 'multer';
import { createModel, getModelsByUser, updateModel, deleteModel, getModelById, beginModelTraining } from '../controllers/aiModelController.js'
const router = express.Router();

// Our model will have to give live updates back to the client during training.
// I've wrapped these routes in a function that takes in a socket input/output object so that any of our routes can communicate
// with the front-end live.
export default (io) => {

    // Route to begin training. This 'multer' thing just specifies that any files that the user uploads will be be stored
    // in the 'uploads/' path. Our relative path is the server/ folder, so user uploaded files will be in 'server/uploads'
    // The file will be uploaded BEFORE 'beginModelTraining()' is called, so we can guarantee access inside the API route
    const upload = multer({ dest: 'uploads/' });
    router.post('/createModel', upload.single('csvFile'), (req, res) => {
        // Our POST request API to create a model will call the beginModelTraining API which will take in that socket IO object so it can communicate with the
        // front end in real time.
        beginModelTraining(req, res, io);
    });

    // Route to get all models for a specific user
    router.get('/user/:userId', getModelsByUser);

    // Route to get a single model by ID
    router.get('/:id', getModelById);

    // Route to update a model
    router.put('/:id', updateModel);

    // Route to delete a model
    router.delete('/:id', deleteModel);

    return router;
};

// export default router 