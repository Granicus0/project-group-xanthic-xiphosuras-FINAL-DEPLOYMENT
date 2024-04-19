import Model from '../models/aiModel.js';
import User from '../models/userModel.js';

export const createModel = async (req, res) => {
    const { model_address, metaData_address, model_description, model_type, user } = req.body;
    
    try {
        // Optionally check if the referenced user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const model = new Model({
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

// Retrieve all models for a specific user
export const getModelsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const models = await Model.find({ user: userId });
        res.status(200).json(models);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update a model
export const updateModel = async (req, res) => {
    const { id } = req.params;
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
    const { id } = req.params;
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
    const { id } = req.params;
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

