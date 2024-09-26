import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/stadiums",
          { withCredentials: true }
        );
        setStadiums(data.stadiums);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchStadiums();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page stadiums">
      <h1>STADIUMS</h1>
      <div className="banner">
        {stadiums && stadiums.length > 0 ? (
          stadiums.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.stadAvatar && element.stadAvatar.url}
                  alt="stadium avatar"
                />
                <h4>{`${element.stadName} ${element.stadLocation}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Sport: <span>{element.stadiumSport}</span>
                  </p>
                  <p>
                    Aadhar No: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Stadiums Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Stadiums;
