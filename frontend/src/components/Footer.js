import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">CollectOn</h1>
        <h2>Contact</h2>
        <address>
          <br />
          Politechnika Lubelska, 20-618 Lublin, Poland
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Collections</h2>
          <ul className="nav__ul">
            <li>
              <a href="http://localhost:3001/exploreCollections">Antiques</a>
            </li>
            <li>
              <a href="http://localhost:3001/exploreCollections">Rare Coins</a>
            </li>
          </ul>
        </li>
        <div className="footer__info">
        <p>
          Project created by Ernest Rozwadowski and Albert Rząd
        </p>
      </div>
      </ul>

    </footer>
  );
};

export default Footer;
