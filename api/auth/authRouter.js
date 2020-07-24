const express = require("express");
const userDb = require("./userModel");

const router = express.Router();


router.post("/register", (req, res) => {
    userDb.register({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not register a user.",
            description: error
        });
    });
});


router.post("/login", (req, res) => {
    res.status(501).send("Not implemented");
});


module.exports = router;
