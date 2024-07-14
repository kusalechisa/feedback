import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../../helper/validate";
import useFetch from "../../hooks/fetch.hook";
import { useAuthStore } from "../../store/store";
import { verifyPassword } from "../../helper/helper";

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    validate: passwordValidate,
    onSubmit: async (values) => {
      try {
        let loginPromise = verifyPassword({
          username,
          password: values.password,
        });
        toast.promise(loginPromise, {
          loading: "Checking...",
          success: <b>Login Successfully...!</b>,
          error: <b>Wrong password!</b>,
        });

        loginPromise
          .then((res) => {
            let { token } = res.data;
            localStorage.setItem("token", token);
            navigate("/profile");
          })
          .catch((error) => {
            // Handle the error here
            console.error("An error occurred:", error);
          });
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });
  if (isLoading)
    return (
      <h3 className="d-flex justify-content-center align-items-center font-bold">
        Loading ...
      </h3>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <section
      className=" bg-image"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingTop: "17px",
        paddingBottom: "17px",
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
          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          width: "350px",
          marginTop: "8px",
        }}
      >
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="d-flex justify-content-center align-items-center">
          <div className="glass p-3">
            <div className="text-center">
              <h4 className="my-3">
                Welcome {apiData?.firstName || apiData?.username}!
              </h4>
              <span className="py-1 lead text-gray-500">
                Enter your password!
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center py-4">
                <img
                  src={apiData?.profile || avatar}
                  className="rounded-circle"
                  alt="avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "2px solid #eeff56",
                  }}
                />
              </div>

              <div className="d-flex flex-column align-items-center gap-3">
                <input
                  {...formik.getFieldProps("password")}
                  className="w-5 px-2"
                  type="password"
                  placeholder="Enter your password*"
                />
                <button className="btn btn-success" type="submit">
                  Login
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot password?{" "}
                  <Link
                    className="text-info"
                    to="/recovery"
                    style={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    Reset password!
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
