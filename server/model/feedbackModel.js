import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the feedback schema
const feedbackSchema = new Schema(
  {
    selectedSector: {
      type: String,
      required: true,
    },
    selectedOffice: {
      type: String,
    },
    selectedDesk: {
      type: String,
    },

    stars: {
      type: String,
    },
    issue: {
      type: String,
    },
    phone: {
      type: String,
      default: "null",
    },
    email: {
      type: String,
      default: "null",
    },
    comment: {
      type: String,
      default: "null",
    },
    identity: {
      type: String,
      default: "null",
    },
  },
  { timestamps: true }
);

// Create and export the Feedback model based on the Feedback schema
export default mongoose.model("Feedback", feedbackSchema);
