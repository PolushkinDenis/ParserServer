const Router = require('express')
const router = new Router()
const historyController = require('../controllers/historyController')

router.post('/add', historyController.add)
router.post('/get', historyController.get)
router.post('/delete', historyController.delete)

module.exports = router