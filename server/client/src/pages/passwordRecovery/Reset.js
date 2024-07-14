import { useFormik } from "formik";
import { resetPasswordValidation } from "../../helper/validate";
import { resetPassword } from "../../helper/helper";
import { useAuthStore } from "../../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../../hooks/fetch.hook";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, status, serverError }] = useFetch("createResetSession");
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/homepage");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to="/profile" replace={true} />;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className=" bg-image"
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
          backgroundColor: "rgb(239, 243, 244)", // Add a slight color tint with transparency

          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          width: "300px",
          marginTop: "8px",
          height: "400px",
        }}
      >
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="d-flex justify-content-center align-items-center">
          <div className="p-1">
            <div className="text-center">
              <h4 className="py-4">Reset</h4>
              <span className="py-4 lead text-gray-500">
                Enter new password.
              </span>
            </div>
            <form className="py-4" onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-column align-items-center gap-3">
                <div className="input-group">
                  <input
                    {...formik.getFieldProps("password")}
                    className="form-control"
                    type={showPassword ? "password" : "text"}
                    placeholder="New Password"
                  />
                </div>
                <div className="input-group">
                  <input
                    {...formik.getFieldProps("confirm_pwd")}
                    className="form-control"
                    type={showPassword ? "password" : "test"}
                    placeholder="Confirm Password"
                  />
                </div>
                <button
                  className="btn"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Show password" : "Hide password"}
                </button>
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
