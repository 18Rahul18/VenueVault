import React from "react";

const Athlete = ({ title, imageUrl }) => {
  return (
    <>
      <div className="athlete container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Welcome to the players' hub of VenueVault, where finding and booking
          the perfect sports ground has never been easier. Whether you're 
          looking to play a casual match with friends or organize a tournament,
          we provide access to a variety of venues including parks, grounds, 
          and stadiums. With our simple search and booking process, you can 
          explore available locations, check amenities, and reserve the right 
          spot for your game in just a few clicks. VenueVault makes it hassle-free 
          for players to get on the field and focus on what matters—playing the game!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="athlete" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Athlete;
