import React, { useState, useEffect } from "react";
import { useLoginC } from "../../hooks/useLoginC";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "../../hooks/useLogin";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { adminlogin, error, isLoading } = useLoginC();
  const { userlogin } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch users");
        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.adminType));
  }, [users]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      toast.error("input username");
    }
    if (email === "") {
      toast.error("input email");
    }
    if (password === "") {
      toast.error("input password");
    }
    const currentUser = filteredUsers.find(
      (user) => user.username === username && user.email === email
    );

    if (currentUser) {
      try {
        if (currentUser.adminType === "ComplaintAdmin") {
          await adminlogin(username, email, password);
          navigate("/");
        } else if (currentUser.adminType === "FeedbackAdmin") {
          await userlogin(username, email, password);
          navigate("/");
        }
      } catch (error) {
        toast.error("Login failed.");
      }
    } else {
      toast.error("User not found check your inputs.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="bg-image">
      <div className="container">
        <ToastContainer className="d-flex justify-content-center align-items-center" />
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container mx-auto">
              <div className="row d-flex justify-content-center align-items-center h-100 ">
                <div
                  className="card"
                  style={{
                    backgroundColor: "rgb(239, 243, 244)",
                    border: "1px solid",
                    borderRadius: "15px",
                    marginTop: "28px",
                    marginBottom: "30px",
                    width: "330px",
                    height: "420px",
                  }}
                >
                  <div className="card-body py-4 vw-auto">
                    <h4 style={{ textAlign: "center", borderRadius: "5px" }}>
                      Admin
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
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="typePasswordX-2"
                          placeholder="Password*"
                          className="form-control form-control-md"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                      <button
                        className="btn"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>
                    </div>
                    {isLoading ? (
                      <p>Please wait...</p>
                    ) : (
                      <button className="btn btn-success btn-md btn-block">
                        Login
                      </button>
                    )}
                    <div className="form-check d-flex justify-content-start mb-4">
                      {error && (
                        <div className="login-error text-danger">{error}</div>
                      )}
                    </div>
                    <hr className="my-1 " />
                    <Link
                      className="btn text-info forgot ms-2"
                      to="/usernamelogin"
                    >
                      Forgot password?
                    </Link>
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

export default AdminLogin;
