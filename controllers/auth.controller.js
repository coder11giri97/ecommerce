const db = require("../models");
//const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op; //Operations

//var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 

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