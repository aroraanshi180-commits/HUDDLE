const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const TokenBlacklist = require("../models/tokens");

const resetPasswordTemplate = require("../template/resendemail");
const sendEmail = require("../template/sendEmail");
const Task = require("../models/Task");
const { model } = require("mongoose");


const signToken = (userId) =>
  jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );


// ==================== REGISTER ====================

exports.register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token: signToken(user._id),
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  });

  res.status(201).json(task);
};

// ==================== LOGIN ====================

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password");

    if (
      !user ||
      !(await user.matchPassword(password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,  
      },
      token: signToken(user._id),
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ==================== LOGOUT ====================

exports.logout = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not provided",
      });
    }

    const decoded = jwt.decode(token);

    await TokenBlacklist.findOneAndUpdate(
      { token },
      {
        token,
        expiresAt: new Date(
          decoded.exp * 1000
        ),
      },
      {
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ==================== FORGOT PASSWORD ====================

exports.forgotPassword = async (req, res) => {
  try {
     console.log("🔥 FORGOT PASSWORD CONTROLLER RUNNING 🔥");
    const { email } = req.body;
console.log("Email received:", email); 

    console.log(
      "Forgot password request for email:",
      email
    );

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = jwt.sign(
      {
        id: user._id,
        timestamp: Date.now(), // makes token unique
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires =
      Date.now() + 3600000;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    const html = resetPasswordTemplate(
      user.name,
      resetUrl
    );

    console.log("About to call sendEmail()");

await sendEmail({
  email: user.email,
  subject: "Password Reset Request",
  message: html,
});

console.log("sendEmail() completed");

    console.log("Reset URL:", resetUrl);

    res.status(200).json({
      success: true,
      message:
        "Password reset email sent successfully",
      resetUrl,
      token: resetToken, 
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ==================== RESET PASSWORD ====================

exports.resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired reset token",
      });
    }

    user.password = password;

    // invalidate token after successful reset
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Token expired or invalid",

    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
