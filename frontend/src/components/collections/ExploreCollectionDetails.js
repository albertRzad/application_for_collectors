import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../UserProfile/css/Exhibit.css";

const ExploreCollectionDetails = () => {
  const [exhibits, setExhibits] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "get",
          url: `http://localhost:3000/getAllCollectionExhibits:${id}`,
          headers: {
            "x-access-token": token,
          },
        };
        const response = await axios(config);
        setExhibits(response.data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };

    fetchExhibits();
  }, [id]);
 

  return (
    <div>
      <h2>Exhibits</h2>
      <div className="exhibitsContainer">
        {exhibits.map((exhibit, index) => (
          <div key={index} className="exhibit">
            <p>Name: {exhibit.name}</p>
            <p>Description: {exhibit.description}</p>
            <p>Year: {exhibit.year}</p>
            <p>State: {exhibit.state}</p>
            {exhibit.image === "" || exhibit.image === null ? (
              ""
            ) : (
              <img width={100} height={100} src={exhibit.image} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCollectionDetails;
