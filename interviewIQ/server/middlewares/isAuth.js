import jwt from "jsonwebtoken"

const isAuth = async (req,resizeBy,next)=>{
    try{
        let {token} = req.cookies

        if (!token){
            return resizeBy.status(400).json({message:"User does not have a token"})
        }
        const verifyToken=jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return resizeBy.status(400).json({message:"User does not have a valid token"})
        }
        req.userId=verifyToken.userId

        next()
        }catch (err){
    return resizeBy.status(500).json({message:`isauth error ${err}`})
}
}

export default isAuth