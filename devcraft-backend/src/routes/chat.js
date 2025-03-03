const router = require('express').Router();
const { Message, User } = require('../models/index');
const jwt = require('jsonwebtoken');

// Получение истории сообщений
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{
        model: User,
        attributes: ['email']
      }],
      order: [['createdAt', 'ASC']]
    });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отправка нового сообщения
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const message = await Message.create({
      text: req.body.text,
      authorId: decoded.id
    });

    const result = await Message.findByPk(message.id, {
      include: [{
        model: User,
        attributes: ['email']
      }]
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;