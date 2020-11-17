const express = require('express')
const app = express() //objekt av express, instans
const port = 3000
const staticDir = __dirname + '\\client\\'

//app.get('/', (req, res) => res.sendFile(__dirname + '\\client\\index.html')) // när man frågar efter /sidan så skickar man texten

app.use(express.static(staticDir))

app.use(express.json()) //gör så att man kan skicka post
app.use(express.urlencoded())

app.post('/', function (req, res) {
  res.send(req.body.message)
})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))


