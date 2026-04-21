import mongoose from "mongoose";

//connect to the database
export const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
       .then(()=> console.log("Connected to mongoDB..."))
       .catch((err)=> console.log(`Erro connecting to mongo db error : ${err.message}`))
    }catch(error){
        console.error(`Error connecting to mongoDB : ${error.message}`)
    }
}