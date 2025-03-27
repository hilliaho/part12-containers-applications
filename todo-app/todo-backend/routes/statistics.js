const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis/index');

/* GET statistics listing. */
router.get('/', async (_, res) => {
  try {
    const todos = await getAsync('added_todos');
    // Jos 'added_todos' ei ole asetettu, palautetaan oletusarvo 0
    res.json({ added_todos: todos ? parseInt(todos, 10) : 0 });
  } catch (error) {
    console.error('Error fetching statistics from Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
