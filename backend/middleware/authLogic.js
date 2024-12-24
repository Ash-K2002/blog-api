import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();

function authenticate(req, res, next){
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: 'Authentication required'
        });
    }
    
    try{
        const user = jwt.verify(token, process.env.AUTH_ACCESS_KEY);
        req.user = user;
        next();
    }
    catch(err){
        return res.status(403).json({
            error: 'Invalid or expired token'
        });
    }
}

export default {
    authenticate
}


