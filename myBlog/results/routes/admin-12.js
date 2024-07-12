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
 * Check Login
 */

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.redirect("/admin");
  }
};

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
  checkLogin,
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

/**
 * GET /logout
 * Admin logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

/**
 * GET /add
 * Admin - Add Post
 */

router.get(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "게시물 작성",
    };
    res.render("admin/add", {
      locals,
      layout: adminLayout,
    });
  })
);

/**
 * POST /add
 * Admin - Add Post
 */
router.post(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    const newPost = new Post({
      title: title,
      body: body,
    });

    await Post.create(newPost);

    res.redirect("/allPosts");
  })
);

/**
 * GET /edit/:id
 * Admin - Edit Post
 */
router.get(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "게시물 편집",
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);

/**
 * PUT /edit/:id
 * Admin - Edit Post
 */
router.put(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      createdAt: Date.now(),
    });
    res.redirect("/allPosts");
  })
);

module.exports = router;
