const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env file

// Create a new Sequelize instance and configure the connection
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    dialect: 'mysql', // Use MySQL as the dialect
    port: process.env.DB_PORT, // Port (default is 3306 for MySQL)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;