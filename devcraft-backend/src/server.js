require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение роутов
app.use('/api/auth', authRoutes);

// Проверка подключения к БД
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error:', err));
  sequelize.authenticate()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    
    // Синхронизация моделей с базой данных
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  })
  .catch(err => console.error('Connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/chat', chatRoutes);