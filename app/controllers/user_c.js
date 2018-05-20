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
        console.log(req.params)
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
    },

    test: (req,res) => {
        db.user.findOne({
            where:{
                user_id: req.user.user_id
            }
        }).then(
            (user) => {
                console.log(user)
                res.render('pages/user_dash', { user : user.dataValues.firstname}
                )
            }
        )
    },

    getPlan: (req, res ) => {
        db.planner.findOne({
            where:{
                userUserId: req.user.user_id

                //foreign key = to user id only created by user logged in
            }
        }).then( //take info an append to ejs page user_dash
            (user) => {
               
                res.render('pages/user_dash', { plan : user.dataValues.location, date: user.dataValues.date}
                
                );
            }
        );   
    }
}