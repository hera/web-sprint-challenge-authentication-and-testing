const express = require("express");

const router = express.Router();


router.post("/register", (req, res) => {
    res.status(501).send("Not implemented");
});


router.post("/login", (req, res) => {
    res.status(501).send("Not implemented");
});


module.exports = router;
