import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AllCollections from "./AllCollections";
import "./css/ExploreCollections.css";
const ExploreCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const config = {
        method: "get",
        url: `http://localhost:3000/getAllCollectionsExceptUser:${email}`,
        headers: {
          "x-access-token": token,
        },
      };

      const response = await axios(config);
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <div>
      <h2>All Collections</h2>
      <div className="collectionsContainer">
        <AllCollections
          collections={collections}
          fetchCollections={fetchCollections}
        />
      </div>
    </div>
  );
};

export default ExploreCollections;
