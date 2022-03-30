const express = require('express')
const routesUser = require('./routes/RoutesJWT')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.URL)
    .then(() => console.log('Connected'))
    .catch(() => console.log('Error'))

app.use(routesUser)

app.listen(3000, ()=> { console.log('Server Running') })