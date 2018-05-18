// CONTROLLERS FOR DB INFO FOR AUTHORIZED USERS
let router = require('express').Router();
const passport = require('passport');
const db = require("../models");

// ---------------user data---------------
// router.get('/api/get_user', function (req, res) {
//     console.log(Object.keys(db));
//     console.log(req.body);
//     db.user.findAll({})
//         .then(function (dbUser) {
//             console.log(dbUser)
//             console.log(req.params)
//             res.render('pages/create_planner', { info: dbUser[0].dataValues.firstname });
//         });
// });

router.get("api/home", function(req,res){
    res.render("pages/home");
});


//---------------planner data---------------
// router.get('/api/get_planner', function (req, res) {
//     console.log(req.query.lol)
//     db.planner.findAll({})
//     .then(function (dbUser) {
//         console.log(req.params)
//         console.log(req.body);
//         var data = dbUser[0].dataValues
//         res.render('pages/create_planner', { info: JSON.stringify({
//             planner_id: data.location,
//             date: data.date,
//             activity_genre: data.activity_genre,
//             user_id: data.user_id
//         })});
//     });
// });

// router.post('/api/post_planner', function (req, res) {
//     console.log(req.query.test)
//     db.planner.findOne({
//         // where: {
//         //     firstname: req.query.test
//         // }
//     }).then(function (dbUser) {
//         console.log(req.params)
//         console.log(dbUser[0].dataValues);
//         // console.log(req.body)
//         res.render('pages/create_planner', { info: dbUser[0].dataValues.firstname });
//     });
// });

module.exports = router;
