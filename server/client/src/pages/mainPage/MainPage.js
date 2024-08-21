import React, { useContext, useEffect, useRef } from "react";
import QRCode from "qrcode.react"; // Import the QRCode component
import "./MainPage.css";
import Footer from "../../components/footer/Footer";
import { LanguageContext } from "../../context/LanguageContext";
import image0 from "../../assets/img0.png";
import image1 from "../../assets/img1.png";
import image2 from "../../assets/img2.png";
import image4 from "../../assets/img4.jpg";
import image6 from "../../assets/img6.jpg";
import image7 from "../../assets/img7.jpg";
import image8 from "../../assets/img8.jpg";
import image12 from "../../assets/img12.png";

function MainPage() {
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    let currentImageIndex = 0;

    const images = [
      image0,
      image1,
      image2,
      image4,
      image6,
      image7,
      image8,
      image12,
    ];

    const changeBackgroundImage = () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      const imageUrl = `url(${images[currentImageIndex]})`;
      sectionElement.style.backgroundImage = imageUrl;
    };

    const intervalId = setInterval(changeBackgroundImage, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className="bg-images"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "115vh",
      }}
      ref={sectionRef}
    >
      <div className="" style={{ paddingTop: "50px" }}>
        <h2 className="title">
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][28]
            : ""}
        </h2>

        <h3 className="title">
          {labelLanguage[selectedLanguage]
            ? labelLanguage[selectedLanguage][29]
            : ""}
        </h3>

        {/* Add the QR Code with background here */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff", // Background color
              padding: "15px", // Padding around the QR code
              borderRadius: "10px", // Rounded corners
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for depth
            }}
          >
            <div>Scan here to get link.</div>
            <QRCode value="https://feedback-website.onrender.com/" />
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}

export default MainPage;
