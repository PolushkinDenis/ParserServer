const { Router } = require('express')
var fetchProductListAvtoRu = require('../avtoRu')
var fetchProductListAvito = require('../avito')

const router = Router()


router.post('/', async (req, res) => {
    try {
        const { filters } = req.body
        console.log("1")

        //const avitoRes = await fetchProductListAvito.fetchProductListAvito(filters)
        //const autoRuRes = await fetchProductListAvtoRu.fetchProductListAvtoRu(filters)
        // async function getAvito() {
        //     console.log("3")
        //     const avitoRes = await fetchProductListAvito.fetchProductListAvito()
        //     console.log("4")
        //     return avitoRes
        // }
        // let res = {}
        // if(avito === true) {
        //     console.log("2")
        //     res = getAvito()
        //     console.log("5")

        // }
        //console.log(autoRuRes)

        console.log(filters)

        res.status(201).json(avitoRes)
    }
    catch (e) {
        res.status(500).json({ message: "Что то пошло не так" })

    }
})

module.exports = router