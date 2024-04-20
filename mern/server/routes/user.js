import express from 'express'

// Controller functions from user controller
import { signupUser, loginUser, testUser } from '../controllers/userController.js'
const router = express.Router();


// Route for logging in
router.post('/login', loginUser)

// Route for signing up
router.post('/signup', signupUser)

// Test API
router.get('/test', testUser)

export default router 