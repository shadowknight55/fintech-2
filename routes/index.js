import express from 'express';
import Transaction from '../models/transaction.js'; // Assuming you have a Transaction model
import User from '../models/user.js'; // Assuming you have a User model

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  // console.log("SSR UserID", userId);
  res.render('index', { title: 'Home Page' });
});

// Get all transactions
router.get('/transactions', async (req, res) => {
    console.log("Transactions============ ",)
   try {
        const userId = req.session.userId; // Assuming user session contains userId
       //if (!userId) return res.status(401).json({ message: 'Unauthorized' });
       const transactions = await Transaction.findAll({ where: { user_id: userId } });
       res.render('transactions', { transactions });
   } catch (error) {
       console.error('Error fetching transactions:', error);
       res.status(500).json({ message: 'Internal server error', error: error.message });
   }
});

const widthDrawalType =  {
  WITHDRAW: 'withdraw', 
  TRANSACTION: 'transaction',
  DEPOSIT: 'deposit',
}
router.post('/transactions', async (req, res) => {

const user_id = req.session.userId; // Assuming user session contains userId
  const { amount, type, description} = req.body;
  console.log("POST:::Transactions", req.body);
console.log("Original NUMBER:::", typeof(amount), "PARSED NUMER:::", typeof(parseInt (amount)))
  const transaction = await Transaction.create({ 
    description: description,
    user_id : user_id,
    amount : amount,
    type: widthDrawalType.WITHDRAW,
  });

// New route to handle transaction submission
router.post('/transactions', async (req, res) => {
    const { description, amount, type } = req.body;

    try {
        // Create a new transaction
        const transaction = await Transaction.create({
            description,
            amount,
            type,
            user_id: req.session.userId // Assuming you have user session management
        });

        // Redirect to the transactions page with the new transaction
        res.redirect(`/transactions?description=${encodeURIComponent(description)}&amount=${amount}&type=${type}`);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to display transactions
router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.findAll({ where: { user_id: req.session.userId } });
    res.render('transactions', { transactions });
});

})
// Create a transaction
router.post('/', async (req, res) => {
  const { amount, type } = req.body;
  const userId = req.user.userId;

  try {
    if (!amount || amount <= 0 || !type || !['deposit', 'withdraw', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Invalid transaction type or amount.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if ((type === 'withdraw' || type === 'expense') && user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance.' });
    }

    if (type === 'withdraw' || type === 'expense') {
      user.balance -= amount;
    } else if (type === 'deposit') {
      user.balance += amount;
    }

    const transaction = await Transaction.create({ amount, type, userId });
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error.' });
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
  console.log("SSR UserID ===>>j", req.params);
  try {
    const userId = 1; // Replace with session or token logic
    const transactions = await Transaction.findAll({ where: { user_id: userId } });

    res.render('dashboard', { transactions });
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});


// User registration route
// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      // Create a new user without hashing the password
      const user = await User.create({ username, email, password }); // Store password as plain text

      // Optionally, yPou can set the user_id in the session or return it
      req.session.userId = user.id; // Store user ID in session

      // Redirect to dashboard after successful registration
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Login route
// Login route
router.post('/logon', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'User  not found' });
        }

        // Compare the password (since we are storing it as plain text)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Store user ID in session
        req.session.userId = user.id; // Store user ID in session
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error); // Log the error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



// Render routes for login, register, and dashboard
router.get('/login', (req, res) => {
  console.log("login page route"); 
  res.render('login');
  
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

export default router;