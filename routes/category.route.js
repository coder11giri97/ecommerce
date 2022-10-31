/**
 * this file is responsible for the routing the requests to the right controller method
 */

const controller = require("../controllers/category.controller");

module.exports = function(app){
     //route for creating new category
     // 'ecomm/api/v1/categories is api uri -- unviversal resource identifier

     app.post('/ecomm/api/v1/categories' , controller.create);

      


     //route for  getting all the categories 
     // 'ecomm/api/v1/categories is api uri -- unviversal resource identifier

     app.get('/ecomm/api/v1/categories', controller.findAll)

     

     // route for getting the category based on category id
     app.get('/ecomm/api/v1/categories/:id', controller.findOne)


     //route for updating the category

      app.put('/ecomm/api/v1/categories/:id' , controller.update)

     // route for deleting the category

      app.delete('/ecomm/api/v1/categories/:id' , controller.delete)

     // route for getting the category based on the name - filter the result based on name




}