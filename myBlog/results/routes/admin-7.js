const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * GET /admin
 * Admin page
 */
router.get(
  "/admin",
  asyncHandler(async (req, res) => {
    const locals = {
      title: "관리자 페이지",
    };

    res.render("admin/index", { locals, layout: adminLayout2 });
  })
);

/**
 * POST /admin
 * Check admin login
 */
router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // 사용자 이름으로 사용자 찾기
    const user = await User.findOne({ username });

    // 일치하는 사용자가 없으면 401 오류 표시
    if (!user) {
      return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }

    // 입력한 비밀번호와 DB에 저장된 비밀번호 비교
    const isValidPassword = await bcrypt.compare(password, user.password);

    // 비밀번호가 일치하지 않으면 401 오류 표시
    if (!isValidPassword) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, jwtSecret);

    // 토큰을 쿠키에 저장
    res.cookie("token", token, { httpOnly: true });

    // 로그인 성공 후에 전체 게시물 목록 페이지로 이동
    res.redirect("/allPosts");
  })
);

/**
 * GET /allPosts
 * Get all posts
 */
router.get(
  "/allPosts",
  asyncHandler(async (req, res) => {
    const locals = {
      title: "Posts",
    };
    const data = await Post.find();
    // 최신 순으로 정렬하려면 const data = await Post.find().sort({ createdAt: "desc" });
    res.render("admin/allPosts", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);

module.exports = router;
