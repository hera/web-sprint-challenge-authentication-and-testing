const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");


module.exports = {
    getById,
    register,
    getByUsername
};

function getById (id) {
    return db("user").select("id", "username").where({id});
}

function getByUsername (username) {
    return db("user").select("id", "username").where({username});
}

function register (userData) {
    const hashedPassword = bcrypt.hashSync(userData.password, 8);

    return db("user").insert(
        {
            username: userData.username,
            password: hashedPassword
        },
        "id"
    )
    .then(ids => {
        return getById(ids[0]);
    });
}