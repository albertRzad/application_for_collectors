import React from "react";
import "../UserProfile/css/CollectionForm.css";
import {Link } from "react-router-dom";

class CollectionList extends React.Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/collection/${collectionId}`;
  };

  render() {
    const { collections, deleteCollection, setUserCollections } = this.props;
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
      <div className="collection__wrapper">
        {collections.map((collection, index) => (
          <div key={index} className="collection__item">
            <Link to = {`/collection/${collection._id}`}>
            <figure className="collection__image__wrap" data-category={collection.type}>
            {collection.image === "" || collections.image === null ? (
              ""
            ) : (
              <img className="collection__image" width={100} height={100} src={collection.image} />
            )}
            </figure>
            </Link>
            <div className="collection__item__info">
            <p> {collection.name}</p>
            <div className="collection__item__button">
            <button className="delete__button"
              onClick={(e) => {
                e.stopPropagation();
                deleteCollectionHandler(collection._id);
              }}
            >
              Delete Collection
            </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CollectionList;
