const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const Mongoose = require('mongoose');
const MatcheModel = require('./models/matches');
const MatchesSchema = require('./graphQLSchema/matchesSchema')
require('dotenv').config();

let app = express();
const mongoURL = process.env.MONGOURL;

Mongoose.connect(mongoURL);

app.use("/graphql", expressGraphQL({
    schema: MatchesSchema,
    graphiql: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Listening at :${process.env.PORT}...`);
})