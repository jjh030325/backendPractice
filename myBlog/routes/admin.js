const express = require("express");
const router = express.Router();
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";

// Admin Page
// GET /admin
router.get("/admin", (req, res) => {
    const locals = {
        title: "관리자 페이지",
    };
    res.render("admin/index", { locals, layout: adminLayout2 });
});

module.exports = router;