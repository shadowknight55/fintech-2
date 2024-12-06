// Import necessary modules
import { DataTypes } from 'sequelize';  // DataTypes is used to define the column types for Sequelize models
import sequelize from '../config/database.js';  // Import the Sequelize instance from the database configuration

// Define the 'Transaction' model with Sequelize
const Transaction = sequelize.define('Transaction', {
  // Define the 'id' column with auto-increment and primary key
  id: {
    type: DataTypes.INTEGER,    // The column type is INTEGER
    primaryKey: true,           // This column is the primary key for the table
    autoIncrement: true,        // Automatically increment the value for each new record
  },
  
  // Define the 'amount' column for the transaction value
  amount: {
    type: DataTypes.DECIMAL(10, 2),  // DECIMAL type with a maximum of 10 digits and 2 decimal places
    allowNull: false,               // This field is required (cannot be null)
  },
  
  // Define the 'type' column to specify whether the transaction is a 'credit' or 'debit'
  type: {
    type: DataTypes.ENUM('credit', 'debit'), // Enum type restricting values to 'credit' or 'debit'
    allowNull: false,                      // This field is required
  },

  // Define the 'description' column for optional transaction details
  description: {
    type: DataTypes.STRING,     // Column type is STRING (text)
    allowNull: true,            // This field is optional (can be null)
  },

  // Define the 'user_id' column to associate each transaction with a specific user
  user_id: {
    type: DataTypes.INTEGER,  // The column type is INTEGER
    allowNull: false,         // This field is required
    references: {
      model: 'Users',         // The 'user_id' references the 'id' column in the 'Users' table
      key: 'id',              // 'id' is the primary key in the 'Users' table
    },
  },
}, {
  timestamps: true,  // Automatically add 'createdAt' and 'updatedAt' columns to the table
});

// Sync function to test the database connection and ensure tables are created
const syncDb = async () => {
  try {
    // Test the database connection to ensure it works
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the 'Customer' and 'Product' tables (this should be adapted based on your app)
    await Customer.sync();   // Ensure the 'Customer' table is created
    await Product.sync();    // Ensure the 'Product' table is created
    console.log('Customer and Product tables synced successfully.');
  } catch (error) {
    // Log any connection or sync errors
    console.error('Unable to connect to the database:', error);
  }
};

// Export the 'Transaction' model so it can be used in other parts of the application
export default Transaction;
