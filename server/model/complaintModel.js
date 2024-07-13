import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the workout schema
const complaintSchema = new Schema(
  {
    phone: {
      type: String,
      default: "null",
    },
    complaint: {
      type: String,
      default: "null",
    },
    email: {
      type: String,
      default: "null",
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

// Create and export the Workout model based on the workout schema
export default mongoose.model("Complaint", complaintSchema);
