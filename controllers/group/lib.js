const Activity = require('../../schema/schemaActivity.js');
const Group = require('../../schema/schemaGroup.js');


function create(req, res) {
    if (!req.body.name || !req.body.user_id) {
        //Le cas où le name ou bien la frequence ou l'id utilisateur ne serait pas soumit ou nul
         res.status(200).json({
            "text": req.body,
        })
    } else {
        var group = {
            name: req.body.name,
            user_id: req.body.user_id
        }
        var _g = new Group(group)
        _g.save(function (err, group) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else {
                res.status(200).json({
                    "text": "Succès",
                })
            }
        })
    }
}

function index(req,res) {
    if ( !req.query.user_id ) {
        res.status(400).json({
            "text": 'requête invalide',
        })
    }else{
        Group.find({
            user_id : req.query.user_id
        },function(err,groups){
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else {
                res.status(200).json({
                    "text": "Succès",
                    "query": groups,
                })
            }
        });
    }
}

function show(req, res) {
    if ( !req.query.group_id ) {
        res.status(400).json({
            "text": 'requête invalide',
        })
    }else{
        Group.
        findOne({ _id: req.query.group_id })
            .populate({
                path: 'activity',
                model: 'Activity',
                populate: {
                    path: 'moods',
                    model: 'Mood'
                }
            }).exec(function (err, activity) {
                    if (err){
                        return res.status(500).json({
                            'text': 'Erreur interne'
                        })
                    }
                    if (activity == null) {
                        return res.status(401).json({
                            'text': 'Activity not found'
                        })
                    }

                    return res.status(200).json({
                        'group': activity
                    })

        });
    }
}

//On exporte nos fonctions

exports.create = create;
exports.index = index;
exports.show = show;
/**
 * Created by ro2lo on 23/12/2018.
 */
