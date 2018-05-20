const db = require('../models');

module.exports = {
    userInfo: (req,res) => {
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

    plannerUpdate: (req,res) => {
        db.planner.update({
            location: req.body.location
        },{
            where:{
                userId: req.user.userId
            }
        }).then(
            (user) => {
                res.redirect("/login")
            }
        )
    },

}