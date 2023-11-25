import React from "react";

class CollectionList extends React.Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/collection/${collectionId}`;
  };

  render() {
    const { collections, deleteCollection } = this.props;

    return (
      <div>
        {collections.map((collection, index) => (
          <div
            key={index}
            className="collection"
            onClick={() => this.handleCollectionClick(collection._id)}
          >
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
            {collection.image === "" || collection.image === null ? (
          ""
        ) : (
          <img width={100} height={100} src={collection.image} />
        )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteCollection(collection._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default CollectionList;
