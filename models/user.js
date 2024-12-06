import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
}, {
  timestamps: true,
});

const syncDb = async () => {
  try {
    await sequelize.authenticate();  // Test DB connection
    console.log('Connection has been established successfully.');
    await Customer.sync();  // Ensure the Customer table is created
    await Product.sync();   // Ensure the Product table is created
    console.log('Customer and Product tables synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default User;