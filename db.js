const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    "parser",
    "postgres",
    "1234",{
        dialect: 'postgres',
        host: "localhost",
        post: 5432
    }
)
