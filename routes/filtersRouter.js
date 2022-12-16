const Router = require('express')
const router = new Router()
const filtersController = require('../controllers/filtersController')

router.post('/add', filtersController.add)
router.post('/get', filtersController.get)
router.post('/delete', filtersController.delete)

module.exports = router