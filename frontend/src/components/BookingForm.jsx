import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const BookingForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [sport, setSport] = useState("Cricket");  
  const [stadiumName, setStadiumName] = useState("");
  const [stadiumLocation, setStadiumLocation] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const sportsArray = [
    "Cricket",
    "Football",
    "Hockey",
    "Tennis",
    "Bolleyball",
    "Basketball",
    "Badminton",
    "Kabaddi",
    "Athletics",
  ];

  const [stadiums, setStadiums] = useState([]);
  useEffect(() => {
    const fetchStadiums = async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:4000/api/v1/user/stadiums",
        { withCredentials: true }
      );
      setStadiums(data.stadiums);
      console.log(data.stadiums);
    };
    fetchStadiums();
  }, []);
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/booking/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          booking_date: bookingDate,
          sport,
          stadName: stadiumName,
          stadLocation: stadiumLocation,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setBookingDate(""),
        setSport(""),
        setStadiumName(""),
        setStadiumLocation(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component booking-form">
        <h2>Booking</h2>
        <form onSubmit={handleBooking}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Aadhar No"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="date"
              placeholder="Booking Date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
                setStadiumName("");
                setStadiumLocation("");
              }}
            >
              {sportsArray.map((sport, index) => {
                return (
                  <option value={sport} key={index}>
                    {sport}
                  </option>
                );
              })}
            </select>
           <select
              value={`${stadiumName} ${stadiumLocation}`}
              onChange={(e) => {
                const [stadName, stadLocation] = e.target.value.split(" ");
                setStadiumName(stadName);
                setStadiumLocation(stadLocation);
              }}
              disabled={!sport}
            >
              <option value="">Select Stadium</option>
              {stadiums
                .filter((stadium) => stadium.stadiumSport === sport)
                .map((stadium, index) => (
                  <option
                    value={`${stadium.stadiumName} ${stadium.stadiumLocation}`}
                    key={index}
                  >
                    {stadium.stadName} {stadium.stadLocation}
                  </option>
                ))}
            </select>
          
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET BOOKING</button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
