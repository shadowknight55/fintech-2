// Import the Sequelize module to interact with the MySQL database
const { Sequelize } = require('sequelize');

// Load environment variables from the .env file for sensitive information
require('dotenv').config();  // This will read the .env file and make its variables available in process.env

// Create a new Sequelize instance to manage the database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name, sourced from the environment variables (e.g., 'fintech')
  process.env.DB_USER,     // Database user, sourced from the environment variables (e.g., 'root')
  process.env.DB_PASSWORD, // Database password, sourced from the environment variables (e.g., 'password123')
  {
    host: process.env.DB_HOST,    // Host where the database server is running (e.g., 'localhost')
    dialect: 'mysql',             // Specifies the type of database (here, MySQL is used)
    port: process.env.DB_PORT,    // Port the MySQL server is listening on (default is 3306 for MySQL)
  }
);

// Test the database connection by attempting to authenticate
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!'); // If successful, log a success message
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // If there is an error, log the error message
  });

// Export the sequelize instance so it can be used in other parts of the application (e.g., for defining models)
module.exports = sequelize;
