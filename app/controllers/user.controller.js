const User = require("../models/user.model.js");

// create a new user / sign up
exports.create = (req, res) => {
    if(!req.body.userName || !req.body.password) {
        return res.status(400).send({
            message: "Username and password required!"
        })
    }

    User.findOne({userName: req.body.userName}, (error, result) => {
        if (error) {
            return res.status(400).send({
                message: "Error: " + error
            })
        } else if (result) {
            return res.status(400).send({
                message: "Username is already in use!"
            })
        } else if(!error && !result){
            const newUser = new User({
                userName: req.body.userName,
                isApproved: false
            })
            newUser.password = newUser.generateHash(req.body.password);
        
            newUser.save().then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating a new user"
                })
            })
        }
    })
}