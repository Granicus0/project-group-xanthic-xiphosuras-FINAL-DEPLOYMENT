import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

    models: [{
        type: Schema.Types.ObjectId,
        ref: 'Model'
    }]


})


// Creates a user and returns it.
userSchema.statics.signup = async function (name, email, password) {

    // Validate name, email, and password
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }

    // Validate email and password
    if (!email || !password) {
        throw Error('You must have both an email and password')
    }

    // User the validator library to check if an email is a valid email, and if the user chosen password is strong enough
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    const passwordOptions = {
        minLength: 3,        // at least 3 chars
        minLowercase: 1,     // at least 1 lowercase letter
        minUppercase: 1,     // at least 1 uppercase letter
        minNumbers: 1,       // at least 1 number
        minSymbols: 0        // no symbol required
    };

    if (!validator.isStrongPassword(password, passwordOptions)) {
        throw Error('Choose a stronger password');
    }

    // Check if the email is already in use
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already exists')
    }


    // Use the bcrypt library to create a salt for the password hash
    const salt = await bcrypt.genSalt(10)
    // Use the bcrypt library to hash the actual password, adding the salt
    const finalHashedPassword = await bcrypt.hash(password, salt);

    // Creates a user on MongoDB containing their email and salted hashed password
    const user = await this.create({ name, email, password: finalHashedPassword });

    return user
}


// Logs in a user
userSchema.statics.login = async function (email, password) {
    // Validate email and password
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // Check if the email is already in use
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Invalid login details')
    }

    // Compare the passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Invalid login details')
    }

    return user;

}

const User = mongoose.model('User', userSchema);



export default User