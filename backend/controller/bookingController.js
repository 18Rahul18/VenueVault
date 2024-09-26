import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Booking } from "../models/bookingSchema.js";
import { User } from "../models/userSchema.js";
import { Stadium } from "../models/stadiumSchema.js";

export const postBooking = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    booking_date,
    sport,
    stadiumName,
    stadiumLocation,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !booking_date ||
    !sport ||
    !stadiumName ||
    !stadiumLocation ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await Stadium.find({
    stadName: stadiumName,
    stadLocation: stadiumLocation,
    role: "Stadium",
    stadiumSport: sport,
  });
  console.log(stadiumName);
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Stadium not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Stadiums Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const stadiumId = isConflict[0]._id;
  const playerId = req.user._id;
  const booking = await Booking.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    booking_date,
    sport,
    stadium: {
      stadName: stadiumName,
      stadLocation: stadiumLocation,
    },
    hasVisited,
    address,
    stadiumId,
    playerId,
  });
  res.status(200).json({
    success: true,
    booking,
    message: "Booking Send!",
  });
});

export const getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json({
    success: true,
    bookings,
  });
});
export const updateBookingStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let booking = await Booking.findById(id);
    if (!booking) {
      return next(new ErrorHandler("Booking not found!", 404));
    }
    booking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Booking Status Updated!",
    });
  }
);
export const deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new ErrorHandler("Booking Not Found!", 404));
  }
  await booking.deleteOne();
  res.status(200).json({
    success: true,
    message: "Booking Deleted!",
  });
});
