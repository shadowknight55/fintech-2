import express from 'express'; // Importing the express framework
import { Transaction, User } from '../models/associations.js'; // Importing Transaction and User models
import authenticateToken from '../middleware/authMiddleware.js'; // Importing middleware for token authentication

const router = express.Router(); // Creating a new router instance

// Create a transaction
router.post('/', authenticateToken, async (req, res) => {
  // Destructuring amount and type from the request body
  const { amount, type, description } = req.body;
  // Retrieving userId from the authenticated user
  const userId = req.user.userId;

  try {
    // Finding the user by primary key (userId)
    const user = await User.findByPk(userId);
    // If user is not found, return a 404 error
    if (!user) return res.status(404).send('User  not found.');

    // Ensure balance is treated as a number
    let currentBalance = parseFloat(user.balance);

    // Handling different transaction types
    if (type === 'withdraw' || type === 'expense') {
      // Check if the current balance is sufficient for withdrawal or expense
      if (currentBalance < amount) return res.status(400).send('Insufficient balance.');
      // Deduct the amount from the current balance
      currentBalance -= parseFloat(amount);
    } else if (type === 'income') {
      // Add the amount to the current balance for deposits
      currentBalance += parseFloat(amount);
    }

    // Update the user's balance
    user.balance = currentBalance;
    // Create a new transaction record
    const transaction = await Transaction.create({ amount, type, userId, description });
    // Save the updated user balance to the database
    await user.save(); // Save the updated balance

    // Respond with the created transaction and a 201 status code
    res.status(201).json(transaction);
  } catch (error) {
    // Log any errors that occur during the transaction creation process
    console.error('Error creating transaction:', error);
    // Respond with a 500 status code for internal server error
    res.status(500).send('Internal server error.');
  }
});

export default router;