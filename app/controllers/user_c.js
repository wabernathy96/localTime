const db = require('../models');

module.exports = {
    getCards: (req,res) => {
        db.user.findAll({})
        .then(
            (user) => {
                
                res.render('pages/plan_trip', { user : user}
                )
            }
        )
    },

    getAll: (req,res) => {
        db.user.findAll({})
        .then(
            (user) => {
                console.log(user)
                res.json(user);
            }
        )
    },

    getUser: (req,res) => {
        db.user.findOne({
            where:{
                user_id: req.params.user_id
            }
        })
        .then(
            (user) => {
                res.json(user);
            }
        )
    }
}