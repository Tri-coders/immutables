const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'user',
    {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            
        },
        password: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branch: {
            type: Sequelize.STRING,
            defaultValue: null,
        }
    },
    {
        timestapms: true
    }
)
