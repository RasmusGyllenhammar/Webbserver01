const express = require('express')
const { isValidObjectId } = require('mongoose')
const app = express() //objekt av express, instans
const port = 3000
const staticDir = __dirname + '\\client\\'

const dbModule = require('./dBModule')
const MessageModel = require('./MessageModel')





//app.get('/', (req, res) => res.sendFile(__dirname + '\\client\\index.html')) // när man frågar efter /sidan så skickar man texten

app.use(express.static(staticDir)) //alla statiska filer ligger i mappen i client

app.use(express.json()) //gör så att man kan skicka post
app.use(express.urlencoded())

app.set('view engine', 'ejs')  //vymotor det som kommer att synas som ejs, dynamikst html



const server = require('http')
const io = require('socket.io')(server)

io.on('connection', socket => {
  
  socket.emit('chat-message', 'hello world')
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', message)
  })
})





app.get('/index', async (req, res) => { // för nya ejs
  
  
  let allMessages = await MessageModel.getAllMessage()
  res.render('pages/index.ejs', {message : allMessages})
})

app.post('/index', async (req, res) => { //request och response

  const message = await MessageModel.createMessage(req.body.email, req.body.message)  
 await dbModule.Store(message) 
  //FÖR ATT KUNNA SKRIVA UT FLER MEDDELANDEN FUNNKAR EJ
  const messages = await MessageModel.getAllMessage();
  res.render('pages/index.ejs' , {message : messages.reverse()})
})

app.get('/', (req, res) => {

  res.render('pages/kungen.ejs')
})


app.get('/kungen', (req, res) => {

  res.render('pages/liverpool.ejs')
  
})







app.listen(port, () => console.log(`Example app listening on port ${port}!`))


