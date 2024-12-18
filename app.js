import express from 'express';
import taskRoutes from './routes/index.js';
import sequelizeConnection, { connectDB } from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Register routes
app.use('/', taskRoutes);

// Sync database (Add this to sync your Sequelize models)
connectDB().then(() => {
  sequelizeConnection.sync().then(() => {
    console.log('Database synced');
  }).catch((error) => {
    console.error('Error syncing database:', error);
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});