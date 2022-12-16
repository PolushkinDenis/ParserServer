const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "standart"}
})

const Filters = sequelize.define('filters', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    brand: {type: DataTypes.STRING},
    model: {type: DataTypes.STRING},
    priceFrom: {type: DataTypes.STRING},
    priceTo: {type: DataTypes.STRING},
    yearTo: {type: DataTypes.STRING},
    yearFrom: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    odometerFrom: {type: DataTypes.STRING},
    odometerTo: {type: DataTypes.STRING},
    autoType: {type: DataTypes.STRING},
    engineCapacity: {type: DataTypes.STRING},
    drive: {type: DataTypes.STRING},
    sort: {type: DataTypes.STRING}
})

const Auto = sequelize.define('auto', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    image:{type: DataTypes.STRING},
    href:{type: DataTypes.STRING},
    info:{type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    time: {type: DataTypes.STRING},
})
const History = sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    filters: {type: DataTypes.STRING},
    search: {type: DataTypes.STRING},
    site: {type: DataTypes.STRING}

})

// const UserAuto = sequelize.define('user_auto', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

// })


User.hasMany(Filters)
Filters.belongsTo(User)

// User.belongsToMany(Auto, {through: UserAuto})
// Auto.belongsToMany(User, {through: UserAuto})

module.exports = {
    User,
    Filters,
    Auto,
    History
    // UserAuto
}