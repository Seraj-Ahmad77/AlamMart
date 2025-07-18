import jwt from "jsonwebtoken"

export const adminAuth=async(req ,res ,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.json({
                success:false,
                message:"Not authorized ,login again"
            })
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode!=="token"){
             return res.json({
                success:false,
                message:"Not authorized ,login again"
            })
        }
        next()
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}