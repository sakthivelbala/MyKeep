const bcrypt =  require('bcryptjs');

const User = require('../../../models/user');
const bcryptconfig = require('../../../config/bcryptconfig');

module.exports = {
    createUser: async({userDetails}) => {
        const hashedPassword = await bcrypt.hash(userDetails.password,bcryptconfig.saltRounds);
        const user=new User({
            _id: userDetails.email,
            password: hashedPassword
        });
        const res=await user.save();
        return {
            _id:res._id,
            password:null
        };
    }
}