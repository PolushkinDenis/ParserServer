const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Auto} = require('../models/models')

class CarController {
    async add(req, res, next) {
        try {
            const {userId, car} = req.body
            const userCar = await Auto.create({
                userId,
                name: car.name,
                price: car.price,
                city: car.city,
                image: car.image,
                href: car.href,
                info: car.info,
                description: car.description,
                time: car.time ,        
            })
            console.log("Добалено")
    
            return res.json({message: 'Авто добавлено'})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
      
    }

    async get(req, res, next) {
        try {
            const {userId} = req.body
            console.log("Получение авто")
            const userCar = await Auto.findAll({where: {userId: userId}})
            return res.json(userCar)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            console.log("Удаление авто")
            console.log(id)
            
            const userCar = await Auto.destroy({where: {id: id}})
            return res.json(userCar)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new CarController()