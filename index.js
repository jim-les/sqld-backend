// index.js
const express = require('express');
const { Sequelize } = require('sequelize')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bankCardRoutes = require('./routes/bankCardRoutes');
const sqlInjectionDetection = require('./middleware/sqlInjectionDetection');
// cors
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(sqlInjectionDetection);


const sequelize = require('./config/db');

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/bankcards', bankCardRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
