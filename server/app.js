const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');

const uri = "mongodb+srv://sebastian:test123@cluster0.cdxts9k.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for requests on port 4000')
})