const express = require('express')
const PersonModule = require('./Personmodule')
const dBModule = require('./dBModule')
const messageModel = require('./MessageModel')
const app = express()
const port = 3001

const clientDir = __dirname + "\\client\\"

const mongoose = require('mongoose');

//--------------------------------------------------------------


app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(clientDir))

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))

app.get('/mane', (req, res) => {
  res.sendFile(clientDir + "maneprofile.jpg")
})

app.get('/style', (req, res) => {
  res.sendFile(clientDir + "style.css")
})






app.post('/', function (req, res) {
  
  dBModule.Store(PersonModule.createPerson(req.body.name, req.body.email));

  
  
  res.redirect('/')
})
//------------------------------------------- 
app.get('/messages', (req, res) => {
  const messages = messageModel.getAllMessages()
  res.render('pages/messages.ejs', {messages: messages}) //första messages är den i ejs och den andra är constanten
 
})

app.post('/messages', async (req, res) =>{
  
  let message = messageModel.newMessage(req.body.message, req.body.email)
  dBModule.Store(message)
  const messages = messageModel.getAllMessages()//await här
  res.render('pages/messages.ejs', {messages: messages})
})



app.get('/teknik', (req, res) => res.send('ECONOMY'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

