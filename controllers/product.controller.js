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


/**
 * Update an existing product
 */
 exports.update = (req, res) => {

    /**
     * Validation of the request body
     */

    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the product can't be empty !"
        })
        return;
    }

    /**
     * Creation of the Product object to be stored in the DB
     */
    const product = {
        name: req.body.name,
        description: req.body.description
    };
    const productId = req.params.id;

    Product.update(product, {
        returning: true,
        where: { id: productId }
    }).then(updatedProduct => {

        Product.findByPk(productId).then(product => {
            res.status(200).send(product);
        }).catch(err => {
            res.status(500).send({
                message: "Some Internal error while fetching the product based on the id"
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching the product based on the id"
        })
    })
}

/**
 * Delete an existing product based on the product name
 */
 exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.destroy({
        where: { 
            id: productId 
        }
    }).then(result => {
        res.status(200).send(
            {
            message: "Successfully deleted the product"
        }
        );
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while deleting the product based on the id"
        })
    })
}



