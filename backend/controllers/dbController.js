const Sequelize = require('sequelize');
const dbConfig = require('../assets/config/dbConfig.json');
/******************* TABLE MODELS START***************/
const userModel = require('../models/user.js');
const profileModel = require('../models/userProfile.js');
const logModel = require('../models/log.js');
const professionModel = require('../models/profession.js');
/******************* TABLE MODELS END****************/


//-----------configuracion de SEQUELIZE
const sequelize = new Sequelize(dbConfig.dbname, dbConfig.dbuser, dbConfig.dbpswd, {
    host: dbConfig.urlHost,
    dialect: dbConfig.dialect
});

//-----------Sequelize Models
const user = userModel(sequelize, Sequelize);
const profile = profileModel(sequelize, Sequelize);
const log = logModel(sequelize, Sequelize);
const profession = professionModel(sequelize, Sequelize);

//----sincronizacion de Tabla y exportacion de modelo
sequelize.sync({force: false})
    .then(() => {
        console.log('Tabla sincronizada');
    })

module.exports = {
    user,
    profile,
    log,
    profession
}