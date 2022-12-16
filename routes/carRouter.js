const Router = require('express')
const router = new Router()
// const userController = require('../controllers/userController')
const carController = require('../controllers/carController')

router.post('/add', carController.add)
router.post('/get', carController.get)
router.post('/delete', carController.delete)

// router.post('/login', userController.login)
// router.get('/auth', authMiddleware, userController.check)

module.exports = router