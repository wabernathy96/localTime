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
                user_id: req.params.userId
            }
        })
        .then(
            (user) => {
                res.json(user);
            }
        )
    },

    userInfo: (req,res) => {
        console.log("here")
        db.user.findAll({
            where:{
                userId: req.user.userId
            },include: [{ model: db.planner, where: { userID: req.user.userId }, required: false }]
        }).then(
            (user) => {
                console.log(user[0].dataValues.planner.dataValues.city)
                res.render('pages/user_dash', { user : user[0].dataValues.firstName, plan: user}
                
                )
            }
        )
    },

    // getPlan: (req, res ) => {
    //     db.planner.findOne({
    //         where:{
    //             userId: req.user.userId
    //             //foreign key = to user id only created by user logged in
    //         }
    //     }).then( //take info an append to ejs page user_dash
    //         (planner) => {
    //             if (!planner) {
    //                 console.log("damn")
    //                 res.redirect('/userdash');
    //             } else {
    //                 console.log("here")
    //                 res.render('pages/user_dash', { plan : planner.dataValues.location, date: planner.dataValues.date})   
    //             }
    //         }
    //     );   
    // }
}