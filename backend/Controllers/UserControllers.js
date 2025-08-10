// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashedPassword });
//   res.status(201).json(user);
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//   res.json({ token });
// };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     // Optional: validate role if included
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const allowedRoles = ["admin", "analyst", "viewer"];
//     const userData = { name, email, password: hashedPassword };
//     if (role && allowedRoles.includes(role)) userData.role = role;

//     const user = await User.create(userData);
//     res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// controllers/userController.js

exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    req.body.password = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: req.body.password,
      role: role || "viewer",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} '${err.keyValue[field]}' already exists.`,
      });
    }
    next(err);
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔑 Login attempt:", email); // helpful for debugging

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(" Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
