const express = require('express')
const router = express.Router()
const Controllers = require('../controllers/ControllerJWT')

router.post('/', express.json(), Controllers.Login)
router.post('/register', express.json(), Controllers.Register)

router.put('/edit/:id', express.json(), Controllers.Edit)

module.exports = router