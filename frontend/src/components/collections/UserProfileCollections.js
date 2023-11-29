import React from "react";

class UserProfileCollections extends React.Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/exploreCollection/${collectionId}`;
  };

  render() {
    const {collections} = this.props;

    return (
      <div className="collections">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="collection"
          >
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
            <p>Likes: {collection.likes}</p>
            {collection.image === "" || collection.image === null ? (
              ""
            ) : (
              <img width={100} height={100} src={collection.image} />
            )}
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

export default UserProfileCollections;
