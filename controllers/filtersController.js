const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Filters} = require('../models/models')

class filtersController {
    async add(req, res, next) {
        try {
            const {userId, filters} = req.body
            console.log(filters)
            const userFilters = await Filters.create({
                userId,
                brand: JSON.stringify(filters.brand),
                model: JSON.stringify(filters.model),
                priceFrom: filters.priceFrom,
                priceTo: filters.priceTo,
                yearTo: filters.yearTo,
                yearFrom: filters.yearFrom,
                city: JSON.stringify(filters.city),
                sort: JSON.stringify(filters.sorting),        
            })
            console.log("Добалено")
    
            return res.json({message: 'Фильтр добавлен'})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {userId} = req.body
            console.log("Получение фильтра")
            const userFilters = await Filters.findAll({where: {userId: userId}})
            return res.json(userFilters)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            console.log("Удаление фильтра")
            console.log(id)
            
            const userFilters = await Filters.destroy({where: {id: id}})
            return res.json(userFilters)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new filtersController()