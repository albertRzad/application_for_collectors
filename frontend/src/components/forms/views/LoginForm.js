import axios from "axios";
import { useState } from "react";
import "../css/Button.css";
import "../css/Form.css";
import "../css/Popup.css";

const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/loginForm", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.token);
          console.log(res.status);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", formData.email);
          setFormData(initialFormData);
          setShowPopup(true);
          setTimeout(function () {
            window.location.assign("/home");
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="shapeLogin">
          <div className="FormTitle">Login</div>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <div className="form__group">
            <input
              type="email"
              className="form__input"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              className="form__input"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />

            <div class="container">
              <div className="formMessage">
                <a href="/register">Don't have an account yet? Register</a>
              </div>
              <div>
                <button class="but">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <b> User successfully logged in. </b>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
