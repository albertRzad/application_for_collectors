import { useState } from "react";
import axios from "axios";
import "./css/Popup.css";
import "./css/Form.css";

const Registration = () => {
  const initialFormData = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/registerForm", formData)
      .then((response) => {
        if (response.status === 200) {
          setFormData(initialFormData);
          setShowPopup(true);
          setTimeout(function() {
            window.location.assign("/login");
          }, 1500);
        }
      }).catch((error) => {
        console.error(error);
      });;
  };

  return (
    <>
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="shapeRegister">
    <div className = "FormTitle">Register</div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
      <div className="form__group">
        <input type="text" className="form__input" name="name" placeholder="Name" onChange={handleChange} value={formData.name}/>
        <input
          type="text"
          className="form__input"
          name="surname"
          placeholder="Surname"
          onChange={handleChange}
          value={formData.surname}
        />
        <input
          type="email"
          className="form__input"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="tel"
          className="form__input"
          name="phoneNumber"
          placeholder="Phone number"
          onChange={handleChange}
          value={formData.phoneNumber}
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
         <a href="/login">Already have an account? Login</a>
        </div>
          <div>
            <button class="but">Sign up</button>
          </div>
        </div>
      </div>
      </div>
    </form>

{showPopup && (
  <div className="popup">
    <div className="popup-content">
       <b> User successfully registered. </b>
        <br></br>
        <b>Redirecting to login page. </b>
    </div>
  </div>
)}

</>

  );
};

export default Registration;
