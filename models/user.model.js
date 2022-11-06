/**
 * this file contains the schema definition for the user resource
 *
 * exporting this schema to be called from other module


*/


module.exports = ( sequelize , Sequelize) => {

  const User = sequelize.define("users", {
      username : {
          type : Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        }
      });
      return User;
  
};