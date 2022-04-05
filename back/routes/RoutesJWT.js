const express = require('express')
const router = express.Router()
const Controllers = require('../controllers/ControllerJWT')

router.post('/', express.urlencoded({ extended : true}), Controllers.Login)
router.post('/register', express.urlencoded({ extended : true}), Controllers.Register)


module.exports = router