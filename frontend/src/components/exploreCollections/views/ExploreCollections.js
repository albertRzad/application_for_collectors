import axios from "axios";
import React, { useEffect, useState } from "react";
import AllCollections from "../../collections/AllCollections";
import "../css/ExploreCollections.css";
const ExploreCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/getAllCollections",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <div>
      <h2>All Collections</h2>
      <div className="collectionsContainer">
        <AllCollections collections={collections} />
      </div>
    </div>
  );
};

export default ExploreCollections;
