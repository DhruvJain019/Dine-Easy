import "./Footer.css";
import { Link } from "react-router-dom";
import Github from "../icons8-github-96.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-nav">
          <li className="item-footer">
            <Link to="/" className="footer-title">
              DineEasy
            </Link>
          </li>
        
          <li className="thanksCont">
            <p className="thanks">
              Thanks for visiting.
              <br /> This site was created by: <br/>Divyam Kashyap, Parv Aggarwal, Dhruv Jain, Preet Patel, Ayush Kumar Mallick.
            </p>
            <a
              href="https://github.com/ParvAggarwal"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={Github} className="ghicon" alt="github"></img>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
