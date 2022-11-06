const db = require("../models");
//const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op; //Operations

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = require("../configs/secret.config");
 



//handler for signup
exports.signup = (req, res) => {
    console.log("Inside the sign up call");
    // Save User to Database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        console.log("user created");
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };



  //handler for signin
  exports.signin =(req,res)=>{
    //check if user exists in db

    User.findOne({
      where :{
        email : req.body.email
      }
    }).then(user =>{
       if(!user){
           res.status(404).send({
             message : "user not found"
           })
           return ; 
       }
       // else verify the passowrd
       var passwordIsValid = bcrypt.compareSync(
            req.body.password ,
            user.password
        ) ;
        
        if(!passwordIsValid){
            res.status(401).send({
                message: " invalid password"
            })
        }

        // else if passwordIsValid then we need to generate the access token using jwt
        var token = jwt.sign({id : user.id} , secretKey.secret, {
             expiresIn : 3000 
    });


        // in response we are sending details of the user
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });





    })
  }