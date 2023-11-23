import "./Header.css";
import { Link } from "react-router-dom";
import Logof from "../logof.png";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <img src={Logof} alt="" className="logo" />
        </Link>
        <ul className="nav">
          <li className="item-eats">
            <Link to="/" className="nav-link">
              Eats
            </Link>
          </li>
          <li className="item-reservations">
            <Link to="/reservations" className="nav-link">
              Reservations
            </Link>
          </li>
          <li className="user-login">
            <LoginButton />
          </li>
        </ul>
        <div className="culinary">
          <h1 className="textCulinary">
          Where Culinary Delights Meet Effortless Reservations!
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
