const mongoose = require('mongoose')

const Login = mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true}
})

module.exports = mongoose.model('Login', Login)