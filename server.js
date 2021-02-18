const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Menu');

// Db connections.
const url = `mongodb+srv://dev_userdb:p%40ssword123@tutorialdb.5yiwp.mongodb.net/HendricksDB?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
    
const app = express();
app.use(bodyParser.json());
require('./routes/menuRoutes')(app);
app.listen(5000, () => {
  console.log(`Server is running ...`)
});
