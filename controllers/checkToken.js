const jwt = require('jwt-simple');
const User = require('../schema/schemaUser');
const config = require('../config/config');

function checkToken(req,res) {
    try {
        let decoded = jwt.decode(req.body.token, config.secret);
        if (!decoded._id || !decoded.email) {
            return res.status(401).json({
                'text': 'Token not valid'
            })
        }
        User.findOne({
            _id: decoded._id,
            email: decoded.email
        }).populate('company').exec(function (err, user) {
            if (err) return callback(err, null);
            if (user == null) {
                return res.status(401).json({
                    'text': 'User not found'
                })
            }
            return res.status(200).json({
               'user': user
            })
        });
    } catch (e) {
        return res.status(401).json({
            'text' : 'token not valid'
        })
    }
}

exports.checkToken = checkToken;