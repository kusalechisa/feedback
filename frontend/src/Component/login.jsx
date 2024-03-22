import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import MintLogo from './Mint.jpg';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // Perform login logic here, e.g., sending a request to the server

    // Assuming login is successful
    history.push('/Home.jsx');
  };

  return (
    <div className="wallbody">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <link rel="icon" type="image/png" href={MintLogo} />

      <div className="container">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <form className="form">
              <label htmlFor="chk" aria-hidden="true">
                Log in
              </label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Log in</button>
            </form>
          </div>

          <div className="register">
            <form className="form">
              <label htmlFor="chk" aria-hidden="true">
                Register
              </label>
              <input
                className="input"
                type="text"
                name="txt"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required
              />
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="container1">
          <div className="footer-col">
            <h2>Logo</h2>
            <img className="footer-para" src={MintLogo} width="150" alt="logo of Mint" />
          </div>

          <div className="footer-col">
            <h3 className="text-office">
              Office
              <div className="underline">
                <span></span>
              </div>
            </h3>
            <p>2QF4+G2G, Arada 1/2</p>
            <p>Addis Abeba, Ethiopia</p>
            <p className="email">
              <a href="https://mint.gov.et" target="_blank" rel="noopener noreferrer">
                Got MInT Website
              </a>
            </p>
            <p className="phone">+25111 126 5737</p>
          </div>

          <div className="footer-col">
            <div className="social-icons">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-google-plus"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;