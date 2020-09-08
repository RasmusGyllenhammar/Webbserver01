const express = require('express')
const app = express()
const port = 3001

const clientDir = __dirname + "\\client\\"



app.get('/', (req, res) => res.sendfile(clientDir + "index.html"))

app.get('/mane', (req, res) => {
  res.sendFile(clientDir + "maneprofile.jpg")
})

app.get('/style', (req, res) => {
  res.sendFile(clientDir + "style.css")
})


app.get('/teknik', (req, res) => res.send('ECONOMY'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
