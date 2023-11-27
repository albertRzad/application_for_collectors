import React, { Component } from "react";
import axios from "axios";

class AllCollections extends Component {
  constructor(props) {
    super(props);

    const likedCollections = new Set(JSON.parse(localStorage.getItem('likedCollections') || '[]'));

    this.state = {
      likedCollections,
    };
  }

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
        if (response.status === 200) {
          this.setState((prevState) => {
            const updatedLikedCollections = new Set(prevState.likedCollections.add(collectionId));
            
            localStorage.setItem('likedCollections', JSON.stringify(Array.from(updatedLikedCollections)));

            return { likedCollections: updatedLikedCollections };
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { collections } = this.props;
    const { likedCollections } = this.state;

    return (
      <div className="collectionContainers">
        {collections.map((collection, index) => (
          <div key={index} className="collection">
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
            <p>Owner: {collection.ownerEmail}</p>
            <p>Likes: {collection.likes}</p>
            {collection.image && (
              <img width={100} height={100} src={collection.image} alt="Collection" />
            )}
            <button onClick={() => this.handleVisitUserProfile(collection.ownerEmail)}>
              Visit User Profile
            </button>
            <button onClick={() => this.handleCollectionClick(collection._id)}>
              View Collection
            </button>
            {!likedCollections.has(collection._id) && (
              <button onClick={() => this.handleLikesIncrement(collection._id)}>
                Like
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default AllCollections;
