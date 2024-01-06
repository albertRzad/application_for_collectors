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
              path="https://www.bron.pl/wiedza/bron-palna-i-amunicja/pozwolenie-na-bron-do-celow-kolekcjonerskich"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Zbiór listów z różnych okresów historycznych."
              label="Listy"
              path="https://koscierzyna.naszemiasto.pl/te-znaczki-pocztowe-sa-warte-fortune-kolekcjonerzy-znaczkow/ar/c1-9287575"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Książki zabytkowe i nie tylko, oryginalne egzemplarze."
              label="Ksiazki"
              path="https://instytutksiazki.pl/aktualnosci,2,zabytki-z-krolewskiej-biblioteki-i-zabytkowe-oprawy-w-muzeum-narodowym-w-krakowie,6021.html"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Znaczki z całego świata potwierdzone certyfikatami jakości."
              label="Znaczki"
              path="https://gk24.pl/te-znaczki-pocztowe-sa-warte-fortune-zobacz-ile-sa-warte-stare-znaczki-nie-spodziewasz-sie-ze-moga-tyle-kosztowac-6012024/ar/c3-17767375"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Zbiory monet kolekcjonerskich z prawie wszystkich krajów na świecie."
              label="Monety"
              path="https://www.money.pl/banki/kolekcjonowanie-monet-od-czego-zaczac-wyjasniamy-ile-mozna-na-tym-zarobic-6737621046115136a.html"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
