 import './login.css'
 import './Mint.jpg'

function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="stylesheet" href="login.css" />
      <link rel="icon" type="image/png" href="Mint.jpg" />

      <div className="container">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <form className="form">
              <label htmlFor="chk" aria-hidden="true">
                Log in
              </label>
              <input className="input" type="email" name="email" placeholder="Email" required />
              <input className="input" type="password" name="pswd" placeholder="Password" required />
              <button>Log in</button>
            </form>
          </div>

          <div className="register">
            <form className="form">
              <label htmlFor="chk" aria-hidden="true">
                Register
              </label>
              <input className="input" type="text" name="txt" placeholder="Username" required />
              <input className="input" type="email" name="email" placeholder="Email" required />
              <input className="input" type="password" name="pswd" placeholder="Password" required />
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="container1">
          <div className="footer-col">
            <h2>Logo</h2>
            <img className="footer-para" src="Mint.jpg" width="150" alt="logo of Mint" />
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

            <p className="email">info@mint.gov.et</p>
            <p className="phone">011 126 5737</p>
          </div>
          <div className="footer-col">
            <h3>
              Menu
              <div className="underline">
                <span></span>
              </div>
            </h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>
              Newsletter
              <div className="underline">
                <span></span>
              </div>
            </h3>
            <form action="">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" placeholder="Enter Company Email" />
              <a href="">
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </form>
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

export default App;