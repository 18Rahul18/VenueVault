import mongoose from "mongoose";
import { Mongoose } from "mongoose";
import validator from "validator";

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  nic: {
    type: String,
    required: [true, "Aadhar No Is Required!"],
    minLength: [12, "Aadhar No Must Contain Only 12 Digits!"],
    maxLength: [12, "Aadhar No Must Contain Only 12 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female", "Others"],
  },
  booking_date: {
    type: String,
    required: [true, "Booking Date Is Required!"],
  },
  sport: {
    type: String,
    required: [true, "Sport Name Is Required!"],
  },
  stadium: {
    stadName: {
      type: String,
      required: [true, "Stadium Name Is Required!"],
    },
    stadLocation: {
      type: String,
      required: [true, "Stadium Location Is Required!"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "Address Is Required!"],
  },
  stadiumId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Stadium Id Is Invalid!"],
  },
  playerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Player Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
