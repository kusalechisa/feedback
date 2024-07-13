import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const userLogin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.userlogin(username, email, password);

    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all workouts
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// get a single workout
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// create a new workout
const createUser = async (req, res) => {
  const { phone, complaint } = req.body;

  // add to the database
  try {
    const complain = await User.create({
      phone,
      complaint,
    });
    res.status(200).json(complain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  res.status(200).json(user);
};

// update a workout
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No such complaint" });
  }

  res.status(200).json(user);
};

export { getUsers, getUser, createUser, deleteUser, updateUser, userLogin };
