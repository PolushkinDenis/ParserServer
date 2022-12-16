const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carRouter = require('./carRouter')
const filtersRouter = require('./filtersRouter')
const historyRouter = require('./historyRouter')

router.use('/user', userRouter)
router.use('/car', carRouter)
router.use('/filters', filtersRouter)
router.use('/history', historyRouter)

module.exports = router