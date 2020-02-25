const jwt = require('jsonwebtoken');
const config = require('../config');

function authorize(condition) {
    return [
        (req, res, next) => {
            if (process.env.NODE_ENV === 'test') {
                return next();
            }
            jwt.verify(req.headers.authorization, config.secret, function (err, decoded) {
                if (decoded && condition.is_admin == req.headers.isadmin) {
                    return next();
                }
            });
            return res.status('401').end('Unauthorized Access');
        }
    ]
}

function getUserId(authorization){
    if(process.env.NODE_ENV === 'test')
        return '1';
    jwt.verify(authorization, config.secret, function (err, decoded) {
        if (decoded) {
            return decoded.id;
        }
    });
    return null;
}

module.exports = {
    authorize,
    getUserId
}
