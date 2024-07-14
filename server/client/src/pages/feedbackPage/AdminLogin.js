import React, { useContext, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { LanguageContext } from "../../context/LanguageContext";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userlogin, error, isLoading } = useLogin();
  const { selectedLanguage, labelLanguage } = useContext(LanguageContext);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      toast.info("username is empty");
      return;
    }
    if (email === "") {
      toast.info("email is empty");
      return;
    }
    if (password === "") {
      toast.error("password is empty");
      return;
    }
    toast.info("Please wait..."); // Show a toast message when the login process starts

    try {
      await userlogin(username, email, password);
    } catch (error) {
      // If login encounters an error
      toast.error("Login failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className=" bg-image"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="container">
        <ToastContainer className="d-flex justify-content-center align-items-center" />
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container mx-auto">
              <div className="row d-flex justify-content-center align-items-center h-100 ">
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                  <div
                    className="card "
                    style={{
                      backgroundColor: "rgb(239, 243, 244)",
                      border: " 1px solid",
                      borderRadius: "15px",
                      marginTop: "28px",
                      marginBottom: "30px",
                      width: "330px",
                      height: "420px",
                    }}
                  >
                    <div className="card-body py-4 vw-auto">
                      <h4 style={{ textAlign: "center" }}>
                        {" "}
                        {labelLanguage[selectedLanguage]
                          ? labelLanguage[selectedLanguage][49]
                          : ""}
                      </h4>
                      <div className="form-outline mb-3 mt-3 p-0 b-1rem">
                        <input
                          type="text"
                          id="typeEmailX"
                          placeholder="Username*"
                          className="form-control form-control-md"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                      <div className="form-outline mb-3 mt-3 p-0 b-1rem">
                        <input
                          type="email"
                          id="typeEmailX-2"
                          placeholder="Email*"
                          className="form-control form-control-md"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="typePasswordX-2"
                          placeholder="Password*"
                          className="form-control form-control-md"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />

                        <div className="password-toggle">
                          <button
                            className="btn"
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <spa>
                                {" "}
                                {labelLanguage[selectedLanguage]
                                  ? labelLanguage[selectedLanguage][50]
                                  : ""}
                              </spa>
                            ) : (
                              <span>
                                {" "}
                                {labelLanguage[selectedLanguage]
                                  ? labelLanguage[selectedLanguage][48]
                                  : ""}
                              </span>
                            )}
                          </button>
                        </div>
                        <hr />
                      </div>
                      {isLoading && (
                        <p style={{ textAlign: "center" }}>loading...</p>
                      )}
                      {!isLoading && (
                        <button className="btn btn-success btn-md btn-block">
                          {labelLanguage[selectedLanguage]
                            ? labelLanguage[selectedLanguage][47]
                            : ""}
                        </button>
                      )}

                      <div className="form-check d-flex justify-content-start my-1">
                        {error && (
                          <div className="login-error text-danger rounded">
                            {error}
                          </div>
                        )}
                      </div>

                      <hr className="my-1 " />
                      <Link
                        className="btn  text-info forgot ms-2"
                        to="/usernamelogin"
                      >
                        {labelLanguage[selectedLanguage]
                          ? labelLanguage[selectedLanguage][51]
                          : ""}
                        ?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserLogin;
