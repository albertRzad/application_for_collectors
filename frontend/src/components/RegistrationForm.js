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

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/registerForm", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.status);
          setFormData(initialFormData);
          alert('Success');
        }
      }).catch((error) => {
        console.error(error);
      });;
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
      <div class="form__group">
        <input type="text" class="form__input" id="name" placeholder="Name" />
        <input
          type="text"
          className="form__input"
          id="surname"
          placeholder="Surname"
        />
        <input
          type="email"
          className="form__input"
          id="email"
          placeholder="E-mail"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <input
          type="tel"
          className="form__input"
          id="phoneNumber"
          placeholder="Phone number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
        />
        <input
          type="password"
          className="form__input"
          id="password"
          placeholder="Password"
        />
         <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Registration;
