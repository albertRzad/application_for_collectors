import React, { Component } from "react";
import axios from "axios";

class AllCollections extends Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/exploreCollection/${collectionId}`;
  };

  handleVisitUserProfile = (ownerEmail) => {
    window.location.href = `http://localhost:3001/exploreUserProfile/${ownerEmail}`;
  };

  handleLikesIncrement = (collectionId) => {
    const token = localStorage.getItem("token");
    const config = {
      method: "put",
      url: `http://localhost:3000/collection/likes:${collectionId}`,
      headers: {
        "x-access-token": token,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { collections } = this.props;

    return (
      <div className="collectionContainers">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="collection"
          >
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
            <p>Owner: {collection.ownerEmail}</p>
            <p>Likes: {collection.likes}</p>
            {collection.image === "" || collection.image === null ? (
              ""
            ) : (
              <img width={100} height={100} src={collection.image} />
            )}
             <button
              onClick={() => this.handleVisitUserProfile(collection.ownerEmail)}
            >
              Visit User Profile
            </button>
            <button
              onClick={() => this.handleCollectionClick(collection._id)}
            >
              View Collection
            </button>
            <button
              onClick={() => this.handleLikesIncrement(collection._id)}
            >
              Like
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default AllCollections;
