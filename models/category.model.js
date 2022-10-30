/**
 * this file contains the schema definition for the category resource
 *
 * exporting this schema to be called from other module


*/


module.exports = (sequelize, Sequelize) =>{
      const Category = sequelize.define("category",{
            id :{
                  type : Sequelize.INTEGER,
                  primaryKey : true,
                  autoIncrement : true
            },
            name:{
                   type : Sequelize.STRING,
                   allowNull : false
            },
            description :{
                   type : Sequelize.STRING
            }
      })

      return Category;
}