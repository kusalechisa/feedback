import Feedback from "../model/feedbackModel.js";
import mongoose from "mongoose";

// get all feedbacks
const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

  res.status(200).json(feedbacks);
};

// get a single feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such feedback" });
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ error: "No such feedback" });
  }

  res.status(200).json(feedback);
};

// create a new feedback
const createFeedback = async (req, res) => {
  const {
    identity,
    selectedSector,
    selectedOffice,
    selectedDesk,
    stars,
    issue,
    phone,
    email,
    comment,
  } = req.body;

  let emptyFields = [];

  if (!selectedSector) {
    emptyFields.push("selectedSector");
  }

  if (!stars) {
    emptyFields.push("stars");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const feedback = await Feedback.create({
      identity,
      selectedSector,
      selectedOffice,
      selectedDesk,
      stars,
      issue,
      phone,
      email,
      comment,
    });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such feedback" });
  }

  const feedback = await Feedback.findOneAndDelete({ _id: id });

  if (!feedback) {
    return res.status(400).json({ error: "No such feedback" });
  }

  res.status(200).json(feedback);
};

// update a feedback
const updateFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such feedback" });
  }

  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!feedback) {
    return res.status(400).json({ error: "No such feedback" });
  }

  res.status(200).json(feedback);
};

export {
  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
};
