import { useState } from "react";
import axios from "axios";
import "../css/RegistrationForm.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
     axios.post("http://localhost:3000/loginForm", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.token);
          console.log(res.status);
          setFormData(initialFormData);
          alert('Success');
          window.location.assign("/home");
          localStorage.setItem("token", res.data.token);
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
         <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
