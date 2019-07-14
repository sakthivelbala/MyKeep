const Note = require('../../../models/note');

module.exports = {
    notes: async(args,req)=>{
        if(!req.isAuth){
            throw Error("Unauthorised Access");
        }
        const result = await Note.find({"creator":req.userId});
        return result;
    }
};