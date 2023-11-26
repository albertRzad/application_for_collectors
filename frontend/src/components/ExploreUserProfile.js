import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "../css/ExploreUserProfile.css";
import { useParams } from "react-router-dom";

const ExploreProfile = () => {
  const [bio, setBio] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [country, setCountry] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");

  const { userEmail } = useParams();


  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/user:${userEmail}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const userData = response.data;

      setBio(userData.bio);
      setNewName(userData.name);
      setNewSurname(userData.surname);
      setCountry(userData.country);
      setProfileImagePath(userData.profileImage || "/images/defaultProfileImage.png");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userEmail]);

  return (
    <div className="Profile">
      <div className="ProfileTitle">Profile</div>

      <div className="profileContainer">
        <div className="profile__info">
      
            <img
              src={"/images/defaultProfileImage.png"}
              alt="Profile"
              className="profile__image"
            />
        
          <div className="profile__info__item" id="bio">
            <span className="info__label">Bio:</span>
            <span className="info__content">{bio}</span>
          </div>

          <div className="profile__info__item" id="name">
            <span className="info__label">Name:</span>
            <span className="info__content">{newName}</span>
          </div>

          <div className="profile__info__item" id="surname">
            <span className="info__label">Surname:</span>
            <span className="info__content">{newSurname}</span>
          </div>

          <div className="profile__info__item" id="country">
            <span className="info__label">Country:</span>
            <span className="info__content">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProfile;
