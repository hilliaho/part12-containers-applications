const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis/index');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const todosCount = await getAsync('added_todos')
  const newTodosCount = todosCount ? parseInt(todosCount) + 1 : 1;
  await setAsync('added_todos', newTodosCount)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  req.todo ? (
    res.send(req.todo)
  ) : (
    res.sendStatus(404)
  )
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (req.todo) {
    req.todo.text = req.body.text || req.todo.text
    req.todo.done = req.body.done || req.todo.done
    await req.todo.save()
    res.send(req.todo)
  } else {
    res.sendStatus(404)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
