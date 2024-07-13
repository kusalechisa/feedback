import React, { useContext, useState } from "react";
import { useComplaintContext } from "../../hooks/useComplaintContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageContext } from "../../context/LanguageContext";
import "./ComplaintForm.css";

const ComplaintForm = () => {
  const { dispatchc } = useComplaintContext();

  const [phone, setPhone] = useState("");
  const [complaint, setComplaint] = useState("");
  const [setError] = useState("");
  const [showError, setShowError] = useState(null);
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (complaint === "") {
      setShowError(true);
      return;
    }

    const Complaint = {
      phone,
      complaint,
      email,
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
        setEmail("");
        setComplaint("");
        dispatchc({ type: "CREATE_COMPLAINT", payload: json });
        toast.success("Complaint Sent!", {
          position: toast.POSITION,
        });
      }
    } catch (error) {
      console.error("Error:", error);
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

          <div className="form-Emailfeed">
            <label htmlFor="email">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][44]
                : ""}
            </label>
            <div>
              <input
                className="px-3"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={
                  labelLanguage[selectedLanguage]
                    ? labelLanguage[selectedLanguage][46]
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-Phonefeed">
            <label htmlFor="phone">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][4]
                : ""}
            </label>
            <div>
              <input
                className="px-3"
                id="phone"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="+251(optional)"
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
