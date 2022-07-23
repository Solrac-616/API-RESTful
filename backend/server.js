//----SERVIDOR
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const portTexto = String(port);

//----LLAMADA A BASE DE DATOS 
const bdController = require('./controllers/dbController');

//-----llamado a rutas
const apiRoute = require('./routes/api.js');

//---CONFIGURACION de Json y HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

//-----redireccion a api y mensaje de server
app.use('/api', apiRoute)
app.listen(port, ()=>{
    console.log('SERVER ACTIVO en http://localhost:'+portTexto);
});