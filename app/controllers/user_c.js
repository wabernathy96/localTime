const db = require('../models');

module.exports = {
    getAll: (req,res) => {
        db.user.findAll({})
        .then(
            (user) => {
                return res.json(user);
            }
        )
    }
}