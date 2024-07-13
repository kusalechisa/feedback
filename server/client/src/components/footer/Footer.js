import MintLogo from "./Mint.jpg";
import "./Footer.css";
import { LanguageContext } from "../../context/LanguageContext";
import { useContext } from "react";
function Footer() {
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);

  return (
    <footer>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="icon" type="image/png" href={MintLogo} />

      <div className="container1">
        <div className="footer-col office-col">
          <p className="text-office">
            {" "}
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][33]
              : ""}
          </p>
          <p>2QF4+G2G, Arada 1/2</p>
          <a
            href="https://maps.app.goo.gl/nXNoVukYEZrKvTsh6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              {" "}
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][34]
                : ""}
            </p>
          </a>
        </div>
        <img className="footer-para" id="im" src={MintLogo} alt="logo of Mint" />
        <div className="footer-col social-col">
          <p>
            {" "}
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][31]
              : ""}
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/MInT.Ethiopia" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/@MinistryofInnovationandTechnol"
              target="_blank" rel="noreferrer"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/ministry-of-innovation-and-technology-ethiopia/"
              target="_blank" rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <p className="phone">
            {" "}
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][32]
              : ""}{" "}
            +251 11 126 5737
          </p>
        </div>
      </div>
      <p id="copywrite">
        &copy; {new Date().getFullYear()} Ministry Of Innovation And Technology.
        All Right Is Reserved
      </p>
    </footer>
  );
}

export default Footer;
