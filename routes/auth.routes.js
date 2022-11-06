const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    

    app.post( "/ecomm/api/v1/auth/signup",[  verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted], controller.signup);

    app.post("/ecomm/api/v1/auth/signin", controller.signin);
    
};