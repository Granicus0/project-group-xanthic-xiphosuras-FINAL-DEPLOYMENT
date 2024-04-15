import User from '../models/userModel.js'


// User login
export const loginUser = async (req, res) => {
    res.json({ msg: 'login user' })
};

// User signup
export const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {

        const user = await User.signup(email, password)
        res.status(200).json({email, user})

    } catch (error) {

        res.status(400).json({error: error.message})

    }

};

// Test the API
export const testUser = async (req, res) => {
    res.json({msg: 'success'})
};


