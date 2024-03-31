import jwt from "jsonwebtoken";
import { j_secret } from "../routes/auth.js";

function fetchuser(req,res,next){
    // get the user from the jwt token and add id to req object;
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"pl authenticate using the valid credentials"});
    }
    try {
        const data = jwt.verify(token,j_secret);
        req.user = data.user;
        
    } catch (error) {
        
        res.status(401).json({error:"pl authenticate using the valid credentials"});
    }

    next();
}

export default fetchuser;