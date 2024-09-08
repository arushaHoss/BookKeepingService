module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        libraryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        borrowerId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        charge: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {});

    return Books;
};
