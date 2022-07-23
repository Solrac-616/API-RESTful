const router = require('express').Router();
const { user } = require('./dbController.js');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const configToken = require('../assets/config/webToken.json');
const {verifyToken} = require('./authController.js');
const moment = require('moment');
//idioma de Moment
moment.locale('es');



router.get('/', (req, res) =>{
    let hora = moment();
    console.log('hora es un '+typeof hora);
    console.log(hora);
    //res.json('controlador de sesiones , hora: '+ hora.format('DD MMM YYYY hh mm ss a Z'));
    formato = hora.format('DD MMM YYYY hh mm ss a Z');
    res.json('la hora es : ' + hora);
});

//peticion POST registrar usuario CON VALIDACIONES
router.post('/register', [
    //-------------validacion de Datos
    check('email', 'The email address is not valid').not().isEmpty().isEmail(),
    check('username', 'username is Invalid').not().isEmpty(),
    check('password', 'password is Invalid').not().isEmpty(),

], async (req, res)=>{
    //-----------------------Verificar datos de formulario
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({ errors: error.array()});
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

    //--------------------ENCRIPTAR CLAVE Y CREAR USUARIO
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    const User = await user.create(req.body);
    res.json(User);
});




//---------Peticion POST de LOGIN
router.post('/login', [
    //-------------validacion de Datos
    check('usernameEmail', 'Email addres is invalid').not().isEmail(),
],async (req, res) =>{
    //-----------------------Verificar datos de formulario
    const error = validationResult(req);
    let User;
    //Verifica si el campo existe
    if (!req.body.usernameEmail) {
        return res.json('Email o username requerido');        
    }
    //verifica si es un email o un usuario y crea la variable
    if(error.isEmpty()) {
        req.body.username = req.body.usernameEmail;
        //>>>>>Trae usuario de base de datos con username
        User = await user.findOne({ where: { username: req.body.username }});
    } else {
        req.body.email = req.body.usernameEmail;
        //>>>>>Trae usuario de base de datos con email
        User = await user.findOne({ where: { email: req.body.email }});
    }

    //------------------------VERIFICAR SI EXISTE EL USUARIO POR EMAIL
    if (!User) {
        return res.json({ error: 'error, wrong username or email addres'});
    }
    //------------------------VERIFICAR CONTRASEÑA
    const pass = bcrypt.compareSync(req.body.password, User.password);
    if (!pass) {
        return res.json({ error: 'error, wrong Password'});
    }
    //SE CREA EL TOKEN DEL USUARIO
    const token = jwt.sign({id: User.id}, configToken.secret1,{
        expiresIn: '3h'
    })
    //Se crra el parametro las login
    let time = moment();
    let Login = {
        "lastLogin": time.format('DD  MMM YYYY hh mm ss a Z')
    }
    //Se actualiza last login
    await user.update(Login, {
        where: { id: User.id }
    });

    res.json({ auth: true, token});
})

module.exports = router;