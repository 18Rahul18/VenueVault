import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewStadium = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [stadName, setStadName] = useState("");
  const [stadLocation, setStadLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [stadiumSport, setStadiumSport] = useState("");
  const [stadAvatar, setStadAvatar] = useState("");
  const [stadAvatarPreview, setStadAvatarPreview] = useState("");

  const navigateTo = useNavigate();

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

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setStadAvatarPreview(reader.result);
      setStadAvatar(file);
    };
  };

  const handleAddNewStadium = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("stadName", stadName);
      formData.append("stadLocation", stadLocation);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("stadiumSport", stadiumSport);
      formData.append("stadAvatar", stadAvatar);
      await axios
        .post("http://127.0.0.1:4000/api/v1/user/stadium/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setStadName("");
          setStadLocation("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-stadium-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW STADIUM</h1>
        <form onSubmit={handleAddNewStadium}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  stadAvatarPreview ? `${stadAvatarPreview}` : "/stadHolder.jpg"
                }
                alt="Stadium Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Stadium Name"
                value={stadName}
                onChange={(e) => setStadName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Stadium Location"
                value={stadLocation}
                onChange={(e) => setStadLocation(e.target.value)}
              />
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
              <input
                type="number"
                placeholder="Aadhar No"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={stadiumSport}
                onChange={(e) => {
                  setStadiumSport(e.target.value);
                }}
              >
                <option value="">Select Sport</option>
                {sportsArray.map((sport, index) => {
                  return (
                    <option value={sport} key={index}>
                      {sport}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Stadium</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewStadium;
