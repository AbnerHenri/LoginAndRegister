const express = require('express')
const router = express.Router()
const Controllers = require('../controllers/ControllerJWT')

// router.post('/', express.urlencoded(), Controllers.Login)
router.post('/register', express.json(), Controllers.Register)

module.exports = router