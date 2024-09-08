require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const {
//   PASSWORD_HASH_SALT_ROUNDS,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./users.model')(sequelize, DataTypes);
db.books = require('./books.model')(sequelize, DataTypes);
db.libraries = require('./libraries.model')(sequelize, DataTypes);

// Define associations
const defineAssociations = (models) => {
  // Example associations for Users
  models.users.hasMany(models.books, { foreignKey: 'authorId', as: 'WrittenBooks' });
  models.users.hasMany(models.books, { foreignKey: 'borrowerId', as: 'BorrowedBooks' });

  // Example associations for Books
  models.books.belongsTo(models.users, { foreignKey: 'authorId', as: 'Author' });
  models.books.belongsTo(models.users, { foreignKey: 'borrowerId', as: 'Borrower' });
  models.books.belongsTo(models.libraries, { foreignKey: 'libraryId', as: 'Library' });

  // Example associations for Libraries
  models.libraries.hasMany(models.books, { foreignKey: 'libraryId', as: 'Books' });
};

// Define associations
defineAssociations(db);
// Function to sync database and handle default records
const syncDatabase = async () => {
  try {
    // Sync the database
    await db.sequelize.sync({ alter: false });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

// Sync database and handle default records
syncDatabase();

module.exports = db;