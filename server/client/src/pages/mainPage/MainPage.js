import React, { useContext, useEffect, useRef } from "react";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";
import { LanguageContext } from "../../context/LanguageContext";
import image2 from "../../assets/img2.png";
import image3 from "../../assets/img3.jpg";
import image4 from "../../assets/img4.jpg";
import image6 from "../../assets/img6.jpg";
import image7 from "../../assets/img7.jpg";
import image8 from "../../assets/img8.jpg";
import image10 from "../../assets/img10.png";
import image12 from "../../assets/img12.png";

function MainPage() {
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    let currentImageIndex = 0;

    const images = [
      image2,
      image3,
      image4,
      image6,
      image7,
      image8,
      image10,
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
         <Footer />
      </div>
    </section>
  );
}

export default MainPage;
