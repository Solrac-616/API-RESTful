const jwt = require("jsonwebtoken");
const configToken = require('../assets/config/webToken.json');

//MOVER ESTO A LA CARPETA MIDDLEWARE
function verifyToken (req, res, next ) {
    
    const token = req.headers['access-token'];
    
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'no find token'
        });
    }
    
    let decode;
    try{
        decode = jwt.verify(token, configToken.secret1);
    } catch (err) {
        return res.json({ error: 'Token invalido'})
    }
    req.userId = decode.id;
    next();
}

module.exports = {
    verifyToken
}