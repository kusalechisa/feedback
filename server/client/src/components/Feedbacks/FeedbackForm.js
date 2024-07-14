import React, { useContext, useState } from "react";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageContext } from "../../context/LanguageContext";
import "./FeedbackForm.css";
import { FaSearch } from "react-icons/fa";
const FeedBackForm = () => {
  const { dispatch } = useFeedbackContext();
  const [setError] = useState(null);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedDesk, setSelectedDesk] = useState("");
  const [stars, setStars] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [comment, setComment] = useState("");
  const [showError, setShowError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [identity, setIdentity] = useState("");

  const {
    sectorLabel,
    officeLabel,
    deskLabel,
    selectedLanguage,
    labelLanguage,
  } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSector === "") {
      setShowError(true);
      return;
    }

    if (stars === "") {
      setShowError(true);
      return;
    }
    if (issue === "") {
      setShowError(true);
    }

    const feedback = {
      identity,
      selectedSector,
      selectedOffice,
      selectedDesk,
      stars,
      issue,
      phone,
      email,
      comment,
    };
    const response = await fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setShowError(false);
      setSelectedSector("");
      setSelectedOffice("");
      setSelectedDesk("");
      setStars("");
      setIssue("");
      setPhone("");
      setEmail("");
      setComment("");
      setIdentity("");

      dispatch({ type: "CREATE_COMPLAINT", payload: json });
      // Display a success toast notification
      toast.success("Sent successfully", {
        position: toast.POSITION,
      });
    }
  };

  const handleRatingChange = (label) => {
    setStars(label);
    setShowError(false); // Hide the error message
  };

  const ratingLabels = ["Not Good", "Average", "Good", "Very Good"];

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.length === 0) {
      setFilteredOptions([]);
      return;
    }

    const filtered = [];

    // Filter sectors
    (sectorLabel[selectedLanguage] || []).forEach((sector) => {
      if (sector.toLowerCase().includes(searchTerm.toLowerCase())) {
        filtered.push({ type: "sector", value: sector });
      }
    });

    // Filter offices
    Object.keys(officeLabel[selectedLanguage] || {}).forEach((sector) => {
      officeLabel[selectedLanguage][sector].forEach((office) => {
        if (office.toLowerCase().includes(searchTerm.toLowerCase())) {
          filtered.push({ type: "office", value: office, sector });
        }
      });
    });

    // Filter desks
    Object.keys(deskLabel[selectedLanguage] || {}).forEach((office) => {
      deskLabel[selectedLanguage][office].forEach((desk) => {
        if (desk.toLowerCase().includes(searchTerm.toLowerCase())) {
          const sector = getSectorForOffice(office);
          filtered.push({ type: "desk", value: desk, office, sector });
        }
      });
    });

    setFilteredOptions(filtered);
  };

  const getSectorForOffice = (office) => {
    for (const sector in officeLabel[selectedLanguage] || {}) {
      if (officeLabel[selectedLanguage][sector].includes(office)) {
        return sector;
      }
    }
    return "";
  };

  const handleOptionClick = (option) => {
    setSearchTerm("");
    if (option.type === "sector") {
      setSelectedSector(option.value);
      setSelectedOffice("");
      setSelectedDesk("");
    } else if (option.type === "office") {
      setSelectedSector(option.sector);
      setSelectedOffice(option.value);
      setSelectedDesk("");
    } else if (option.type === "desk") {
      setSelectedSector(option.sector);
      setSelectedOffice(option.office);
      setSelectedDesk(option.value);
    }
    setFilteredOptions([]);
  };

  return (
    <section className="bg-imagefeed">
      <ToastContainer />
      <div className="generalfeed">
        <form className="containerfeed" onSubmit={handleSubmit}>
          <h3 className="h3feed">
            {" "}
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][7]
              : ""}
          </h3>

          <div className="search-containerfeed">
            <FaSearch className={`search ${searchTerm ? "hidden" : ""}`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-search my-3"
            />
            {filteredOptions.length > 0 && (
              <ul className="search-resultsfeed">
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="search-result-itemfeed"
                  >
                    {`${option.value} (${option.type})`}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="identity">
            <label htmlFor="identity">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][38]
                : ""}
            </label>
            <br />
            <input
              name="identity"
              id="internal"
              type="radio"
              value="internal"
              checked={identity === "internal"}
              onChange={() => setIdentity("internal")}
            />
            <label className="mx-2" htmlFor="internal">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][39]
                : ""}
            </label>

            <input
              name="identity"
              id="external"
              type="radio"
              value="external"
              checked={identity === "external"}
              onChange={() => setIdentity("external")}
            />
            <label className="mx-2 my-2" htmlFor="external">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][40]
                : ""}
            </label>
            {identity === "" && showError && (
              <div className="text-dangerfeed">
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][41]
                  : ""}
              </div>
            )}
          </div>
          <div className="form-Sectorfeed">
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][0]
              : ""}
            <select
              id="office"
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setSelectedOffice("");
                setSelectedDesk("");
                setShowError(false);
              }}
              value={selectedSector}
              className={`form-control ${
                selectedSector === "" ? "empty-field" : ""
              } form-select form-select-md`}
            >
              <option value="">
                {" "}
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][12]
                  : ""}
              </option>
              {sectorLabel[selectedLanguage]?.map((label, index) => (
                <option key={index} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {selectedSector === "" && showError && (
            <div className="text-dangerfeed">
              {" "}
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][25]
                : ""}
            </div>
          )}
          <div className="form-Officefeed">
            <label htmlFor="office">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][1]
                : ""}
            </label>
            <select
              id="office"
              onChange={(e) => {
                setSelectedOffice(e.target.value);
                setSelectedDesk("");
                setShowError(false);
              }}
              value={selectedOffice}
              className={`form-control ${
                selectedOffice === "" ? "empty-field" : ""
              } form-select form-select-md`}
            >
              <option value="">
                {" "}
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][13]
                  : ""}
              </option>
              {officeLabel[selectedLanguage]?.[selectedSector]?.map(
                (office, indexs) => (
                  <option key={indexs} value={office}>
                    {office}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-Deskfeed">
            <label htmlFor="desk">
              {" "}
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][2]
                : ""}
            </label>
            <select
              id="desk"
              onChange={(e) => {
                setSelectedDesk(e.target.value);
                setShowError(false);
              }}
              value={selectedDesk}
              className={`form-control ${
                selectedDesk === "" ? "empty-field" : ""
              } form-select form-select-md`}
            >
              <option value="">
                {" "}
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][14]
                  : ""}
              </option>
              {deskLabel[selectedLanguage]?.[selectedOffice]?.map(
                (desk, index) => (
                  <option key={index} value={desk}>
                    {desk}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-Ratingfeed">
            <label htmlFor="rating">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][3]
                : ""}
            </label>
            <div className="rating-containerfeed">
              {ratingLabels.map((label, index) => (
                <div key={index} className="form-check form-check-inline">
                  <input
                    type="radio"
                    id={`rating-${index}`}
                    className="form-check-input"
                    value={label}
                    checked={stars === label}
                    onChange={() => handleRatingChange(label)}
                  />
                  <label
                    htmlFor={`rating-${index}`}
                    className="form-check-label"
                  >
                    {labelLanguage[selectedLanguage]
                      ? labelLanguage[selectedLanguage][8 + index]
                      : ""}
                  </label>
                </div>
              ))}
            </div>
            {stars === "" && showError && (
              <span className="text-dangerfeed">
                {labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][36]
                  : ""}
              </span>
            )}
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
          <div
            style={{
              marginTop: "20px",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            {" "}
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][42]
              : ""}
          </div>
          <div className="form-MainIssuefeed">
            <label htmlFor="mainissue">
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][43]
                : ""}
            </label>
            <div>
              <input
                className="px-3"
                id="mainissue"
                onChange={(e) => setIssue(e.target.value)}
                value={issue}
                placeholder={
                  labelLanguage[selectedLanguage]
                    ? labelLanguage[selectedLanguage][45]
                    : ""
                }
              />
            </div>
          </div>

          <div className="form-Commentfeed">
            <label htmlFor="comment">
              {" "}
              {labelLanguage[selectedLanguage]
                ? labelLanguage[selectedLanguage][5]
                : ""}
            </label>
            <textarea
              className="roundedfeed px-3 py-1"
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder={
                labelLanguage[selectedLanguage]
                  ? labelLanguage[selectedLanguage][24]
                  : ""
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-success my-2"
            style={{ fontWeight: "bold" }}
          >
            {labelLanguage[selectedLanguage]
              ? labelLanguage[selectedLanguage][6]
              : ""}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedBackForm;
