import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint,
} from "../controllers/complaintController.js";

const routerc = express.Router();

// // GET all workouts
routerc.get("/", getComplaints);

//GET a single workout
routerc.get("/:id", getComplaint);

// POST a new workout
routerc.post("/", createComplaint);

// DELETE a workout
routerc.delete("/:id", deleteComplaint);

// UPDATE a workout
routerc.patch("/:id", updateComplaint);

export default routerc;
