import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">CollectOn</h1>
        <h2>Contact</h2>

        <address>
          <br />
          Politechnika Lubelska,  20-618 Lublin, Poland
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Collections</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Antiques</a>
            </li>

            <li>
              <a href="#">Rare Coins</a>
            </li>
          </ul>
        </li>

        <li className="nav__item nav__item--extra">
          <h2 className="nav__title">Explore</h2>

          <ul className="nav__ul nav__ul--extra">
            <li>
              <a href="#">Featured Collectors</a>
            </li>

            <li>
              <a href="#">Events & Exhibitions</a>
            </li>

            <li>
              <a href="#">Collector's Forum</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms of Use</a>
            </li>

            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
