const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;

const todoController = require('../controllers/todoController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve files in assets folder any time user enters page
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

// route handlers
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/todos', todoController.getTodos, (req, res) => {
  res.json(res.locals.todos);
});

app.get('/populate', todoController.addTodoDB, (req, res) => {
  res.json(res.locals.todos);
});

// /:id is a query parameter
app.delete('/todo/:id', todoController.deleteTodo, (req, res) => {
  res.redirect('/');
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

// global err handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
