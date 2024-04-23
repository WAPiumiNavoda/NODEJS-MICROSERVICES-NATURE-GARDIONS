import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contian at least 20 characters!"],
  },
  complainPostedOn: {
    type: Date,
    default: Date.now,
  },

  // role: {
  //   type: String,
  //   required: [true, "Please select a role"],
  //   enum: ["Admin", "User"],
  // },

  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Complain = mongoose.model("Complain", complainSchema);
