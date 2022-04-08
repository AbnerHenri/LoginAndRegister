const express = require('express')
const router = express.Router()
const cors = require('cors')
const Controllers = require('../controllers/ControllerJWT')

router.use(cors())

router.post('/', express.json(), Controllers.Login)
router.post('/register', express.urlencoded({ extended : true}), Controllers.Register)


module.exports = router