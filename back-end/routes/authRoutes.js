const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  getMe,
  logout,
} = require("../controllers/authController");

const requireAuth = require("../middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

module.exports = router;