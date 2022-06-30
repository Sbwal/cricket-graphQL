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

app.use("/matches", async (req, res) => {
    const matches = await MatcheModel.find({match_Id: 198673}).exec();
    res.send(JSON.stringify(matches));
})

app.listen(process.env.PORT, () => {
    console.log(`Listening at :${process.env.PORT}...`);
})