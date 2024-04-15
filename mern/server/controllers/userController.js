import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// Function to create a JWT using the JWT library
const createToken = (_id) => {
    // JWT takes in the ID of the user, secret encoding string, and validity period
    return jwt.sign({ _id: _id }, 'TEST_ENCODING_STRING', { expiresIn: '3d' })
}

// User login
export const loginUser = async (req, res) => {

    // Grab the users email and password from the request body
    const { email, password } = req.body

    try {

        // Log in the user with their email and password
        const user = await User.login(email, password)

        // Create the users JWT
        const token = createToken(user._id)

        // Send back response with email and JWT
        res.status(200).json({ email, token })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
};

// User signup
export const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {

        // Create a user with email and password
        const user = await User.signup(email, password)

        // Create the users JWT
        const token = createToken(user._id)

        // Send back response with email and JWT
        res.status(200).json({ email, token })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

};

// Test the API
export const testUser = async (req, res) => {
    res.json({ msg: 'success' })
};


