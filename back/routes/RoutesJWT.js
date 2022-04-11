const express = require('express')
const router = express.Router()
const cors = require('cors')
const Controllers = require('../controllers/ControllerJWT')

router.use(cors())

router.post('/', express.json(), Controllers.Login)
router.post('/register', express.json(), Controllers.Register)
router.post('/userpage', express.json(), Controllers.userPage)

router.put('/edit', express.json(), Controllers.Edit)


module.exports = router