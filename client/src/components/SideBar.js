import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import logof from "../logof.png";



const SideBar = () => {
  return (
    <div className="sideBarCont">
      <div className="logoside">
        <ul>
        <li><img src={logof} alt="logo" className="sideLogo" /></li>
        <li className="logohead" >DineEasy</li>
        </ul>
      </div>
      <div className="navMenu1">
        <ul className="nav1">
          <li className="item-eats1">
            <Link to="/" className="nav-link1">
              Eats
            </Link>
          </li>
          <li className="item-reservations1">
            <Link to="/reservations" className="nav-link1">
              Reservations
            </Link>
          </li>
          <li className="user-login">
            <LoginButton />
          </li>
          <li
            className="contactUs"
            onClick={() => (window.location = "mailto: parv.aggarwal2021@vitstudent.ac.in")}
          >
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
