const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
//kollar ifall man har connect
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
 //har connected
});

const kittySchema = new mongoose.Schema({
    name: string
});

const kitten = mongoose.model('kitten', kittySchema);

const silence = new kitten({name: 'Silence'});
console.log(silence.name); // 'silence'

kittySchema.methods.speak = function () {
    const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
}

const fluffy = new kitten({name: 'fluffy'});
fluffy.speak();

fluffy.save(function (err, fluffy){
    if(err) return console.error(err);
    fluffy.speak();
});

kitten.find(function (err, kittens){
    if(err) return console.error(err);
    console.log(kittens);
})

kitten.find({name: /^fluff/, callback});




