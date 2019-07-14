const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    creator:{
        type: String,
        ref : 'User'
    },
    sharedwith:[{
        type:String,
        ref:'User'
    }]
});
// {timestamps:true}
module.exports = mongoose.model('note', noteSchema);