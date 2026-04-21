//auth controller.js
import  { register  , login } from "../services/auth.service.js";

export const registerController = async(req, res)=>{
    try {
        console.log(req.body);
        const { name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error:"All fields are required!"})
        }
         const user = await register(name , email , password);
         if(user){
            return res.status(201).json({message:"User registered successfully!" , user});
         }
         return res.status(400).json({error:"Failed to register the user!"});
    } catch (error) {
        console.error(`Error in registerController: ${error.message}`);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const loginController = async(req,res) =>{
    try {
        console.log(req.body)
        const {email , password } = req.body;
        if(!email || !password) {
            return res.status(400) .json({error:"Email  and password are required!"});
        }
        const result  = await  login(email , password);
        if(result.error){
            return res.status(400).json({error:result.error});
        }
        return res.status(200).json({message:result.message ? result.message : "Logged in successfully!" , token:result.token});
    } catch (error) {
        console.error(`Error in loginController: ${error.message}`);
        return res.status(500).json({error:"Internal server error"});
    }
}