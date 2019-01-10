const mood = require('./mood/lib.js');

module.exports = function (app) {
    /*
     C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /mood
     */
    app.post('/create', mood.create);
}