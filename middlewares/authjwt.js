

/*Challenges of the unauthenticated APIs
● No control on who calls the APIs
● Inadequate validations
● Lack of security
● No control on customer overusing the APIs */

const jwt = require("jsonwebtoken");
const config = require("../configs/secret.config");
const db = require("../models");
const User = db.user;


//logic to validate the access token
verifyToken = (req, res, next) => {

    // read the token from header
    let token = req.headers["x-access-token"]; // provided by client
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    // else check validity of token
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      //else 
      req.userId = decodedToken.id;  // reading the user from token and setting it in req object
      next();
    });
  };



  // logic to check if user is admin for authorisation-- because only admin can add categories and products
  isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };




  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };
  module.exports = authJwt;


