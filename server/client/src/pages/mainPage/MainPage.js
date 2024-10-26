import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
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
  const [showQRCode, setShowQRCode] = useState(false);

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
      sectionElement.classList.add("slide-out");
      sectionElement.style.backgroundImage = `url(${images[currentImageIndex]})`;

      // Add sliding class and remove after animation
      setTimeout(() => {
        sectionElement.classList.remove("slide-out");
      }, 1000); // Matches CSS transition duration
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
        height: "130vh",
      }}
      ref={sectionRef}
    >
      <button
        onClick={() => setShowQRCode(!showQRCode)}
        style={{
          margin: "10px",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "green",
          color: "#fff000",
          cursor: "pointer",
        }}
      >
        {showQRCode ? "Hide QR Code" : "Show QR Code"}
      </button>

      <div style={{ paddingTop: "50px" }}>
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
        <div className="flowtexts">
          <h3 className="flowtext">
            {labelLanguage[selectedLanguage]
              ? `${labelLanguage[selectedLanguage][55]} `
              : ""}
            {labelLanguage[selectedLanguage]
              ? `${labelLanguage[selectedLanguage][56]} `
              : ""}
            {labelLanguage[selectedLanguage]
              ? `${labelLanguage[selectedLanguage][58]} `
              : ""}
            {labelLanguage[selectedLanguage]
              ? `${labelLanguage[selectedLanguage][60]} `
              : ""}
          </h3>
        </div>

        {showQRCode && (
          <div className="qr-code-container">
            <div
              style={{
                fontWeight: "bold",
                color: "#00ffee",
                marginBottom: "10px",
              }}
            >
              Scan Website Link
            </div>
            <QRCode value={window.location.href} />
          </div>
        )}

        <Footer />
      </div>
    </section>
  );
}

export default MainPage;
