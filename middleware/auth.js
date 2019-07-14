const jwt = require('jsonwebtoken');
 
const jwtConfig = require('../config/jwtconfig');


module.exports=(req,res,next)=>{
    const authHeader = req.get("Authorization");
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if(!token||token===''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,jwtConfig.secretkey);
    }
    catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth=true;
    req.userId = decodedToken.userId
    next();
};