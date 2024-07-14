import React, { useState } from "react";
import { Formik, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../../assets/profile.png";
import { profileValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import useFetch from "../../hooks/fetch.hook";
import { updateUser } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading)
    return (
      <h3
        className="d-flex justify-content-center align-items-center font-bold"
        reverseOrder={false}
      >
        Loading profile...
      </h3>
    );

  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <section
      className=" bg-image"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Toaster position="top-center" />

      <div
        className="title flex flex-col items-center font-bold"
        style={{
          backgroundColor: "rgb(239, 243, 244)",
          width: "350px",
          border: "1px solid #453212",
        }}
      >
        <div className="d-flex justify-content-end">
          <span className="text-gray-500">
            <button onClick={userLogout} className="btn text-danger" to="/">
              Back
            </button>
          </span>
        </div>
        <div className="title items-center">
          <h4 className="font-bold">Profile</h4>
        </div>
        <Formik
          initialValues={{
            username: apiData?.username || "",
            firstName: apiData?.firstName || "",
            lastName: apiData?.lastName || "",
            email: apiData?.email || "",
            mobile: apiData?.mobile || "",
            address: apiData?.address || "",
          }}
          validate={profileValidation}
          enableReinitialize={true}
          onSubmit={async (values) => {
            values = await Object.assign(values, {
              profile: file || apiData?.profile || "",
            });
            let updatePromise = updateUser(values);
            toast.promise(updatePromise, {
              loading: "Updating...",
              success: <b>Updated Successfully...!</b>,
              error: <b>Could not Update!</b>,
            });
          }}
        >
          {({ handleSubmit }) => (
            <form className="" onSubmit={handleSubmit}>
              <div className="profile flex justify-center">
                <label htmlFor="profile">
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "4px solid #eeff66",
                    }}
                    src={apiData?.profile || file || avatar}
                    className="rounded-circle"
                    alt="avatar"
                  />
                </label>
                <br />
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="container">
                <div className="row">
                  <Field
                    className="textbox my-1 rounded"
                    type="text"
                    name="username"
                    placeholder="FirstName"
                  />
                  <Field
                    className="textbox my-1 rounded"
                    type="text"
                    name="firstName"
                    placeholder="FirstName"
                  />
                  <Field
                    className="textbox my-1 rounded"
                    type="text"
                    name="lastName"
                    placeholder="LastName"
                  />
                  <Field
                    className="textbox my-1 rounded"
                    type="text"
                    name="mobile"
                    placeholder="Mobile No."
                  />
                  <Field
                    className="textbox my-1 rounded"
                    type="email"
                    name="email"
                    placeholder="Email*"
                  />
                  <Field
                    className="textbox my-1 rounded"
                    type="address"
                    name="address"
                    placeholder="Address"
                  />

                  <div class="btn">
                    <button class="btn btn-success" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
}
