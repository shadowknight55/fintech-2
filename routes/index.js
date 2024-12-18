import express from 'express';
import Transaction from '../models/transaction.js'; // Assuming you have a Transaction model
import User from '../models/user.js'; // Assuming you have a User model

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
      const userId = req.session.userId; // Assuming user session contains userId
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const transactions = await Transaction.findAll({ where: { user_id: userId } });
      res.render('transactions', { transactions });
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
// Create a new transaction
router.post('/transactions', async (req, res) => {
  try {
      const { description, amount, type } = req.body;
      const userId = req.session.userId; // Use session to identify the user
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      // Log the incoming transaction data
      console.log('Creating transaction:', { description, amount, type, userId });

      // Create the transaction in the database
      const transaction = await Transaction.create({
          description,
          amount,
          type,
          user_id: userId, // Associate the transaction with the logged-in user
      });

      // Log the created transaction
      console.log('Transaction created:', transaction);

      res.status(201).json(transaction); // Respond with the created transaction
  } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
});

// Update a transaction
router.put('/transactions/:id', async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { description, amount, type } = req.body;
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [updated] = await Transaction.update(
      { description, amount, type },
      { where: { id: transactionId, user_id: userId } }
    );

    if (updated) {
      const updatedTransaction = await Transaction.findByPk(transactionId);
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ message: 'Error updating transaction', error: error.message });
  }
});

// Delete a transaction
router.delete('/transactions/:id', async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const deletedCount = await Transaction.destroy({ where: { id: transactionId, user_id: userId } });

    if (deletedCount === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
});


// User routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const userId = 1; // Replace with session or token logic
    const transactions = await Transaction.findAll({ where: { user_id: userId } });

    res.render('dashboard', { transactions });
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
  
      // Redirect to dashboard after successful registration
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
          return res.status(401).json({ message: 'User  not found' });
      }

      // Here, you should compare the password with the hashed version
      if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Set userId in session
      req.session.userId = user.id; // Store user ID in session

      // Redirect to dashboard upon successful login
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



// Render routes for login, register, and dashboard
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

export default router;