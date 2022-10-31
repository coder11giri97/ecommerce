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

   }).caatch(err =>{
       console.log(`issue in inserting the category name: [ ${category.name}].Error message :${err.message}`);
       res.status(500).send({
             message : `some internal eroor happened`
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
          message : `some internal eroor happened`
      })
    })
}
