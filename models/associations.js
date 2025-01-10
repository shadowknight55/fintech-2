import User from './user.js';
import Transaction from './transaction.js';

// Define a one-to-many relationship where a User can have multiple Transactions
User.hasMany(Transaction, { 
    // Specify the foreign key in the Transaction model that links to the User
    foreignKey: 'userId', 
    // Create an alias for the relationship to access transactions via user.transactions
    as: 'transactions' 
});

// Define the inverse relationship where a Transaction belongs to a single User
Transaction.belongsTo(User, { 
    // Specify the foreign key in the Transaction model that links back to the User
    foreignKey: 'userId', 
    // Create an alias for the relationship to access the user via transaction.user
    as: 'user' 
});

// Export the User and Transaction models for use in other parts of the application
export { User, Transaction };