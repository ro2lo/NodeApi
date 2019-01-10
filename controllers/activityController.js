const activity = require('./activity/lib.js');



module.exports = function (app) {
    /*
     C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /activity
     */
    app.post('/create',activity.create);
    app.get('/index',activity.index);
    app.get('/show',activity.show);
}