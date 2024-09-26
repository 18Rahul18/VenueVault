import React from "react";
import Athlete from "../components/Athlete";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  return (
    <>
      <Athlete
        title={"Schedule Your Booking | VenueVault"}
        imageUrl={"/signin.png"}
      />
      <BookingForm/>
    </>
  );
};

export default Booking;
