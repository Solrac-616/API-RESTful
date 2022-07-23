const router = require('express').Router();
const { user } = require('./dbController.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//const jwt = require("jsonwebtoken");
//const configToken = require('../assets/config/webToken.json');
//const {verifyToken} = require('./authController.js');


//Peticion para traer todos los usuarios
router.get('/', async (req, res) =>{
    
    const cliente = await user.findOne({ where: { id: req.userId }});
    if (!cliente) {
        return res.status(404).send('no user found');
    }
    res.json(cliente);
    

    //------------------------SACAR TODOS LOS USUARIOS
    //const Users = await user.findAll();
    //res.json(Users); 
});


//-----------------------PETICION PUT CON VALIDACION DE DATOS
router.put('/:UserId', [
    //-------------validacion de Datos
    check('email', 'The email address is not valid').not().isEmpty().isEmail(),
    check('username', 'username is Invalid').not().isEmpty(),
    check('password', 'password is Invalid').not().isEmpty(),

], async (req, res)=>{

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ errors: error.array()})
    }
    
    //--------------------BUSCAR UN USUARIO CON EL MISMO EMAL
    let userEmail = await user.findOne({ where: { email: req.body.email }});
    if (userEmail) {
        return res.json({ error: 'error, this email already exists'});
    }

    //--------------------BUSCAR UN USUARIO CON EL MISMO USER NAME
    const userusername = await user.findOne({ where: { username: req.body.username }});
    if (userusername) {
        return res.json({ error: 'error, this user name already exists'});
    }
    
    //Se encrypta la clave
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    
    await user.update(req.body, {
        where: { id: req.params.UserId }
    });
    res.json({ success: 'Usuario modificado' })
});


//-------------------------Peticion Para BORRAR USUARIO
router.delete('/:UserId', async (req, res)=>{
    await user.destroy({
        where: { id: req.params.UserId }
    });
    res.json({ success: 'Usuario Eliminado' })
});

module.exports = router;