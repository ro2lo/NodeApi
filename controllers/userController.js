const account = require('./account/lib.js');
const checkToken = require('./checkToken');



module.exports = function (app) {
    /*
     C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user
     */
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.post('/checkToken',checkToken.checkToken);
}