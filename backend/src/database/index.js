const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, () => {console.log("MongoDB conectado.")});
mongoose.Promise = global.Promise;

module.exports = mongoose