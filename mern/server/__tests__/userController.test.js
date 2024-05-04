import axios from 'axios';
import { loginUser, signupUser, testUser } from '../controllers/userController'; // Update with your actual file path
import { userEndpoints } from '../apiEndpoints'

describe('Login and Signup API endpoints', () => {
    // Mock user data for testing
    const mockUser = {
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'TestingTesting123!'
    };

    // Mock JWT token
    let token;

    // Test signup endpoint
    describe('POST /signup', () => {
        xit('should create a new user and return a JWT token', async () => {
            const response = await axios.post(userEndpoints.signup, mockUser);

            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('_id');
            expect(response.data).toHaveProperty('name', mockUser.name);
            expect(response.data).toHaveProperty('email', mockUser.email);
            expect(response.data).toHaveProperty('token');
            token = response.data.token; // Store token for later use
        });

        it('should return 400 if user already exists', async () => {
            try {
                await axios.post(userEndpoints.signup, mockUser);
            } catch (error) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toHaveProperty('error');
            }
        });

        // Add more test cases for validation, error handling, etc.
    });

    // Test login endpoint
    describe('POST /login', () => {
        it('should log in an existing user and return a JWT token', async () => {
            const response = await axios.post(userEndpoints.login, {
                email: mockUser.email,
                password: mockUser.password
            });

            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('_id');
            expect(response.data).toHaveProperty('name', mockUser.name);
            expect(response.data).toHaveProperty('email', mockUser.email);
            expect(response.data).toHaveProperty('token');
            token = response.data.token; // Update token for later use
        });

        it('should return 400 for invalid credentials', async () => {
            try {
                await axios.post(userEndpoints.login, {
                    email: 'invalid@example.com',
                    password: 'invalidPassword'
                });
            } catch (error) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toHaveProperty('error');
            }
        });

        // Add more test cases for edge cases, error handling, etc.
    });

});
