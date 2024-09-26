import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/booking/getall",
          { withCredentials: true }
        );
        setBookings(data.bookings);
      } catch (error) {
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:4000/api/v1/booking/update/${bookingId}`,
        { status },
        { withCredentials: true }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status }
            : booking
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/stad.png" alt="stadImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Bookings</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Stadiums</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Bookings</h5>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Date</th>
                <th>Stadium</th>
                <th>Sport</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0
                ? bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{`${booking.firstName} ${booking.lastName}`}</td>
                      <td>{booking.booking_date.substring(0, 16)}</td>
                      <td>{`${booking.stadium.stadName} ${booking.stadium.stadLocation}`}</td>
                      <td>{booking.sport}</td>
                      <td>
                        <select
                          className={
                            booking.status === "Pending"
                              ? "value-pending"
                              : booking.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={booking.status}
                          onChange={(e) =>
                            handleUpdateStatus(booking._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{booking.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : <tr>
                      <td colSpan="6">No Bookings Found!</td>
                 </tr>
                 }
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
