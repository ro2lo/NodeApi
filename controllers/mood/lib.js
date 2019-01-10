const Mood = require('../../schema/schemaMood.js');
const Activity = require('../../schema/schemaActivity.js');

function create(req, res) {

    if (!req.body.value || !req.body.label || !req.body.activity_id) {

         res.status(400).json({
            "text": "Requête invalide",
        })

    } else {
        Activity.findOne({
            _id : req.body.activity_id
        },function (err,_a) {
            var mood = {
                value: req.body.value,
                note: req.body.note,
                label: new Date(req.body.label),
                activity_id: req.body.activity_id
            };
        var _m = new Mood(mood);
        _m.save(function (err, mood) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else {
                _a.moods.push(_m);
                _a.save();
                res.status(200).json({
                    "text": "Succès",
                    "query": mood
                })
            }
        })
        })
    }

}

//On exporte nos fonctions

exports.create = create;
/**
 * Created by ro2lo on 23/12/2018.
 */
