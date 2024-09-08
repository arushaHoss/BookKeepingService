module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users",{
        firstName:{
            type: DataTypes.STRING,
            allowNull: true 
        },
        middleName:{
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true
        },
        userRole: {
            type: DataTypes.ENUM('author', 'borrower', 'admin'),
            allowNull: false,
        }
    })

    return Users;
}
