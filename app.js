import express from 'express';
import sequelizeConnection, { connectDB } from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import bcrypt from 'bcrypt';
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js';
import authenticateToken from './middleware/authMiddleware.js'; // Import authentication middleware
import { User, Transaction } from './models/associations.js';
import './models/associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Session middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser()); // Apply cookie-parser globally


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public/'));

// Render views for basic navigation
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: { model: Transaction, as: 'transactions' },
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const transactions = user.transactions;

    // Calculate income, expenses, and balance
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense' || t.type === 'withdraw')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = user.balance;

    res.render('dashboard', { balance, income, expenses, transactions });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).send('Internal server error.');
  }
});



// Routes
app.use('/user', userRoutes); // Mount authentication routes
app.use('/transactions', transactionRoutes);

connectDB().then(() => {
  sequelizeConnection.sync().then(() => {
    console.log('Database synced');
  }).catch((error) => {
//Sync database (Add this to sync your Sequelize models)
    console.error('Error syncing database:', error);
  }); 
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});