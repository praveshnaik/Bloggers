const jwt = require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req,res,next)=>{
    const token = req.header['authorization'];
    if(!token)
        return res.status(401).json({error:'No token'});
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    }
    catch(error){
        res.status(400).json({error:'Token is not valid'});
    }
}

module.exports = { authMiddleware};

