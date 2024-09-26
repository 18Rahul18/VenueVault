import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Sports = () => {
  const sportsArray = [
    {
      name: "Cricket",
      imageUrl: "/sports/cricket.jpg",
    },
    {
      name: "Football",
      imageUrl: "/sports/football.jpg",
    },
    {
      name: "Hockey",
      imageUrl: "/sports/hockey.jpg",
    },
    {
      name: "Tennis",
      imageUrl: "/sports/tennis.jpg",
    },
    {
      name: "Bolleyball",
      imageUrl: "/sports/bolleyball.jpg",
    },
    {
      name: "Basketball",
      imageUrl: "/sports/basketball.jpg",
    },
    {
      name: "Badminton",
      imageUrl: "/sports/badminton.jpg",
    },
    {
      name: "Kabaddi",
      imageUrl: "/sports/kabaddi.jpg",
    },
    {
      name: "Athletics",
      imageUrl: "/sports/athletics.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container sports">
        <h2>Sports</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {sportsArray.map((sport, index) => {
            return (
              <div key={index} className="card">
                <div className="sport-name">{sport.name}</div>
                <img src={sport.imageUrl} alt="Sport" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Sports;
