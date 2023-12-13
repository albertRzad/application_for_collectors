import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <div key={index} className="collection__item">
            <Link to={`/exploreCollection/${collection._id}`}>
              <figure
                className="collection__image__wrap"
                data-category={collection.type}
              >
                {collection.image === "" || collection.image === null ? (
                  ""
                ) : (
                  <img
                    className="collection__image"
                    width={100}
                    height={100}
                    src={collection.image}
                  />
                )}
              </figure>
            </Link>
            <div className="collection__item__info">
              <p>Name: {collection.name}</p>
              <p>Description: {collection.description}</p>
              <p>Owner: {collection.ownerEmail}</p>
              <div className="exploreCollectionsButtons">
                <button
                  className="visitUserProfileButton"
                  onClick={() =>
                    this.handleVisitUserProfile(collection.ownerEmail)
                  }
                >
                  Visit User Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AllCollections;
