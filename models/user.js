// Import necessary modules
import { DataTypes } from 'sequelize';  // DataTypes is used to define the column types for Sequelize models
import sequelize from '../config/database.js';  // Import the Sequelize instance from the database configuration

// Define the 'User' model with Sequelize
const User = sequelize.define('User', {
  // Define the 'id' column with auto-increment and primary key
  id: {
    type: DataTypes.INTEGER,    // The column type is INTEGER
    primaryKey: true,           // This column is the primary key for the table
    autoIncrement: true,        // Automatically increment the value for each new record
  },

  // Define the 'name' column for the user's full name
  name: {
    type: DataTypes.STRING,     // The column type is STRING (text)
    allowNull: false,           // This field is required (cannot be null)
  },

  // Define the 'username' column for the user's login name
  username: {
    type: DataTypes.STRING,     // The column type is STRING (text)
    allowNull: false,           // This field is required
    unique: true,               // This field must have a unique value (no duplicates)
  },

  // Define the 'email' column with email validation
  email: {
    type: DataTypes.STRING,     // The column type is STRING (text)
    allowNull: false,           // This field is required
    unique: true,               // This field must have a unique value
    validate: {
      isEmail: true,            // Ensures the value is a valid email format
    },
  },

  // Define the 'password_hash' column for storing hashed passwords
  password_hash: {
    type: DataTypes.STRING,     // The column type is STRING (text)
    allowNull: false,           // This field is required (cannot be null)
  },

  // Define the 'balance' column to store the user's account balance
  balance: {
    type: DataTypes.DECIMAL(10, 2),  // DECIMAL type with a maximum of 10 digits and 2 decimal places
    defaultValue: 0.00,             // Default balance value is set to 0.00
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

// Export the 'User' model so it can be used in other parts of the application
export default User;
