const db = require('../models');

module.exports = {
    getCards: (req,res) => {
        db.user.findAll({})
        .then(
            (user) => {
                return res.render('partials/user_cards', { user: user });
            }
        )
    }
}