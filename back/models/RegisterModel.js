const mongoose = require('mongoose')

const Register = mongoose.Schema({
    name : {type : String, required : true},
    lastName : {type : String, required : true},
    password : {type : String, required : true}
})

module.exports = mongoose.model('Register', Register)