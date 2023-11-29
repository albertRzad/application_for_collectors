import React from "react";
import { useParams } from "react-router-dom";
import "./css/UserProfile.css";

import UserSidebar from "./UserSidebar";
import NavbarForLoggedUser from "../navbars/NavbarForLoggedUser";
import Footer from "../Footer";
import Profile from "./Profile";
import MyCollections from "./MyCollections";
import Chat from "./Chat";
import MyAuctions from "./MyAuctions";
import AccountSettings from "./AccountSettings";

const UserProfile = () => {
  const { activepage } = useParams();
  return (
    <>
      <div className="userprofile">
        <NavbarForLoggedUser />
        {/* <UserSidebar /> */}
        <div className="userprofilein">
          <div className="userprofileleft">
            {<UserSidebar activepage={activepage} />}
          </div>

          {
            <div className="userprofileright">
              {activepage === "accountsettings" && <AccountSettings />}
              {activepage === "profile" && <Profile />}
              {activepage === "mycollections" && <MyCollections />}
              {activepage === "chats" && <Chat />}
              {activepage === "myauctions" && <MyAuctions />}
            </div>
          }
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
