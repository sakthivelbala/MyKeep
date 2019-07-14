const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');


const { RootSchema ,RootResolver} = require('./RootSchemaAndResolvers');
const dbConfig = require('./config/dbconfig');
const expressConfig = require('./config/expressconfig');
const auth=require('./middleware/auth');

const app = express();

app.use(bodyParser.json());

app.use(auth);

mongoose.connect(dbConfig.url,{useNewUrlParser: true})
.then(()=>{
    app.listen(expressConfig.port);
    console.log("Listening @ ",expressConfig.port);
});

app.use('/api',expressGraphql({
    schema:RootSchema,
    rootValue:RootResolver,
    graphiql:true
}));