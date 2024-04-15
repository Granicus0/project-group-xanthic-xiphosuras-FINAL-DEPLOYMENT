import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'

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