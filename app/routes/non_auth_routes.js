// Import methods from non_auth_controller
var nonAuthC = require('../controllers/non_auth_controller');

// Routes for non_auth users
module.exports = (app) => {
    app.get('/', nonAuthC.home);
}