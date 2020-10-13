const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
//kollar ifall man har connect
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
 //har connected
});

exports.StorePerson = (input) => {
    input.save(() => {
        console.log("kung du kom in")
    })

}