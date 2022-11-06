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
 *  expose the sequelize and category model and product model and user model and role model
 * 
 */

var db =  {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);




/**
   * Establishing the relationship between Role and User
   */
 db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});


db.ROLES = ["user", "admin"];





module.exports = db;


