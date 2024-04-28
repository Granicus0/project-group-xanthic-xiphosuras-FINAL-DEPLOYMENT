import express from 'express'

// Controller functions from user controller
import { createModel, getModelsByUser, updateModel, deleteModel, getModelById} from '../controllers/aiModelController.js'
const router = express.Router();


// Route to create a new model
router.post('/createModel', createModel);

// Route to get all models for a specific user
router.get('/user/:userId', getModelsByUser);

// Route to get a single model by ID
router.get('/:id', getModelById);

// Route to update a model
router.put('/:id', updateModel);

// Route to delete a model
router.delete('/:id', deleteModel);




export default router 