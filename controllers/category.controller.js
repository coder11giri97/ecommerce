/**
 * this file have logic which is necessary for processing the request
 * 
 * handler for creating a new category request
 */

const db = require("../models");
const Category = db.category;
exports.create = (req , res)=>{
   /**
    * try to create new category object using request body
    */
    
   const category = {
       name : req.body.name,
       description : req.body.description
   }

   // store this in db
   Category.create(category).then(category =>{
       console.log(`category name: [ ${category.name}] got inserted in the db`);
       res.status(201).send(category);

   }).catch(err =>{
       console.log(`issue in inserting the category name: [ ${category.name}].Error message :${err.message}`);
       res.status(500).send({
             message : 'some internal eroor happened'
       })
   })



}


/**
 * 
 * hanlder for getting all the categories
 * 
 */

exports.findAll = (req, res) =>{

      // localhost:8080/ecomm/api/v1/categories/?name=electronics -- this is called as query params

      /**
       * 
       * path param : /ecomm/api/v1/categories/123      123 is path param
       * 
       * query param : /ecomm/api/v1/categories?name=giri       name="giri" is query param
       * 
       * query params are optional ,hence they will not match route path
       * 
       */





      /**
       * need to intercept the query params and use it
       * 
       */
        
       const categoryName = req.query.name; // will get query stored in categiryName

       /**
        * applying name filter if get the query param
        * else no filter
        */
let promise ;
        if(categoryName){
           promise =  Category.findAll({
                where : {
                    name : categoryName
                }
            })
        }else{
            promise = Category.findAll();
        }

       promise.then(categories =>{
          res.status(200).send(categories);
      }).catch(err=>{
        res.status(500).send({
          message : 'some internal eroor happened'
      })
    })
}

/**
 * handler for getting categories based on yhe id
 * 
 */
 
exports.findOne = (req, res) =>{
     const categoryId = req.params.id;

     Category.findByPk(categoryId).then(categoryId =>{
          res.status(200).send(categoryId);

     }).catch(err =>{
        res.status(500).send({
            message : 'some internal error happened'
        })
     })
}


/**
 * provide support for updating the category
 */

exports.update = (req, res) =>{
     /**
      * need to parse the request body just like post method
      */
      const category = {
        name : req.body.name,
        description : req.body.description
    }
    /**
     * need to know which category has to be updated
     */
    const categoryId = req.params.id ;
    
    /**
     * now update the category
     */
      Category.update(category,{
          where : {id : categoryId},
          returning : true
      }).then(updatedCategory =>{
        // need to make a get call to get the updated category
        console.log(updatedCategory);
        Category.findByPk(categoryId).then(categoryRes =>{
             res.status(200).send(categoryRes);
        }).catch(err =>{
            res.status(500).send({
                message : "some interal error happened"
            })
        })
        
      }).catch(err =>{
        res.status(500).send({
            message : "some internal error happened"
        })
      })
}


/**
 * 
 *providing support for deleting the category
 */

exports.delete = (req, res) =>{
      const categoryId = req.params.id;

      Category.destroy({
           where : {
               id : categoryId
           }
      }).then(result =>{
         res.status(200).send({
            message : "successfully deleted"
         })
      }).catch(err =>{
        res.status(500).send({
            message : "some internal error happened"
         
      })
    })
 }


