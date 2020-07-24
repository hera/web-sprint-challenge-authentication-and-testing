
module.exports = {
    authenticate
};

function authenticate (req, res, next) {
    res.status(401).json({ you: "shall not pass!" });
};