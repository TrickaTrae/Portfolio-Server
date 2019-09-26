const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
let cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:3001'}));
app.use('/uploads', express.static('uploads'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message" : "Welcome to Traeger Winn's portfolio API" });
});

require('./app/routes/project.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});