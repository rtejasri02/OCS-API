//npm install express mysql body-parser



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ocsDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// GET all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET user by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// POST new user
app.post('/users', (req, res) => {
  const user = req.body;
    // var fname = req.body.first_name;
    // var lname = req.body.last_name;
    // var email = req.body.email;
    // var avtr = req.body.avatar;
//console.log(fname, lname, email);
  const sql = 'INSERT INTO users(first_name,last_name,email,avatar) values(?,?,?,?)';
  connection.query(sql, [user.first_name,user.last_name,user.email,user.avatar], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User created successfully!', id: result.insertId });
  });
});

// PUT update user by id
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const sql = `UPDATE users SET first_name = ?,last_name =?, email = ?,avatar =? WHERE id = ${id}`;
  connection.query(sql, [user.first_name,user.last_name, user.email,user.avatar], (err, result) => {
    if (err) throw err;
    res.json({ message: `User with id ${id} updated successfully!` });
  });
});

// DELETE user by id
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: `User with id ${id} deleted successfully!` });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
