import mongoose from "mongoose";
import validator from "validator";
 
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },

  feedbackComment: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [1500, "Description cannot exceed 500 Characters!"],
  },
//   applicantID: {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["Job Seeker"],
//       required: true,
//     },
//   },
//   employerID: {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["Employer"],
//       required: true,
//     },
//   },
});
 
export const Feedback = mongoose.model("Feedback", feedbackSchema);
 