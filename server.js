const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./configs/server.config');


const app = express();

/**registering body-parser middleware */
app.use(bodyParser.json());

/**
 * code for the table initialization
 */
const db = require("./models"); // node will find index.js form models folder -- standard naming
const Category = db.category;
const Product = db.product; 

const Role = db.role;

//Setting the One to Many relationship between Category and Product
Category.hasMany(Product); // This will create a foreign key column( categoryId) in Product table



console.log(Category);




/**
 * create the table
 */
db.sequelize.sync({force:true}).then(() => {
      console.log("table dropped and recreated");
      init();
}).catch(err =>{
    console.log(err.message);
})


function init() {

    //Initializing few Categories
    var categories = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products"
        },
        {
            name: "KitchenItems",
            description: "This category will contain all the Kitchen related products"
        }
    ];

    Category.bulkCreate(categories).then(() => {
        console.log("Categories table is initialized");
    }).catch(err => {
        console.log("Error while initializing ategories table");
    })



      /**
     * Adding roles
     */
       Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"admin"
    })



}




//initialise the routes
require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);
app.listen(serverConfig.PORT,() =>{
    console.log("application started");
})
