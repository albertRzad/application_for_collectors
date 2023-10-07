import NavbarForNotLoggedUser from "./components/NavbarForNotLoggedUser";
import NavbarForLoggedUser from "./components/NavbarForLoggedUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  if (localStorage.getItem("token") == null) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarForNotLoggedUser />
                <Home />
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/home"
            element={
              <>
                <NavbarForNotLoggedUser />
                <Home />
                <Footer />
              </>
            }
          ></Route>

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
          ></Route>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarForLoggedUser />
                <Home />
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/home"
            element={
              <>
                <NavbarForLoggedUser />
                <Home />
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/myCollections"
            element={
              <>
                <NavbarForLoggedUser />
              </>
            }
          ></Route>

          <Route
            path="/exploreCollections"
            element={
              <>
                <NavbarForLoggedUser />
              </>
            }
          ></Route>

          <Route
            path="/userProfile"
            element={
              <>
                <NavbarForLoggedUser />
                <LoginForm />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
