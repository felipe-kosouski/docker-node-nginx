const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const createTableSql = `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`

connection.query(createTableSql, function(error, result) {
  if (error) throw error
  console.log("Table created")
})

const sql = `INSERT INTO users(name) values('Felipe Kosouski')`
connection.query(sql)
connection.end

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)
  connection.query('SELECT * FROM users', function(error, users) {
    if (error) {
      req.flash('error', error)
      res.send('<h1>Full Cycle Rocks!</h1> \
      <br> \
      <h2>No data to show</h2>')
    }else{
      res.send(`<h1>Full Cycle Rocks!</h1> \
      <br> \
      <h2>${users[0].id} - ${users[0].name}</h2>`)
    }
  })
  
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})