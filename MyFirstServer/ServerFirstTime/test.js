const express = require('express')
const app = express()
const port = 3001

const clientDir = __dirname + "\\client\\"

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
//kollar ifall man har connect
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
 //har connected
});

const personSchema = new mongoose.Schema({
    name: String,
    email: String
});


const Person = mongoose.model('person', personSchema);
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
  //mognooose
  console.log(req.body.name)
  console.log(req.body.email)
  const person = new Person({name: req.body.name, email: req.body.email}); 
  person.save();
  
  
  res.redirect('/')
})

app.get('/teknik', (req, res) => res.send('ECONOMY'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

