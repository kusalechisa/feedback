import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/store";
import { generateOTP, verifyOTP } from "../../helper/helper";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useRef(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) return toast.success("OTP has been sent to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verification Successful!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Please check your email!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

  return (
    <section
      className=""
      style={{
        backgroundImage:
          "url('https://www.mazai ndia.com/wallpapers/maxresdefault(26).jpg')",
        backgroundColor: "rgb(255, 255, 255)",
        paddingTop: "33px",
        paddingBottom: "33px",
        backgroundPosition: "center",
        width: "100%",
        height: "110vh",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgb(239, 243, 244)", // Add a slight color tint with transparency

          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          width: "350px",
          marginTop: "8px",
          height: "500px",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex justify-center items-center">
          <div className="glass">
            <div className="title flex flex-col items-center">
              <h3 className="font-bold">Recovery</h3>
            </div>

            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                  <div className="py-4 text-sm text-left text-gray-500">
                    <h5> Enter the 6-digit OTP sent to your email address.</h5>
                  </div>
                  <input
                    onChange={(e) => setOTP(e.target.value)}
                    className="textbox"
                    type="text"
                    placeholder="OTP"
                  />
                </div>

                <button
                  className="btn btn-success d-flex justify-content-center align-items-center mx-auto my-4"
                  type="submit"
                >
                  Verfy
                </button>
              </div>
            </form>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Didn't get OTP?{" "}
                <button
                  onClick={resendOTP}
                  className="btn-secondary rounded"
                  style={{ backgroundColor: "Highlight" }}
                >
                  Get OTP
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
