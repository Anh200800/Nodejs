const { QueryInterface } = require("sequelize/types");
const { sequelize } = require("../models");

module.exports = {
    up: (queryInterface, sequelize) => {
return Promise.all([
    queryInterface.changeColumn('Users','image', {
        type: sequelize.BLOB('long'),
        allowNull: true,
    })
])
    },
    down: (queryInterface, sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: sequelize.STRING,
                allowNull: true,
            })
        ])
    }
    
}