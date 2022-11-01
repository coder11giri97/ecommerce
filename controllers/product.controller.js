/**
 * this is the controller class for product resource
 */
const db = require('../models');
const Product = db.product;

// handler for creating products

exports.create = (req ,res) =>{
     
     //get the req body
     const prod = {
          name : req.body.name,
          description : req.body.description,
          cost : req.body.cost
     }

     //store the prod in db

     Product.create(prod).then(product =>{
          console.log(`product name : [${prod.name}] got inserted in db`);
          res.status(201).send(product);
     }).catch(err => {
           console.log(`issue in inserting the product: [${prod.name}].Error message : ${err.message}`);
           res.status(500).send({
               message : "some internal error happenend"
           })
     })

}





// handler for getting all products or getting products by name if names  query i

exports.findAll = (req ,res) =>{
     let productName = req.query.name;
     let promise ;
     if(productName){
      promise = Product.findAll({
         where : {
            name : productName
         }
      });

     }else {
        promise = Product.findAll();
     }


promise.then(products =>{
    res.status(200).send(products);
}).catch(err => {
    res.status(500).send({
        message : "some internal error happened"
    })
})
}

//handler for getting product by id
exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId).then(product => {
        res.status(200).send(product);
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching the product based on the id"
        })
    })
}


//handler for updating product



//handler for deleting product




