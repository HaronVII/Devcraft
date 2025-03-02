const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ where: { email }});
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;