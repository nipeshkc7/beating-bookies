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
                    console.log('decoded');
                    return next();
                }
                if(err) return res.status('401').end('Unauthorized Access');
            });
        }
    ]
}

async function getUserId(authorization){
    if(process.env.NODE_ENV === 'test')
        return '1';
    try{
        const decoded = await jwt.verify(authorization,config.secret);
        return decoded.id;
    }catch(er){
        console.log(er);
        return null;
    }
}

module.exports = {
    authorize,
    getUserId
}
