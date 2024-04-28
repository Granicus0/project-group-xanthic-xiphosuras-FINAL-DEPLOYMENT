import express from 'express'
import multer from 'multer';
import { createModel, getModelsByUser, updateModel, deleteModel, getModelById, beginModelTraining } from '../controllers/aiModelController.js'
const router = express.Router();

export default (io) => {

    // Route to begin training
    const upload = multer({ dest: 'uploads/' });
    router.post('/createModel', upload.single('csvFile'), (req, res) => {
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