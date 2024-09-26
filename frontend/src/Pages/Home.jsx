import React, { useContext } from "react";
import Athlete from "../components/Athlete";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Sports from "../components/Sports";

const Home = () => {
  return (
    <>
      <Athlete
        title={
          "Find and Book Your Ideal Sports Ground | VenueVault"
        }
        imageUrl={"/athlete.jpg"}
      />
      
      <Sports />
      <MessageForm />
    </>
  );
};

export default Home;
