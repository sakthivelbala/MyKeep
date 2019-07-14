const Note = require('../../../models/note');

module.exports = {
    deleteNote: async({noteId},req) => {
        if(!req.isAuth){
            throw Error("Unauthorised Access");
        }
        const res=await Note.findOneAndDelete({_id:noteId});
        return res;
    }
}