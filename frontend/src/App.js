import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import CollectionDetails from "./components/collections/CollectionDetails";
import ExploreCollections from "./components/exploreCollections/views/ExploreCollections";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/forms/views/LoginForm";
import RegistrationForm from "./components/forms/views/RegistrationForm";
import NavbarForLoggedUser from "./components/navbars/views/NavbarForLoggedUser";
import NavbarForNotLoggedUser from "./components/navbars/views/NavbarForNotLoggedUser";

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
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/home"
            element={
              <>
                <NavbarForNotLoggedUser />
                <main>
                  <Home />
                </main>
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
                <main>
                  <About />
                </main>
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <>
                <NavbarForNotLoggedUser />
                <main>
                  <LoginForm />
                </main>
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/register"
            element={
              <>
                <NavbarForNotLoggedUser />
                <main>
                  <RegistrationForm />
                </main>
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
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/home"
            element={
              <>
                <NavbarForLoggedUser />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/exploreCollections"
            element={
              <>
                <NavbarForLoggedUser />
                <ExploreCollections />
              </>
            }
          ></Route>

          <Route
            path="/collection/:id"
            element={
              <>
                <NavbarForLoggedUser />
                <CollectionDetails />
              </>
            }
          ></Route>

          {/* <Route
            path="/userProfile"
            element={
              <>
                <main>
                  <UserProfile />
                </main>
              </>
            }
          ></Route> */}

          <Route
            path="/user/:activepage"
            element={
              <>
                <main>
                  <UserProfile />
                </main>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
