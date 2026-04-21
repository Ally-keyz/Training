//auth middleware
import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next)=>{
    try {
        const token = req.header.authorization.split('',1)[1];
        if(!token){
            return res.status(401).json({message:"No token, authorization denied"})
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
}