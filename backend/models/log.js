//modelo de tabla LOG - registro de peticiones
module.exports = (sequelize, type) => {
    const log = sequelize.define('Logs', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: type.INTEGER,
            onDelete: 'RESTRICT',
            onUPDATE: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        type: type.STRING,
        discription: type.STRING
    });
    //relaciones
    log.associate = models => {
        log.belongsTo(models.user)
    };
    return log;
}