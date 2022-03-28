const Register = require('../models/LoginModel')
const Login = require('../models/LoginModel')


const LoginAndRegisterController = {

    Login : async function(req,res){
        const email = await req.body.email
        const password = await req.body.password

        try {
            
        } catch (error) {
            res.status(404).send('Usuário um senha incorretos')
        }
    },

    Register : async function(req,res){
        const register = await new Register({
            name : req.body.name,
            lastName : req.body.name,
            email : req.body.email,
            password : req.body.password
        })

        await register.save()
        res.status(200).send('Usuário cadastrado')
    }

}

module.exports = LoginAndRegisterController