import React, { useContext, useState } from "react";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageContext } from "../../context/LanguageContext";
import "./ComplaintForm.css";

const ComplaintForm = () => {
  const { dispatch } = useFeedbackContext();

  const [phone, setPhone] = useState("");
  const [complaint, setComplaint] = useState("");
  const [setError] = useState(null);
  const [showError, setShowError] = useState(null);
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone === "") {
      setPhone("No Number!");
    }

    if (complaint === "") {
      setShowError(true);
      return;
    }

    const Complaint = {
      phone,
      complaint,
    };

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        body: JSON.stringify(Complaint),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      } else {
        setPhone("");
        setComplaint("");
        dispatch({ type: "CREATE_COMPLAINT", payload: json });
        toast.success("Complaint Sent!", {
          position: toast.POSITION,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-images-complaint">
      <br />
      <div className="generals-complaint">
        <ToastContainer />
        <form className="container-complaint" onSubmit={handleSubmit}>
          <br />
          <h3 className="h3-complaint">
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][15]
              : ""}
          </h3>
          <br />
          <div className="form-comments-complaint">
            <label className="complaint">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][16]
                : ""}
            </label>
            <textarea
              className="rounded-complaint px-2"
              id="complaint"
              placeholder={
                labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][17]
                  : ""
              }
              onChange={(e) => setComplaint(e.target.value)}
              value={complaint}
            />
            {complaint === "" && showError && (
              <span className="text-danger-complaint">
                {" "}
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][37]
                  : ""}
              </span>
            )}
          </div>
          <div className="form-phones-complaint">
            <label className="phone">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][4]
                : ""}
            </label>
            <div>
              <input
                className="phone-complaint"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="+251"
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary my-2"
            style={{ fontWeight: "bold" }}
          >
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][18]
              : ""}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ComplaintForm;
