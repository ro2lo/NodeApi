const group = require('./group/lib.js');



module.exports = function (app) {
    /*
     C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /activity
     */
    app.post('/create',group.create);
    app.get('/index',group.index);
    app.get('/show',group.show);
}