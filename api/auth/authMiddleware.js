const inspector = require("schema-inspector");
const userSchema = require("./userSchema");


module.exports = {
    authenticate,
    validateUserData
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