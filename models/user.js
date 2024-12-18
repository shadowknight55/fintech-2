import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the 'User' model with Sequelize
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure the username is unique
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure the email is unique
    validate: {
      isEmail: true,  // Ensure the email is in a valid email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// No password hashing or comparison methods

export default User;