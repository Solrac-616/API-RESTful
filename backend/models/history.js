//modelo de tabla LOG - registro de peticiones
module.exports = (sequelize, type) => {
    const history = sequelize.define('Historys', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: type.INTEGER,/*
            onDelete: 'RESTRICT',
            onUPDATE: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id'
            }*/
        },
        logId: {
            type: type.INTEGER,/*
            onDelete: 'RESTRICT',
            onUPDATE: 'CASCADE',
            references: {
                model: 'Logs',
                key: 'id'
            }*/
        }
    });
    //Assoicion
    history.associate = models => {
        /*
        history.hasOne(models.user, {
            foreignKey: 'profileId',
            as: 'Users'
        });*/
    };
    return history;
}