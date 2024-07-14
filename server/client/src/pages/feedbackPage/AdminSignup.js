import React, { useState } from "react";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/helper";
import avatar from "../../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminSignup() {
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Email, setEmailErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      adminType: "FeedbackAdmin",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: registerValidation,
    onSubmit: async (values) => {
      try {
        values = await Object.assign(values, { profile: file || "" });

        setErrorMessage(""); // Clear any previous error messages
        if (values.password !== values.confirmPassword) {
          setErrorMessage("password doesn't match");
          return;
        }
        setIsRegistering(true); // Set the registering state to true
        await registerUser(values);
        toast.success("Registered Successfully!", {
          position: toast.POSITION,
        });
        setIsRegistering(false);

        values.email = "";
        values.username = "";
        values.password = "";
        values.confirmPassword = "";
      } catch (error) {
        const errorMessage = error.message || "email or username already exist";

        setErrorMessage(errorMessage);
      } finally {
        setIsRegistering(false); // Set the registering state back to false
        setEmailErr("");
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className="bg-image d-flex justify-content-center align-items-center"
      style={{
         backgroundColor: "rgb(255, 255, 255)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    ><ToastContainer/>
      <Toaster position="top-center" />
      <div
        className="bg-image d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgb(239, 243, 244)", // Add a slight color tint with transparency
          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          maxWidth: "350px",
          width: "auto",
          minHeight: "470px",
          paddingLeft: "90px",
        }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <label htmlFor="profile">
              <img
                style={{ width: "100px", height: "100px", marginLeft: "95%" }}
                src={file || avatar}
                className="rounded-circle"
                alt="avatar"
              />
            </label>
            <br />
            <br />
            <input
              className="px-5"
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
              accept=".jpg, .jpeg, .png, .gif"
            />

            <div className="px-5">
              <input
                {...formik.getFieldProps("username")}
                className="textbox my-1 rounded border-1"
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("email")}
                className="textbox my-1 rounded border-1"
                type="text"
                placeholder="Email*"
              />
              {Email && <div className="error text-danger">{Email}</div>}

              <div className="input-group">
                <input
                  {...formik.getFieldProps("password")}
                  className="textbox my-1 rounded border-1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                />
              </div>
              <div className="input-group">
                <input
                  {...formik.getFieldProps("confirmPassword")}
                  className="textbox my-1 rounded border-1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password*"
                />
                <button
                  className="btn"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
              {isRegistering && <p>Registering...</p>}
              {errorMessage && (
                <div className="error text-danger">{errorMessage}</div>
              )}
              {!isRegistering && (
                <button className="btn btn-success mt-3" type="submit">
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
