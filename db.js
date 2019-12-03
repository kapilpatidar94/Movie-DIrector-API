const sequelize = require('sequelize');


const db = new sequelize('seqmovies', 'root', '77777', {
    host: 'localhost',
    dialect: 'mysql',
})


module.exports = db;