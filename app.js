//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/db').then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

//On définit notre objet express nommé app
const app = express();

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Définition du routeur
var router_user = express.Router();
app.use('/user', router_user);
require(__dirname + '/controllers/userController')(router_user);

var router_activity = express.Router();
app.use('/activity', router_activity);
require(__dirname + '/controllers/activityController')(router_activity);

var router_mood = express.Router();
app.use('/mood', router_mood);
require(__dirname + '/controllers/moodController')(router_mood);

var router_group = express.Router();
app.use('/group', router_group);
require(__dirname + '/controllers/groupController')(router_group);

//Définition et mise en place du port d'écoute
var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));