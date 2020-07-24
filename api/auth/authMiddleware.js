const inspector = require("schema-inspector");
const userSchema = require("./userSchema");
const userDb = require("./userModel");


module.exports = {
    authenticate,
    validateUserData,
    checkUsernameUnique
};


function authenticate (req, res, next) {
    res.status(401).json({ you: "shall not pass!" });
};


function validateUserData (req, res, next) {
    const validationResult = inspector.validate(userSchema, req.body);

    if (validationResult.valid) {
        next();
    } else {
        res.status(400).json({
            error: "Bad request. Please provide valid username and password.",
            description: validationResult.error
        });
    }
}

async function checkUsernameUnique (req, res, next) {
    const userFound = await userDb.getByUsername(req.body.username);

    if (userFound.length === 0) {
        next();
    } else {
        res.status(400).json({
            error: "User exists. Please provide another username."
        });
    }
}