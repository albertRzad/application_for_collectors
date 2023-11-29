import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "../css/ExploreUserProfile.css";
import UserProfileCollections from "./collections/UserProfileCollections";

const ExploreProfile = () => {
  const [bio, setBio] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [country, setCountry] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");
  const [userCollections, setUserCollections] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const extractUserEmail = () => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const exploreUserProfileIndex = parts.indexOf("exploreUserProfile");

    if (
      exploreUserProfileIndex !== -1 &&
      exploreUserProfileIndex < parts.length - 1
    ) {
      const extractedOwnerEmail = parts[exploreUserProfileIndex + 1];
      setUserEmail(extractedOwnerEmail);
    }
  };

  useEffect(() => {
    extractUserEmail();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (userEmail) {
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
          setProfileImagePath(
            userData.profileImage || "/images/defaultProfileImage.png"
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/getUserCollections:${userEmail}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setUserCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, [userEmail]);

  return (
    <>
      <div className="userProfileContainer">
        <div className="Profile">
          <div className="ProfileTitle">Profile</div>

          <div className="profileContainer">
            <div className="profile__info">
              <img
                src={profileImagePath}
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
        <div className="userProfileCollections">
          <UserProfileCollections collections={userCollections} />
        </div>
      </div>
    </>
  );
};

export default ExploreProfile;
