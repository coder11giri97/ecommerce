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
      Category.findAll().then(categories =>{
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

// exports.delete = (req, res) =>{

// }