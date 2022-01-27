//express
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use(express.json())

//mysql connection
const mysql = require('mysql')
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password123*',
  database: 'blogdb',
})

db.connect()

//post request endpoint
app.post('/post', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const email = req.body.email
  const gender = req.body.gender
  const status = req.body.status

  db.query(
    'INSERT INTO users (userName, email, gender, userStatus) VALUES (?, ?,?,?)',
    [name, email, gender, status],
    (err, result) => {
      if (err) console.log(err)
      else {
        res.send('values inserted!')
      }
    }
  )
})

//get request endpoint
app.get('/get', (req, res) => {
  db.query('SELECT * FROM users;', (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

//delete request endpoint
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

//update endpoint
app.put('/user', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const email = req.body.email
  const gender = req.body.gender
  const status = req.body.status

  db.query(
    'UPDATE users SET userName = ?, email = ?, gender = ?, userStatus = ? WHERE id = ?',
    [name, email, gender, status, id],
    (err, result) => {
      if (err) console.log(err)
      else res.send(result)
    }
  )
})

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
