module.exports = (sequelize, DataTypes) => {
    const Libraries = sequelize.define('Libraries', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        paranoid: true,  // Enable soft deletion
        timestamps: true // Automatically manage createdAt and updatedAt
    });

    return Libraries;
};
