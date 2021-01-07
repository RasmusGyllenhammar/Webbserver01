const express = require('express')
const app = express() //objekt av express, instans
const port = 3000
const staticDir = __dirname + '\\client\\'

const dbModule = require('./dBModule')
const MessageModel = require('./MessageModel')

const messages = []



//app.get('/', (req, res) => res.sendFile(__dirname + '\\client\\index.html')) // när man frågar efter /sidan så skickar man texten

app.use(express.static(staticDir)) //alla statiska filer ligger i mappen i client

app.use(express.json()) //gör så att man kan skicka post
app.use(express.urlencoded())

app.set('view engine', 'ejs')  //vymotor det som kommer att synas som ejs, dynamikst html




app.get('/index', async (req, res) => { // för nya ejs
  res.render('pages/index.ejs', {message: "meddelande", messageList: messages}) 
  
  let allMessages = await MessageModel.getAllMessage()
  res.render('pages/index.ejs', {messages : allMessages})
})

app.post('/index', async (req, res) => { //request och response
 res.render('pages/index.ejs', {message: req.body.message}) //Kommer redirecta en till start sidan efter man skickar meddelande

  const message = MessageModel.createMessage(req.body.email, req.body.message)  
  dbModule.Store(message) 
  //FÖR ATT KUNNA SKRIVA UT FLER MEDDELANDEN
  let messages = await MessageModel.getAllMessage();
  res.render('pages/index.ejs' , {message : messages})
})

app.get('/', (req, res) => {
  res.render('pages/test.ejs')
})


app.get('/liverpool', (req, res) => {
  res.render('pages/liverpool.ejs')
  
})







app.listen(port, () => console.log(`Example app listening on port ${port}!`))


