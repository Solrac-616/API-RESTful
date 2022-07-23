//modelo de Professions - informacion de cada tipo de profesion
module.exports = (sequelize, type) => {
    const profession = sequelize.define('Professions', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.STRING
    });
    //Assoicion
    profession.associate = models => {
        profession.hasOne(models.profile, {
            foreignKey: 'professionId',
            as: 'Profiles'
        });
    };
    return profession;
}