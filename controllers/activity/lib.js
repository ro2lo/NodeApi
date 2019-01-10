const Group = require('../../schema/schemaGroup.js');
const Activity = require('../../schema/schemaActivity.js');


function create(req, res) {
    if (!req.body.name || !req.body.min || !req.body.max  || !req.body.group_id) {
        //Le cas où le name ou bien la frequence ou l'id utilisateur ne serait pas soumit ou nul
         res.status(400).json({
            "text": "Requête invalide",
        })
    } else {
       Group.findOne({
           _id : req.body.group_id
       },function (err, _g) {
           var activity = {
               name: req.body.name,
               min: req.body.min,
               max: req.body.max,
               step: req.body.step,
               user_id: req.body.user_id
           }
           var _a = new Activity(activity)
           _a.save(function (err, _a) {
               if (err) {
                   res.status(500).json({
                       "text": "Erreur interne"
                   })
               } else {
                   _g.activity.push(_a);
                   _g.save();
                   res.status(200).json({
                       "text": "Succès",
                   })
               }
           })

       })
    }
}

function index(req,res) {
    if ( !req.query.user_id ) {
        res.status(400).json({
            "text": 'requête invalide',
        })
    }else{
        Activity.find({
            user_id : req.query.user_id
        },function(err,Activities){
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else {
                res.status(200).json({
                    "text": "Succès",
                    "query": Activities,
                })
            }
        });
    }
}

function show(req, res) {
    if ( !req.query.activity_id ) {
        res.status(400).json({
            "text": 'requête invalide',
        })
    }else{
        Activity.
        findOne({ _id: req.query.activity_id })
            .populate('moods').populate('user_id').exec(function (err, moods) {
            if (err){
                return res.status(500).json({
                    'text': 'Erreur interne'
                })
            }
            if (moods == null) {
                return res.status(401).json({
                    'text': 'Activity not found'
                })
            }
            return res.status(200).json({
                'activity': moods
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
