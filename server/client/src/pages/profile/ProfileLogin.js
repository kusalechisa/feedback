import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import { useState } from "react";

export default function ProfileLogin() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      setUsername(values.username);
      setLoading(false);
      navigate("/profileupdate");
    },
  });

  return (
    <section
      className="bg-image"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingTop: "33px",
        paddingBottom: "33px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "rgb(239, 243, 244)",
          width: "350px",
          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          marginTop: "8px",
          height: "400px",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="glass py-2 w-100">
            <div className="text-center">
              <br />
              <br />
              <span className="py-3 lead text-gray-500">Enter Username</span>
            </div>
            <form className="py-3" onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-column align-items-center gap-3">
                <input
                  {...formik.getFieldProps("username")}
                  className="w-50 px-2"
                  type="text"
                  placeholder="username"
                />
                {loading ? null : (
                  <button className="btn btn-success" type="submit">
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
