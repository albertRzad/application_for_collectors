import NavbarForNotLoggedUser from "./components/NavbarForNotLoggedUser";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Cards from "./components/Cards";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
        <NavbarForNotLoggedUser />
        }>

        </Route>

        <Route
          path="/home"
          element={
            <>
              <NavbarForNotLoggedUser />
              <Home />
              <Footer /> 
              
            </>
          }>
        
        </Route>

        <Route
          path="/samples"
          element={
            <>
              <NavbarForNotLoggedUser />
            </>
          }
        ></Route>

        <Route
          path="/about"
          element={
            <>
              <NavbarForNotLoggedUser />
            </>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <>
              <NavbarForNotLoggedUser />
              <LoginForm />
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="/register"
          element={
            <>
              <NavbarForNotLoggedUser />
              <RegistrationForm />
              <Footer />
            </>
          }
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
