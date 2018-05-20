const db = require('../models');

module.exports = {
    getAll: (req,res) => {
        db.planner.findAll({})
        .then(
            (planner) => {
                let plan = res.json(planner);
                console.log(plan)
            }
        )
    }
}