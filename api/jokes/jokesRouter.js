const express = require("express");
const jokeDb = require("./jokeModel");

const router = express.Router();


router.get("/", (req, res) => {
    jokeDb.getAll()
        .then(jokes => {
            res.status(200).json(jokes);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get jokes.",
                description: error
            });
        });
});

module.exports = router;
