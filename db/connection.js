const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://holtwmoore:4B5SdfWWPC2RuIfD@herodb0.aff99k8.mongodb.net/herodb')

mongoose.connection.on('connected', () => console.log('connected to mongoDB'))
mongoose.connection.on('error', (err) => console.log('oh no err'))
module.exports = mongoose