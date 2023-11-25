import React from "react";


class CollectionList extends React.Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/collection/${collectionId}`;
  };

  render() {
    const { collections, deleteCollection, setUserCollections} = this.props;

    const deleteCollectionHandler = async (collectionId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this collection?"
      );
      if (confirmDelete) {
        await deleteCollection(collectionId);
        const updatedCollections = collections.filter(
          (collection) => collection._id !== collectionId
        );
        setUserCollections(updatedCollections);
      }
    };

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
                deleteCollectionHandler(collection._id);
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
