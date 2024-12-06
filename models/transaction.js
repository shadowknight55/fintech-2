import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('credit', 'debit'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
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

export default Transaction;