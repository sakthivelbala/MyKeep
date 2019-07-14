const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/user');
const jwtConfig = require('../../../config/jwtconfig');

module.exports = {
    loginUser: async({userDetails}) => {
        const user = await User.findById(userDetails.email);
        if(!user){
            throw new Error('User does not exist!');
        }
        const isPasswordEqual = await bcrypt.compare(userDetails.password,user.password);
        if(!isPasswordEqual){
            throw new Error('Invalid Credentials');
        }
        const token = jwt.sign({userId:user._id},jwtConfig.secretkey,{
            expiresIn: jwtConfig.expirationTime
        });
        // return{
        //     userId: user.id,
        //     token: token,
        //     tokenExpiration: 1
        // }
        return token;
    }
}