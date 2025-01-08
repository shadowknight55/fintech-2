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

// Hook for hashing the password before saving a new user
User.beforeCreate(async (user) => {
  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the user's password with the generated salt
  user.password = await bcrypt.hash(user.password, salt);
});

// Instance method for validating the password
User.prototype.checkPassword = async function (password) {
  // Compare the provided password with the hashed password stored in the database
  return bcrypt.compare(password, this.password);
};

export default User;