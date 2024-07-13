 import express from 'express'
import {
  createFeedback,
  getFeedbacks,
  getFeedback,
  deleteFeedback,
  updateFeedback,
} from "../controllers/feedbackController.js";

 const router = express.Router()
 
// // GET all Feedback
 router.get("/", getFeedbacks);


//GET a single Feedback
router.get("/:id", getFeedback);

// POST a new Feedback
router.post("/", createFeedback);

// DELETE a Feedback
router.delete("/:id", deleteFeedback);

// UPDATE a Feedback
router.patch("/:id", updateFeedback);


export default router;