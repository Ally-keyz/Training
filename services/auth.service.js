//auth service.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(name , email , password)=>{
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return {error :"User already exists with this email"}
        }
        const newUser = new User({
            name,
            email,
            password : await bcrypt.hash(password , 10)
        })

        return await newUser.save();
    } catch (error) {
        console.error(`Error registering the user : ${error.message}`);
        throw error;
    }
}

export const login = async(email , password)=>{
    try {
        const user = await User.findOne({email});
        if(!user){
            return {error : "User not found"}
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return {error : "Invalid credentials"}
        }
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn:"1h"});
        return {message :"Loged in successfully" , token};
    } catch (error) {
        console.error(`Error logging in the user : ${error.message}`);
        throw error;
    }
}