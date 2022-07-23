module.exports = (sequelize, type) => {
    const user =  sequelize.define('Users', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profileId: {
            type: type.INTEGER,
            onDelete: 'RESTRICT',
            onUPDATE: 'CASCADE',
            references: {
                model: 'Profiles',
                key: 'id'
            }
        },
        email: type.STRING,
        username: type.STRING,
        password: type.STRING(150),
        lastLogin: type.STRING
    });

    //relaciones
    user.associate = models => {
        user.belongsTo(models.profile);
        user.hasMany(models.log,{
            foreignKey: 'userId',
            as: 'Logs'
        });
    };
    return user;
}