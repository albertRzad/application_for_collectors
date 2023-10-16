import { useState } from "react";
import axios from "axios";
import "../css/LoginForm.css";
import "../css/Button.css";

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
          alert('Success');
          window.location.assign("/home");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email",formData.email)
          setFormData(initialFormData);
        }
      }).catch((error) => {
        console.error(error);
      });;
  };

  return (
    
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className = "FormTitle">Login</div>
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
          <div>
            <button class="but">Login</button>
          </div>
        </div>
         
      </div>
    </form>
  );
};

export default Login;
