require('dotenv').config();
const mongodb = require('mongodb');

mongodb.connect(process.env.CONNECTIONSTRING, {useUnifiedTopology: true}, (err, client) => {
    module.exports = client;
    const app = require('./app.js');
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
});