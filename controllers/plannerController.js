const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", function (req, res) {
  res.redirect("/burgers")

})

// router.get("/burgers", function (req, res) {
//   db.burgers.findAll({}).then(function (data) {
//     var hbsObject = { burgers: data };
//     res.render('index', hbsObject);
//   });
// })

// router.post("/burgers/add", function (req, res) {
//   db.burgers.create({
//     text: req.body.text
//   }).then(function (data) {
//     res.redirect("/burgers")
//   })
// })


module.exports = router;