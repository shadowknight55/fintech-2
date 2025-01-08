import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the Transaction model using sequelize
const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.FLOAT, // Define the type of the amount attribute as a floating-point number
      allowNull: false, // Ensure that the amount cannot be null
      validate: {
        min: 0.01, // Validate that the transaction amount is at least 0.01 (positive)
      },
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdraw', 'expense'), // Define the type attribute as an ENUM with specific values
      allowNull: false, // Ensure that the type cannot be null
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
  
  // Export the Transaction model for use in other parts of the application
  export default Transaction;