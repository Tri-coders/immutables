const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize("metacognition","root","",{
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
