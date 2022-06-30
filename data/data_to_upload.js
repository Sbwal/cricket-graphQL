const mongodb = require('mongodb');
require('dotenv').config();
const url = process.env.MONGOURL;

let dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
        const matches = require('./matches.json');
    // console.log(matches.data.matches[0]);
    const collectionName = 'matches';
        const collection = dbConn.collection(collectionName);
        collection.insertMany(matches.data.matches, (err, result) => {
            if (err) console.log(err);
            if (result) {
                console.log("Import CSV into database successfully.");
            }
        });
}).catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});