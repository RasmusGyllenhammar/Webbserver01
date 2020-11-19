const express = require('express')
const app = express() //objekt av express, instans
const port = 3000
const staticDir = __dirname + '\\client\\'

const dbModule = require('./dBModule')
const MessageModel = require('./MessageModel')



//app.get('/', (req, res) => res.sendFile(__dirname + '\\client\\index.html')) // när man frågar efter /sidan så skickar man texten

app.use(express.static(staticDir)) //alla statiska filer ligger i mappen i client

app.use(express.json()) //gör så att man kan skicka post
app.use(express.urlencoded())

app.post('/', function (req, res) { //request och response
  //res.send(req.body.message) tar en till ny sida med meddelandet
  res.redirect('/') //Kommer redirecta en till start sidan efter man skickar meddelande

  const message = MessageModel.createMessage(req.body.email, req.body.message)  

  dbModule.Store(message) // detta är konstanen med egenskaper från dBmoduel.js

})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))


