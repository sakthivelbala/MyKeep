const Note = require('../../../models/note');

module.exports = {
    shareNote: async({noteId,users},req) => {
        if(!req.isAuth){
            throw Error("Unauthorised Access");
        }
        const result = await Note.findById(noteId);
        if(result.creator!=req.userId){
            throw Error("Not the creator of note");
        }
        // users.map(user=>{
        //     if(result.sharedwith.includes(user)===false){
        //         result.sharedwith.push(user);   
        //     }
        // });
        result.sharedwith=[...new Set([...result.sharedwith ,...users])];
        await result.save();
        return result;
    }
}
