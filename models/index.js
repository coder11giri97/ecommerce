/**
 * this file expose the functionalities of all the model files defined under models directory
 */

// create the connection with the database 

const Sequelize = require('sequelize');
const config = require('../configs/db.config');


/**
 * creating the db connection
 */

const sequelize = new Sequelize(
       config.DB ,
       config.USER,
       config.PASSWORD,{
           host : config.HOST,
           dialect : config.dialect
       }
);

/**
 *  expose the sequelize and category model
 * 
 */

var db =  {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize, Sequelize);

module.exports = db;