import { useState } from "react";
import axios from "axios";
import "../css/RegistrationForm.css";

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
        console.log(response);
        if (response.status === 200) {
          console.log(response.status);
          setFormData(initialFormData);
          setShowPopup(true);
          setTimeout(function() {
            window.location.assign("/home");
          }, 1500);
        }
      }).catch((error) => {
        console.error(error);
      });;
  };

  return (
    <>
    <form className="formContainer" onSubmit={handleSubmit}>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
      <div class="form__group">
        <input type="text" class="form__input" name="name" placeholder="Name" onChange={handleChange} value={formData.name}/>
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
         <button type="submit">Register</button>
      </div>
    </form>

{showPopup && (
  <div className="popup">
    <div className="popup-content">
       <b> User successfully registered. </b>
        <br></br>
        <b>Redirecting to home page. </b>
    </div>
  </div>
)}

</>

  );
};

export default Registration;
