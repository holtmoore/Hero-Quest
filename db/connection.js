const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://doueven1996:KfcqJfHC0uVIG9bZ@herocluster.ivt3edt.mongodb.net/')

mongoose.connection.on('connected', () => console.log('connected to mongoDB'))
mongoose.connection.on('error', (err) => console.log('oh no err'))

module.exports = mongoose