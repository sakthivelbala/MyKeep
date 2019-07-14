const {buildSchema} = require('graphql');

const Notes = require('./Resolvers/notes/Quries/notes');
const CreateNote = require('./Resolvers/notes/Mutations/createNote');
const DeleteNote = require('./Resolvers/notes/Mutations/deleteNote');
const UpdateNote = require('./Resolvers/notes/Mutations/updateNote');
const ShareNote = require('./Resolvers/notes/Mutations/shareNote');

const createUser = require('./Resolvers/users/Mutations/createUser');
const LoginUser = require('./Resolvers/users/Quries/loginUser');

module.exports = {
    RootSchema : buildSchema(`
        # notes type definitions
        type note{
            _id: ID!
            title: String!
            description: String!
            creator: String!
            sharedwith: [String]
        }
        input CreateNoteInput{
            title: String!
            description: String!
        }
        input UpdateNoteInput{
            noteId: String!
            title: String
            description: String
        }

        # user type definitions
        type user{
            _id: String
            password: String
        }
        input UserCredInput{
            email: String!
            password: String!
        }

        type Quries{
            #note quries
            notes: [note]

            #user quries
            loginUser(userDetails:UserCredInput):String
        }
        type Mutations{
            # note mutations
            createNote(noteInput:CreateNoteInput): note
            deleteNote(noteId:String): note
            updateNote(noteInput:UpdateNoteInput):note
            shareNote(noteId:String, users:[String]):note

            #user mutations
            createUser(userDetails:UserCredInput):user
        }
        schema {
            query:Quries
            mutation:Mutations
        }
    `),
    RootResolver : {
        //note queries
        ...Notes,

        //note mutations
        ...CreateNote,
        ...DeleteNote,
        ...UpdateNote,
        ...ShareNote,

        //user quries
        ...LoginUser,

        //user mutations
        ...createUser
    }
}