import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

// Creates a user and returns it.
userSchema.statics.signup = async function (email, password) {

    // Validate email and password
    if(!email || !password) {
        throw Error('You must have both an email and password')
    }

    // User the validator library to check if an email is a valid email, and if the user chosen password is strong enough
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Choose a stronger password')
    }

    // Check if the email is already in use
    const exists = await this.findOne({email});
    if(exists) {
        throw Error('Email already exists')
    }

    // Use the bcrypt library to create a salt for the password hash
    const salt = await bcrypt.genSalt(10)
    // Use the bcrypt library to hash the actual password, adding the salt
    const finalHashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: finalHashedPassword})

    return user
}

const User = mongoose.model('User', userSchema);
export default User