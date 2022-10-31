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

console.log(Category);

/**
 * create the table
 */
db.sequelize.sync({force:true}).then(() => {
      console.log("table dropped and recreated");
}).catch(err =>{
    console.log(err.message);
})

//initialise the routes
require('./routes/category.route')(app);

app.listen(serverConfig.PORT,() =>{
    console.log("application started");
})