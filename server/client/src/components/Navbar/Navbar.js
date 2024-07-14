import React, { useContext, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useLogoutAdmin } from "../../hooks/useLogoutAdmin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAuthContextC } from "../../hooks/useAuthContextC";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Mint.jpg"; // Replace "logo.png" with the actual filename and path of your logo image
const Navbar = () => {
  const { logout, signup, profile } = useLogout();
  const { logoutadmin } = useLogoutAdmin();
  const { user } = useAuthContext();
  const { admin } = useAuthContextC();
  const [activeLink, setActiveLink] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { labelLanguage, selectedLanguage, updateLanguage, languageOptions } =
    useContext(LanguageContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleLanguageChange = (e) => {
    updateLanguage(e.target.value);
  };
  const navigate = useNavigate();
  const handleChange = (selected) => {
    setSelectedOption(selected);

    // Perform actions based on the selected option
    if (selected === "profile") {
      handleProfile();
    } else if (selected === "signup") {
      handleSignup();
    } else if (selected === "users") {
      navigate("/usersdetail");
    } else if (selected === "dashboard") {
      navigate("/");
    }
  };

  const options = [
    { value: "dashboard", label: "Dashboard" },
    {
      value: "profile",
      label: <div>Update</div>,
    },
    {
      value: "signup",
      label: <div>Add Admin</div>,
    },
    {
      value: "users",
      label: <div>Admins</div>,
    },
  ];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleClick = () => {
    if (user) logout();
    else if (admin) logoutadmin();
  };

  const handleSignup = () => {
    signup();
  };
  const handleProfile = () => {
    profile();
  };
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  let EmailAddress;
  if (admin) {
    EmailAddress = (
      <div className="email">
        <li>{admin.email}</li>
      </div>
    );
  } else if (user) {
    EmailAddress = (
      <div className="email">
        <li>{user.email}</li>
      </div>
    );
  }
  return (
    <>
      <nav className="navbar navbar-expand-md py-0" id="navi">
        <div>
          <button
            className="navbar-toggler mx-3 my-3"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          >
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{
                width: "100px",
                height: "45px",
              }}
            />
            <ul className="navbar-nav mx-4">
              {user || admin ? (
                <>
                  <div className="email">{EmailAddress}</div>
                  <button className="logout" onClick={handleClick}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>

                  <div>
                    <select
                      className="dashboard"
                      value={selectedOption}
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      {options.map((option) => (
                        <option
                          className="dashboardoption bg-success"
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="Language">
                    <select
                      id="languages"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="Languages form-select-md"
                    >
                      {languageOptions.map((language, index) => (
                        <option key={index} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                  {user || admin ? null : (
                    <NavLink
                      className={`nav-links ${
                        activeLink === "about" ? "active" : ""
                      }`}
                      to="/adminLogin"
                      onClick={() => handleNavLinkClick("about")}
                    >
                      {labelLanguage[selectedLanguage]
                        ? labelLanguage[selectedLanguage][47]
                        : ""}
                    </NavLink>
                  )}
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link ${
                        activeLink === "homepage" ? "active" : ""
                      }`}
                      to="/homepage"
                      onClick={() => handleNavLinkClick("homepage")}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ marginRight: "5px", height: "18px" }}
                      />
                      {labelLanguage[selectedLanguage]
                        ? labelLanguage[selectedLanguage][23]
                        : ""}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link ${
                        activeLink === "feedback" ? "active" : ""
                      }`}
                      to="/givefeedback"
                      onClick={() => handleNavLinkClick("feedback")}
                    >
                      {labelLanguage[selectedLanguage]
                        ? labelLanguage[selectedLanguage][20]
                        : ""}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link ${
                        activeLink === "about" ? "active" : ""
                      }`}
                      to="/complaintform"
                      onClick={() => handleNavLinkClick("about")}
                    >
                      {labelLanguage[selectedLanguage]
                        ? labelLanguage[selectedLanguage][21]
                        : ""}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
