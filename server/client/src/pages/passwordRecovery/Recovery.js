import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/store";
import { generateOTP, verifyOTP } from "../../helper/helper";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Function to handle OTP generation and set countdown
  const sendOTP = () => {
    setIsSending(true); // Show loading state
    generateOTP(username)
      .then(() => {
        toast.success("OTP has been sent to your email!");
        setCountdown(60);
      })
      .catch(() => {
        toast.error("Problem while generating OTP!");
      })
      .finally(() => {
        setIsSending(false); // Hide loading state
      });
  };

  // OTP verification handler
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verification Successful!");
        navigate("/reset");
      } else {
        toast.error("Wrong OTP! Please check your email!");
      }
    } catch (error) {
      toast.error("Error verifying OTP!");
    }
  };

  return (
    <section className="otp-recovery">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgb(239, 243, 244)",
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
                  <h5>Check your email</h5>
                </div>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className="textbox px-2"
                  type="text"
                  placeholder="Enter OTP"
                />
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center mx-auto my-4"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>
          <div className="text-center py-2">
            <button
              onClick={sendOTP}
              className="buttons btn rounded"
              disabled={countdown > 0 || isSending}
            >
              {isSending
                ? "Sending OTP..."
                : countdown > 0
                ? `Retry in ${countdown}s`
                : "Get OTP"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
