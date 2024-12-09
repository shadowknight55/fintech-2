// Import necessary modules
import sequelize from './config/database.js';  // Import the Sequelize instance to interact with the database
import User from './models/user.js';  // Import the 'User' model for interacting with the 'Users' table
import Transaction from './models/transaction.js';  // Import the 'Transaction' model for interacting with the 'Transactions' table


try {
  // Authenticate the database connection to ensure it's working
  await sequelize.authenticate();  // This checks if the database connection can be established
  console.log('Database connected');  // If successful, log this message

  // Sync the 'User' and 'Transaction' models to ensure the corresponding tables are created/updated in the database
  await User.sync();  // Ensures the 'Users' table is created if it doesn't exist, or updated to reflect any changes to the model
  await Transaction.sync();  // Ensures the 'Transactions' table is created if it doesn't exist, or updated to reflect any changes to the model

  console.log('Database synchronized');  // If the tables were successfully synced, log this message


} catch (error) {
  // If there’s any error with the database connection or syncing, log the error
  console.error('Error connecting to the database:', error);
}
