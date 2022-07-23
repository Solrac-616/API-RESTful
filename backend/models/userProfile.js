//modelo de profile - informacion d elos usuarios
module.exports = (sequelize, type) => {
    const profile = sequelize.define('Profiles', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        professionId: {
            type: type.INTEGER,
            onDelete: 'RESTRICT',
            onUPDATE: 'CASCADE',
            references: {
                model: 'Professions',
                key: 'id'
            }
        },
        name: type.STRING,
        surname: type.STRING,
        dateBirth: type.DATEONLY,
        sex: type.STRING,
        profession: type.STRING,
        phoneNumber: type.STRING,
        shortAddress: type.STRING,
        town: type.STRING,
        country: type.STRING,
        state: type.STRING,
        profilePicture: type.STRING,
    });

    //Assoiciate
    profile.associate = models => {
        profile.hasOne(models.user, {
            foreignKey: 'profileId',
            as: 'Users'
        });
        profile.belongsTo(models.profession);
    };
    return profile;
}