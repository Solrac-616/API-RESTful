const router = require('express').Router();
const {verifyToken} = require('../controllers/authController.js');

//----importacion de ruta a CRUD
const apiUsersRoute = require('../controllers/usersApiController.js');
const apiSessionRoute = require('../controllers/sessionController.js');

//---redireccion al CRUD
router.use('/users', verifyToken, apiUsersRoute);
router.use('/session', apiSessionRoute);

module.exports = router;