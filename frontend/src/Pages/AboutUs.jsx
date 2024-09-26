import React from "react";
import Athlete from "../components/Athlete";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Athlete
        title={"Learn More About Us | VenueVault"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
