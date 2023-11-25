import React from "react";
import { useParams } from "react-router-dom";
import "../css/UserProfile.css";

import AccountSettings from "./UserProfile/AccountSettings";
import Chat from "./UserProfile/Chat";
import MyAuctions from "./UserProfile/MyAuctions";
import MyCollections from "./UserProfile/MyCollections";
import Profile from "./UserProfile/Profile";
import UserSidebar from "./UserSidebar";
import Footer from "./footer/Footer";
import NavbarForLoggedUser from "./navbars/views/NavbarForLoggedUser";

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
