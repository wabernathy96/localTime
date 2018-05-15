var nonAuthC = require('../controllers/non_auth_controller');

module.exports = (app) => {
    app.get('/', nonAuthC.home);
}