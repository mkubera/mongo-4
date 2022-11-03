import mongoose from "mongoose"

// DB SETUP & CONN
mongoose.Promise = global.Promise;
const DB_HOST = "mongodb+srv://cluster0.pus3kf2.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
const credentials = "./cert/X509-cert-4124078188236380481.pem"
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslKey: credentials,
    sslCert: credentials 
};
mongoose.connect(DB_HOST, DB_OPTIONS);

// SCHEMAS
const catsSchema = new mongoose.Schema({
    nickname: {
        type: String,
        minlength: 2,
        maxlength: 7,
        required: [true, 'Nickname is required'],
        unique: true,
        required: true,
        index: 1,
    },
    age: {
        type: Number,
        min: 1,
        max: 50,
        required: true,
    },
    owner: {
      name: String,
      address: [String], // typ - tablica łańcuchów
      birthday: Date,
    },
});

const Cat = mongoose.model('cat', catsSchema);


// ACTIONS
// cat returns Promise
const cat = Cat.create({
    nickname: 'Barsik',
    age: 1,
});

cat
.then(({_id}) => {
    Cat.findByIdAndRemove({ _id })
    .then(console.log)
    .catch(console.log)
})
.catch(console.log)