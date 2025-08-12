
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER USER
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

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 ADMIN: GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 📌 ADMIN: ADD USER
exports.addUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "viewer",
    });

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user" });
  }
};

// 📌 ADMIN: DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
