import React, { Component } from "react";

class AllCollections extends Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/exploreCollection/${collectionId}`;
  };

  handleVisitUserProfile = (ownerEmail) => {
    window.location.href = `http://localhost:3001/exploreUserProfile/${ownerEmail}`;
  };

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
          </div>
        ))}
      </div>
    );
  }
}

export default AllCollections;
