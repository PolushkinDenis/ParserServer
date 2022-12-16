const ApiError = require('../error/ApiError');
const {History} = require('../models/models')

class historyController {
    async add(req, res, next) {
        try {
            const {userId, filters, search, site} = req.body
            console.log(filters)
            const userSearch = await History.create({
                userId,
                filters: JSON.stringify(filters),
                search: JSON.stringify(search), 
                site: site    
            })
            console.log("Добалено")
    
            return res.json({message: 'Поиск добавлен'})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {userId} = req.body
            console.log("Получение истории")
            const userSearch = await History.findAll({where: {userId: userId}})
            return res.json(userSearch)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            console.log("Удаление истории")
            console.log(id)
            
            const userSearch = await History.destroy({where: {id: id}})
            return res.json(userSearch)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new historyController()