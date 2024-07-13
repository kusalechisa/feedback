import Complaint from "../model/complaintModel.js";
import mongoose from "mongoose";

// get all workouts
const getComplaints = async (req, res) => {
  const complaints = await Complaint.find({}).sort({ createdAt: -1 });

  res.status(200).json(complaints);
};

// get a single workout
const getComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such complaint" });
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }

  res.status(200).json(complaint);
};

// create a new workout
const createComplaint = async (req, res) => {
  const { phone, complaint, email } = req.body;

  // add to the database
  try {
    
    const complain = await Complaint.create({
      phone,
      complaint,
      email,
    });
    res.status(200).json(complain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  const complaint = await Complaint.findOneAndDelete({ _id: id });

  if (!complaint) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  res.status(200).json(complaint);
};

// update a workout
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Complaint" });
  }

  const complaint = await Complaint.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!complaint) {
    return res.status(400).json({ error: "No such complaint" });
  }

  res.status(200).json(complaint);
};

export {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaint,
};
