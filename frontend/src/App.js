import NavbarForNotLoggedUser from "./components/NavbarForNotLoggedUser";
import NavbarForLoggedUser from "./components/NavbarForLoggedUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import About from "./components/About";
import ExploreCollections from "./components/ExploreCollections";
import CollectionDetails from "./components/collections/CollectionDetails";


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
