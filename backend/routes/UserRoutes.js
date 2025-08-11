

const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  addUserByAdmin,
  deleteUser
} = require("../Controllers/UserControllers");

const router = express.Router();


// Public
router.post("/register", registerUser);
router.post("/login", loginUser);



// Admin routes
router.get("/", getAllUsers);
router.post("/add", addUserByAdmin);
router.delete("/:id", deleteUser);

module.exports = router;

