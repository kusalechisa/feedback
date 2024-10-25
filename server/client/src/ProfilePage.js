import React, { useContext } from "react";
import "./ProfilePage.css";
import profilePic from "./assets/profile-pic-2.jpg";
import profilePicKeng from "./assets/kengita.png";
import profilePicTedy from "./assets/tedy.jpg";
import profilePiclem from "./assets/image.png";
import { LanguageContext } from "./context/LanguageContext";
const ProfilePage = () => {
   const { selectedLanguage, labelLanguage } = useContext(LanguageContext);
  const users = [
    {
      name: "Yaduma Lechisa",
      email: "kusalechisac@gmail.com",
      phone: "+251 917 190 991",
      bio: "Passionate about software development, especially using the MERN stack.",
      profilePicture: profilePic,
    },
    {
      name: "Tewodros Million",
      email: "tewodrosmillion@gmail.com",
      phone: "+251 947 134 309",
      bio: "A creative mind interested in frontend development.",
      profilePicture: profilePicTedy,
    },
    {
      name: "Lemesa Kasim",
      email: "lemesakasim@gmail.com",
      phone: "+251 904 450 553",
      bio: "Backend enthusiast who loves working with databases and APIs.",
      profilePicture: profilePiclem,
    },
    {
      name: "Kengitan Kebato",
      email: "kengitankebato@gmail.com",
      phone: "+251 953 705 602",
      bio: "A frontend developer passionate about UI/UX design.",
      profilePicture: profilePicKeng,
    },
  ];

  return (
    <div className="container mt-5">
      {/* Ministry of Innovation Section */}
      <div className="mb-5">
        <h1 className="display-4">
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][54]
            : ""}
        </h1>
        <p className="lead">
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][55]
            : ""}
        </p>
        <h5>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][56]
            : ""}
        </h5>
        <p>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][57]
            : ""}
        </p>
        <h5>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][58]
            : ""}
        </h5>
        <p>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][59]
            : ""}
        </p>
        <h5>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][60]
            : ""}
        </h5>
        <p>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][61]
            : ""}
        </p>
        <h6>
          {" "}
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][62]
            : ""}
        </h6>
      </div>

      <h2 className="text-center mb-4">
        {" "}
        {labelLanguage[selectedLanguage]
          ? labelLanguage[selectedLanguage][63]
          : ""}
      </h2>

      {/* User Profiles Section */}
      <div className="row">
        {users.map((user, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-header text-center bg-primary text-white">
                <h5>{user.name}</h5>
              </div>
              <div className="card-body text-center">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "3px solid #007bff",
                  }}
                />
                <h6 className="text-secondary">{user.email}</h6>
                <h6 className="text-warning">{user.phone}</h6>
                <p className="mt-3 text-muted">{user.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
