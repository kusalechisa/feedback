import express from "express";

// Import controller functions for user operations
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  userLogin,
} from "../controllers/userController.js";

const router = express.Router();

// Define user login route
router.post("/userlogin", userLogin);
// Define user login route

// // GET all users
router.get("/", getUsers);

//GET a single users
router.get("/:id", getUser);

// POST a new users
router.post("/", createUser);

// DELETE a users
router.delete("/:id", deleteUser);

// UPDATE a users
router.patch("/:id", updateUser);

export default router;
