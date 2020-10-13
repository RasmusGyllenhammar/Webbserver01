const express = require('express')
const PersonModule = require('./Personmodule')
const dBModule = require('./dBModule')
const app = express()
const port = 3001

const clientDir = __dirname + "\\client\\"

const mongoose = require('mongoose');

//--------------------------------------------------------------


app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))

app.get('/mane', (req, res) => {
  res.sendFile(clientDir + "maneprofile.jpg")
})

app.get('/style', (req, res) => {
  res.sendFile(clientDir + "style.css")
})


app.post('/', function (req, res) {
  
  dBModule.StorePerson(PersonModule.createPerson(req.body.name, req.body.email));
  
  res.redirect('/')
})

app.get('/teknik', (req, res) => res.send('ECONOMY'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

