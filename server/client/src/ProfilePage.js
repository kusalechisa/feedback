import React from "react";
import "./ProfilePage.css";
import profilePic from "./assets/profile-pic-2.jpg";
import profilePicKeng from "./assets/kengita.png";
import profilePicTedy from "./assets/tedy.jpg";
import profilePiclem from "./assets/image.png";

const ProfilePage = () => {
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
      bio: "A creative mind interested in front-end development.",
      profilePicture: profilePicTedy,
    },
    {
      name: "Lemesa Kasim",
      email: "lemesakasim@gmail.com",
      phone: "+251 904 450 553",
      bio: "Back-end enthusiast who loves working with databases and APIs.",
      profilePicture: profilePiclem,
    },
    {
      name: "Kengitan Kebato",
      email: "kengitankebato@gmail.com",
      phone: "+251 953 705 602",
      bio: "A full-stack developer passionate about problem-solving.",
      profilePicture: profilePicKeng,
    },
  ];

  return (
    <div className="container mt-5">
      {/* Ministry of Innovation Section */}
      <div className="mb-5">
        <h1 className="display-4">Ministry of Innovation And Technology</h1>
        <p className="lead">
          At the Ministry of Innovation and Technology (MINT), we believe in the
          power of your voice to shape our future. Our Feedback and Corruption
          Suggestion System is a key tool designed to:
        </p>
        <h3>1. Improve Service Quality</h3>
        <p>
          After interacting with our services, your feedback helps us
          continuously refine and improve our performance. By sharing your
          experience, you enable us to better serve you and the community.
        </p>
        <h3>2. Ensure Transparency and Integrity</h3>
        <p>
          If you witness any form of corruption or unethical behavior, your
          suggestions and reports are invaluable in promoting accountability
          within MINT. We are committed to maintaining high ethical standards,
          and your input is essential in safeguarding the integrity of our
          operations.
        </p>
        <h3>3. Foster Trust and Collaboration</h3>
        <p>
          By participating in this system, you contribute to a culture of
          openness and trust between MINT and the public. Your feedback and
          suggestions help us work together to build a more transparent and
          efficient organization.
        </p>
        <h4>
          Together, we can create a better, more accountable future for
          Ethiopia’s technological advancement. Your voice matters—share your
          feedback and suggestions today!
        </h4>
      </div>

      <h2 className="text-center mb-4">System Developer Team</h2>

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
