import React from "react";
import "../css/Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Bron z wojny"
              label="Bron"
              path="/login"
            />
            <CardItem
              src="images/img-2.jpg"
              text="LORem ipsum"
              label="Listy"
              path="/login"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="LORem ipsum"
              label="Ksiazki"
              path="/login"
            />
            <CardItem
              src="images/img-4.jpg"
              text="LORem ipsum"
              label="Znaczki"
              path="/login"
            />
            <CardItem
              src="images/img-8.jpg"
              text="LORem ipsum"
              label="Monety"
              path="/login"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
