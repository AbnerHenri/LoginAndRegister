const Register = require('../models/RegisterModel')
const Bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

require('dotenv').config()


const LoginAndRegisterController = {

    Login : async function(req,res){
        const email = await req.body.email
        const password = await req.body.password
        console.log(password)

        // Seleciona o documento por meio do e-mail
        const selectedUser = await Register.findOne({ email : email })

        if(!selectedUser){
            res.cookie('loginMessage=E-mail ou senha incorretos')
            res.redirect('http://localhost:3001/login')  
        }else{
            const comparePassword = Bcrypt.compareSync(password, selectedUser.password)
            const dataUser = {
                _id : selectedUser._id,
                admin : selectedUser.admin
            }
    
            const token = Jwt.sign(dataUser, process.env.TOKEN)
            const username = selectedUser.username
    
            if(comparePassword == true){
                res.setHeader('token', token)
                res.redirect(`http://localhost:3001/users/${username}`)
            }else{
                res.status(401)
                res.cookie('loginMessage=E-mail ou senha incorretos')
            }
        }     
        
    },

    Register : async function(req,res){

        const username = await req.body.username
        const email = await req.body.email


        // Procura o usename no banco de dados
        const verifyUsername = await Register.findOne({ username : username})
        const verifyEmail = await Register.findOne({ email : email })

        // const message = 'Usuário ou E-mail ja cadastrado'
        

        // Se ja possuir um username igual ele retorna erro 
        if(verifyUsername || verifyEmail){
            res.status(401)
            res.cookie('message=Username ou E-mail já cadastrado')
            res.redirect('http://localhost:3001/register')
        }else{
        const password = req.body.password
        console.log(password)
        const cryptPassword = Bcrypt.hashSync(password, 14)


        const register = await new Register({
            name : req.body.name,
            username : username,
            email : email,
            password : cryptPassword
        })


        await register.save()
        res.status(200)
        res.redirect('http://localhost:3001/login')
    }

        
    },

    Edit : async function(req,res){

        const id = await req.params.id
        const data = {}


        data.name = await req.body.name
        data.username = await req.body.username
        data.email = await req.body.email

        const verifyUsername = await findOne({ username : data.username})

        if(!verifyUsername){
            res.send('Username já cadastrado')
        }
        
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
    },
}

module.exports = LoginAndRegisterController