const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: String, 
    message : String
});

const Message = mongoose.model('Message', messageSchema);

exports.newMessage = (email, message) => {
    var message = new Message({
        email: email,
        message : message
    });
    return message
}

exports.getAllMessages = async () => {
    let messages = await Message.find({})
    return messages
}