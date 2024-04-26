import mongoose from 'mongoose'


const Schema = mongoose.Schema

const modelSchema = new Schema({
    model_name: { type: String, required: true },
    model_address: { type: String, required: true },
    metaData_address: { type: String, required: true },
    model_description: { type: String, required: true },
    model_type: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Model = mongoose.model('Model', modelSchema);

export default Model