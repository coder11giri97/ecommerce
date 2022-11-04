/**
 * this file is responsible for the routing the requests to the right controller method
  * rest uri 
*/


const productController = require("../controllers/product.controller");
const { requestValidator } = require("../middlewares");

module.exports = (app) =>{
    
   // route for creating a new product
   app.post("/ecomm/api/v1/products" ,[requestValidator.validateProductRequest],productController.create );


   //route for getting products by name or getting all products if name query is not given
   app.get("/ecomm/api/v1/products" , productController.findAll);


   //route for getting products by id

   app.get('/ecomm/api/v1/products/:id', productController.findOne);

    //route for updating the category

    app.put('/ecomm/api/v1/products/:id' ,[requestValidator.validateProductRequest], productController.update)

    // route for deleting the category

     app.delete('/ecomm/api/v1/products/:id' , productController.delete)



}