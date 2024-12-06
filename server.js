// Import necessary modules
// import express from 'express';   // Import Express.js (commented out for now)
import sequelize from './config/database.js';  // Import the Sequelize instance to interact with the database
// import routes from './routes/index.js';  // Import routes (commented out for now)
import User from './models/user.js';  // Import the 'User' model for interacting with the 'Users' table
import Transaction from './models/transaction.js';  // Import the 'Transaction' model for interacting with the 'Transactions' table
// import 'dotenv/config';  // Import dotenv to load environment variables (commented out)

try {
  // Authenticate the database connection to ensure it's working
  await sequelize.authenticate();  // This checks if the database connection can be established
  console.log('Database connected');  // If successful, log this message

  // Sync the 'User' and 'Transaction' models to ensure the corresponding tables are created/updated in the database
  await User.sync();  // Ensures the 'Users' table is created if it doesn't exist, or updated to reflect any changes to the model
  await Transaction.sync();  // Ensures the 'Transactions' table is created if it doesn't exist, or updated to reflect any changes to the model

  console.log('Database synchronized');  // If the tables were successfully synced, log this message

  // Start the Express server and listen for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Log that the server is running, with dynamic port number
  });

} catch (error) {
  // If there’s any error with the database connection or syncing, log the error
  console.error('Error connecting to the database:', error);
}
