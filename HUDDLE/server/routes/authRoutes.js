const express = require("express");
const { body } = require("express-validator");
const sendEmail = require("../template/sendEmail");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const { updateProfile } = require("../controllers/authController");
const router = express.Router();

const emailRule = body("email")
  .trim()
  .isEmail()
  .withMessage("Valid email is required")
  .normalizeEmail();

const passwordRule = body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    emailRule,
    passwordRule,
  ],
  register
);

router.post("/login", [emailRule, body("password").notEmpty().withMessage("Password is required")], login);
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      email: process.env.SMTP_EMAIL,
      subject: "SMTP Test",
      message: `
        <h1>SMTP Working Successfully</h1>
        <p>Your CRM Project email setup is working.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const { logout } = require("../controllers/authController");
router.post("/logout", logout);

const {forgotPassword} = require("../controllers/authController");
router.post("/forgotpassword", forgotPassword);

const { resetPassword } = require("../controllers/authController");

router.post(
  "/resetpassword/:token",
  resetPassword
);
router.get(
  "/me",
  protect,
  async (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

router.put(
  "/updateprofile",
  protect,
  updateProfile
);     
module.exports = router;

