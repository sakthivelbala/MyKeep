const Note = require('../../../models/note');

module.exports = {
    createNote: async({noteInput},req) => {
        if(!req.isAuth){
            throw Error("Unauthorised Access");
        }
        const note=new Note({
            title: noteInput.title,
            description:noteInput.description,
            creator: req.userId
        });
        const res=await note.save();    
        return res;
    }
}