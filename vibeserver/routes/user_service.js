const Pool = require('pg').Pool;
const config = require('./config');

console.log(config.conopts)

const pool = new Pool(config.conopts);


function getAll(req, callback) {
  pool.query('SELECT * FROM users', (err, data) => {
    if (callback){
    console.log(data.rows)
    callback(data.rows)
    } else if (err) {
      throw err;
    }
  })
}

function createUser(req, callback) {
  pool.query('INSERT INTO users(username, ipaddress) VALUES($1, $2)', [req.body.username, req.body.ipaddress], (error, results) => {
    if (error) {
      throw error;
    }
    callback('User created!')
  });
};


function getById(req, callback) {
  const id = parseInt(req.params.id);

  pool.connect((err, client) => {
    client.query('SELECT FROM users WHERE id = $1', [id], (error, data) => {
      if (err) {
        client.release();
        throw error;
      }
      console.log(data.rows);
      callback(data.rows);
    });
    client.release();
  });
};

getAll();

module.exports = { createUser, getById, getAll };