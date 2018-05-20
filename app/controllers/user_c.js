const db = require('../models');

module.exports = {
    userInfo: (req, res) => {
        var location = req.query.location
        var planner_id = req.query.planner_id
        var from = req.query.from
        var to = req.query.to


        db.user.findAll({
            where: {
                userId: req.user.userId
            }, include: [{ model: db.planner, where: { userID: req.user.userId }, required: false }]
        },

        ).then(
            (user) => {
                if (location) {

                    db.planner.update({
                        city: location
                    }, {
                            where: {
                                userId: req.user.userId,
                                planner_id: planner_id
                            }
                        }).then((user) => res.render('pages/user_dash',{ user: user.dataValues.firstName, plan: user }
                        ))
                } else if (from) {
                    db.planner.update({
                        availableFrom: from
                    }, {
                            where: {
                                userId: req.user.userId,
                                planner_id: planner_id
                            }
                        }).then((user) => res.render('pages/user_dash', { user: user.dataValues.firstName, plan: user }
                        ))
                } else if (to) {
                    db.planner.update({
                        availableTo: to
                    }, {
                            where: {
                                userId: req.user.userId,
                                planner_id: planner_id
                            }
                        }).then((user) => res.render('pages/user_dash', { user: user.dataValues.firstName, plan: user }
                        ))
                } 
                    res.render('pages/user_dash',{ user: user[0].dataValues.firstName, plan: user })

            }
        )
    },

    plannerUpdate: (req, res) => {
        db.planner.update({
            location: req.params.location
        }, {
                where: {
                    userId: req.user.userId
                }
            }).then(
                (user) => {
                    res.redirect("/dash")
                }
            )
    },

}