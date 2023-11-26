import React from "react";
import "./css/Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Niesamowite kolekcje broni zabytkowej, jak i współczesnej."
              label="Bron"
              path="/login"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Listy listy listy listy listy listy listy listy"
              label="Listy"
              path="/login"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Książeczki zabytkowe i nie tylko, oryginalne egzemplarze."
              label="Ksiazki"
              path="/login"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Znaczki z całego świata potwierdzone certyfikatami jakości."
              label="Znaczki"
              path="/login"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Zbiory monet kolekcjonerskich z prawie wszystkich krajów na świecie."
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
