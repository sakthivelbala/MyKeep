const Note = require('../../../models/note');

module.exports = {
    updateNote: async({noteInput},req) => {
        if(!req.isAuth){
            throw Error("Unauthorised Access");
        }
        const result = await Note.findById(noteInput.noteId);
        if(result.creator!=req.userId){
            throw Error("Not the creator of note");
        }
        if(noteInput.title){
            result.title=noteInput.title;
        }
        if(noteInput.description){
            result.description=noteInput.description;
        }
        const updatedResult=await result.save();
        return updatedResult;
    }
}