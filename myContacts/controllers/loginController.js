const asyncHandler = require("express-async-handler");

const getLogin = (req, res) => {
    res.render("home");
};

const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if(username === "admin" && password === "1234") {
        res.send("Login success");
    } else {
        res.send("Login Failed");
    }

})

module.exports = { getLogin, loginUser };