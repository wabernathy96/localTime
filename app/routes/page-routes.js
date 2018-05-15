var authC = require('../controllers/auth_controller');
 
module.exports = function(app) {

    app.get('/signup', authC.signup);
    app.get('/login', authC.login);
 
}