import NavbarForNotLoggedUser from './components/NavbarForNotLoggedUser';
import NavbarForLoggedUser from './components/NavbarForLoggedUser';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';

function App() {
  return (
   <Router>
       <Routes>
            <Route path="/" element={<NavbarForNotLoggedUser />}></Route>
            <Route path="/home" element={<><NavbarForNotLoggedUser /> <div></div></>}></Route>
            <Route path="/samples" element={<><NavbarForNotLoggedUser /></>}></Route>
            <Route path="/about" element={<><NavbarForNotLoggedUser /></>}></Route>
            <Route path="/login" element={<><NavbarForNotLoggedUser /></>}></Route>
            <Route path="/register" element={<>
              <NavbarForNotLoggedUser />
              <RegistrationForm />
              <Footer />
             </>}>
            </Route>
        </Routes>
   </Router>
  );
}

export default App;
