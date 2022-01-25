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

app.post('/post', (req, res) => {
  console.log(req)
  const title = req.body.title
  const content = req.body.content

  db.query(
    'INSERT INTO blogposts (title, content) VALUES (?, ?)',
    [title, content],
    (err, result) => {
      if (err) console.log(err)
      else {
        res.send('values inserted!')
      }
    }
  )
})

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
