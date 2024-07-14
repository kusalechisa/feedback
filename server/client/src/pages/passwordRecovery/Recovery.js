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
    <section className="">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgb(239, 243, 244)", // Add a slight color tint with transparency
          border: "1px solid #1d1f1d",
          borderRadius: "8px",
          width: "350px",
          marginTop: "20px",
          height: "400px",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex justify-center items-center">
          <form className="pt-10" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-3">
              <div className="input text-center">
                <div className="py-4 text-sm text-left text-gray-500">
                  <h5> Enter OTP sent to your email</h5>
                </div>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className="textbox px-2"
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button
                className="btn btn-success d-flex justify-content-center align-items-center mx-auto my-4 btn:hover"
                type="submit"
              >
                Verfy
              </button>
            </div>
          </form>
          <div className="text-center py-2">
            <button onClick={resendOTP} className="buttons  btn rounded">
              Get OTP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
