/**
 * schema for products
 */

const { Sequelize } = require("sequelize");


/**
 * id 
 * name 
 * description
 * cost
 */

module.exports = (Sequelize, Sequelize) =>{
     const Product = sequelize.define("product" , {
          id :{
                 type : Sequelize.INTEGER,
                 primaryKey : true,
                 autoIncrement : true
          },
          name :{
                 type : Sequelize.STRING,
                 allowNull : false
          },
          description:{
                 type : Sequelize.STRING

          },
          cost :{
                 type : Sequelize.INTEGER,
                 allowNull : false
          }

     });
     return Product;
}