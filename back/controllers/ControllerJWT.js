const Register = require('../models/RegisterModel')
const Bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

require('dotenv').config()


const LoginAndRegisterController = {

    Login : async function(req,res){
        const email = req.body.email
        const password = req.body.password

        // Seleciona o documento por meio do e-mail
        const selectedUser = await Register.findOne({ email : email })
        

        const comparePassword = Bcrypt.compareSync(password, selectedUser.password)

        const dataUser = {
            _id : selectedUser._id,
            admin : selectedUser.admin
        }

        const token = Jwt.sign(dataUser, process.env.TOKEN)

        if(comparePassword == true){
            res.header('authorization-token', token)
            res.send('Usuário logado')
        }else{
            res.status(401).send('Usuário ou senha incorretos')
        }
    },

    Register : async function(req,res){

        let password = req.body.password
        const cryptPassword = Bcrypt.hashSync(password, 14)

        const register = await new Register({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : cryptPassword
        })

        // Procura o usename no banco de dados
        const verifyUsername = await Register.findOne({ username : register.username})

        // Se ja possuir um username igual ele retorna erro 
        if(verifyUsername){
            res.status(400).send('Username ja cadastrado')
        }

        await register.save()
        res.status(200).send('Usuário cadastrado')
    },

    Edit : async function(req,res){

        const id = await req.params.id
        const data = {}

        data.name = await req.body.name
        data.username = await req.body.username
        data.email = await req.body.email
        
        if(req.body.password){
            data.password = Bcrypt.hashSync(req.body.password, 14)
        }

        if(data.name == undefined){
            delete data.name
        }

        if(data.username == undefined){
            delete data.lastName
        }

        if(data.email == undefined){
            delete data.email
        }

        if(data.password == undefined){
            delete data.password
        }

        await Register.findByIdAndUpdate(id, data)
        res.send('Usuário Atualizado')
    }

}

module.exports = LoginAndRegisterController