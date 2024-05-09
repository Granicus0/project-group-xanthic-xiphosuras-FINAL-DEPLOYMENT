import axios from 'axios';
import { aiModelEndpoints } from '../apiEndpoints';

// Setup Axios mock
jest.mock('axios');

describe('AI Model API endpoints', () => {
    // Mock data for model
    const mockModel = {
        model_name: 'Test123',
        model_type: 'SVM',
        userId: '6639a415393276537f72b522',
        model_address: 'income'
    };

    // Mock model ID for tests that require an existing model
    const modelId = '6639a9ac7a8f996283298ef9';

    

    // Test creation of a model
    describe('POST /models/createModel', () => {
        it('should create a new model and return its details', async () => {
            const response = { status: 200, data: { ...mockModel, _id: modelId } };
            axios.post.mockResolvedValue(response);

            const result = await axios.post(aiModelEndpoints.createModel, mockModel);

            expect(result.status).toEqual(200);
            expect(result.data).toHaveProperty('_id');
            expect(result.data).toHaveProperty('model_name', mockModel.model_name);
            expect(result.data).toHaveProperty('model_type', mockModel.model_type);
        });
    });

    // Test fetching models by user
    describe('GET /models/user/:id', () => {
        it('should return models for a given user', async () => {
            const response = { status: 200, data: [{ ...mockModel, _id: modelId }] };
            axios.get.mockResolvedValue(response);

            const result = await axios.get(aiModelEndpoints.getUserModels + mockModel.userId);

            expect(result.status).toEqual(200);
            expect(result.data).toHaveLength(1);
            expect(result.data[0]).toHaveProperty('_id', modelId);
        });

        it('should return empty array if user has no models', async () => {
            const response = { status: 200, data: [] };
            axios.get.mockResolvedValue(response);

            const result = await axios.get(aiModelEndpoints.getUserModels + 'nonExistingUserId');

            expect(result.status).toEqual(200);
            expect(result.data).toEqual([]);
        });
    });

    // Test updating a model by ID
    describe('POST /models/:id', () => {
        it('should update an existing model', async () => {
            const updates = { model_type: 'NN' };
            const response = { status: 200, data: { ...mockModel, model_type: 'NN' } };
            axios.post.mockResolvedValue(response);

            const result = await axios.post(`${aiModelEndpoints.updateModelById}${modelId}`, updates);

            expect(result.status).toEqual(200);
            expect(result.data).toHaveProperty('model_type', 'NN');
        });
    });

    // Test deleting a model by ID
    describe('DELETE /models/:id', () => {
        it('should delete a model and return a success message', async () => {
            const response = { status: 200, data: { message: 'Model deleted successfully' } };
            axios.delete.mockResolvedValue(response);

            const result = await axios.delete(`${aiModelEndpoints.deleteModelById}${modelId}`);

            expect(result.status).toEqual(200);
            expect(result.data).toHaveProperty('message', 'Model deleted successfully');
        });
    });
});
