const Pool = require('pg').Pool;
const config = require('./config');

console.log(config.conopts)

const pool = new Pool(config.conopts);

//pool.

function getOne() {
  pool.connect((err, client) => {
    client.query('SELECT * FROM users', (err, data) => {
      console.log(data.rows)
      client.release();
    })
  })
}

getOne();