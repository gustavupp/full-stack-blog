//express
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

/****************************mysql connection*********************************/
const mysql = require('mysql')
const db = mysql.createConnection({
  user: 'b3d2af5763bd4b',
  host: 'us-cdbr-east-05.cleardb.net',
  password: '1b7b746f',
  database: 'heroku_74fdc48ba3d5fda',
})
mysql: db.connect()
/****************************mysql connection*********************************/

//post request endpoint
app.post('/post', (req, res) => {
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
  res.send('server running')
})

//initiate server and start listening for requests on PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
