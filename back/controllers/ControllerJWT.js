const Register = require('../models/RegisterModel')
const Bcrypt = require('bcryptjs')
const { findOne } = require('../models/RegisterModel')


const LoginAndRegisterController = {

    Login : async function(req,res){
        const email = req.body.email
        const password = req.body.password
        const selectedUser = await Register.findOne({ email : email })

        const comparePassword = Bcrypt.compare(selectedUser.password, password)

        if(comparePassword){
            res.send('Usuário logado')
        }else{
            res.status(404).send('Usuário ou senha incorretos')
        }
    },

    Register : async function(req,res){

        let password = req.body.password
        const cryptPassword = Bcrypt.hashSync(password, 14)

        const register = await new Register({
            name : req.body.name,
            lastName : req.body.name,
            email : req.body.email,
            password : cryptPassword
        })

        await register.save()
        res.status(200).send('Usuário cadastrado')
    },

    Edit : async function(req,res){

        const id = await req.params.id
        const data = {}

        const cryptPassword = Bcrypt.hashSync(req.body.password, 14)

        data.name = await req.body.name 
        data.lastName = await req.body.lastName
        data.email = await req.body.email
        data.password =  cryptPassword

        if(data.name || data.lastName || data.email || data.password){
            await Register.findByIdAndUpdate(id, data)
            res.status(200).send('Usuario atualizado')
        }else{
            res.send('Preencha um dos campos para editar')
        }
    }

}

module.exports = LoginAndRegisterController