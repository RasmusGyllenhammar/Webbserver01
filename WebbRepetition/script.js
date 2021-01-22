const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//när vi kallar på ett event så kallas det en funktion med datan från serveern
socket.on('chat-message', data => {

    console.log(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault() //avbryter eventen ifall det kan avbrytas, kan ej spamma skicka knappen
    const message = messageInput.value 
    socket.emit('send-chat-message', message)   //emit skicka information from klienten till servern
    messageInput.value = ''
})