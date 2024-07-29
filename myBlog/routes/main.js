const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

router.get(["/","/home"], (req, res) => {
    const locals = {
        title: "Home"
    }
    res.render("index", { locals, layout: mainLayout});
});
router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    }
    res.render("about", { locals, layout: mainLayout});
});

module.exports = router;