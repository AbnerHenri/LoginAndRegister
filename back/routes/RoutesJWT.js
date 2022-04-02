const express = require('express')
const router = express.Router()
const Controllers = require('../controllers/ControllerJWT')

router.get('/users/:id', express.json(), Controllers.DataUsers)
router.get('/admin', Controllers.DataAdmin)

router.post('/', express.urlencoded({ extended : true}), Controllers.Login)
router.post('/register', express.urlencoded({ extended : true}), Controllers.Register)

router.put('/edit/:id', express.json(), Controllers.Edit)

module.exports = router