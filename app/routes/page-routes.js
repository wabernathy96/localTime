var authController = require('../controllers/auth_controller');
 
module.exports = function(app) {
 
    app.get('/signup', authController.signup);
 
}