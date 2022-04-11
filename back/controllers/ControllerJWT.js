const Register = require('../models/RegisterModel')
const Bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

require('dotenv').config()


const LoginAndRegisterController = {

    Login : async function(req,res){
        const email = await req.body.email
        const password = await req.body.password


        // Seleciona o documento por meio do e-mail
        const selectedUser = await Register.findOne({ email : email })

        if(!selectedUser){
            res.status(200)
            res.json({ msg : 'E-mail ou senha incorretos'})
        }else{

            const comparePassword = Bcrypt.compareSync(password, selectedUser.password)

            const dataUser = {
                _id : selectedUser._id,
                admin : selectedUser.admin
            }
    
            const MyToken = Jwt.sign(dataUser, process.env.TOKEN)
            const username = selectedUser.username

            if(comparePassword == true){
                res.status(200)
                res.json({ token : MyToken, username : username })
            }else{
                res.status(200)
                res.json({ msg : 'E-mail ou senha incorretos'})
            }
            
        }     
        
    },

    Register : async function(req,res){

        const name = await req.body.name
        const username = await req.body.username
        const email = await req.body.email
        const password = await req.body.password


        // Procura o usename no banco de dados
        const verifyUsername = await Register.findOne({ username : username})
        const verifyEmail = await Register.findOne({ email : email })

        console.log(verifyEmail + ' | ' + verifyUsername)

        // Se ja possuir um username igual ele retorna erro 
        if(verifyEmail || verifyUsername){
            res.status(401)
            res.json({ msgError : 'Username ou E-mail já cadastrado'}) 
        }else{
        
            const cryptPassword = Bcrypt.hashSync(password, 14)

            const register = await new Register({
                name : name,
                username : username,
                email : email,
                password : cryptPassword
            })
    
            await register.save()
            res.status(200)
            res.json({ msgSucess : 'Salvo'})
        }

    },

    Edit : async function(req,res){

        const newUrl = await req.body.url

        const data = { 
            name : await req.body.name,
            username : await req.body.username,
            email : await req.body.email

        }

        const verifyUsername = await Register.findOne({ username : data.username })
        const verifyEmail = await Register.findOne({ email : data.email })

        if(verifyUsername || verifyEmail){
            res.json({ msgError : 'já cadastrado'})
        }else{

            const selectedUser = await Register.findOne({ username : newUrl })


                if(data.name == undefined){
                    delete data.name
                }

                if(data.username == undefined){
                    delete data.username
                }

                if(data.email == undefined){
                    delete data.email
                }

                const id = selectedUser._id
                const NewId = id.toString()

                await Register.findByIdAndUpdate(NewId, data)

                res.json({ url : data.username })
        }
    },

    userPage : async function(req,res){
        const username = await req.body.username
        const selectedUser = await Register.findOne({ username : username })

        res.json({
            name : selectedUser.name,
            username : selectedUser.username,
            email : selectedUser.email
        })

    }
}

module.exports = LoginAndRegisterController