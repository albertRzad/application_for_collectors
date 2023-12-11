import React from "react";
import {Link } from "react-router-dom";
class UserProfileCollections extends React.Component {
  handleCollectionClick = (collectionId) => {
    window.location.href = `http://localhost:3001/exploreCollection/${collectionId}`;
  };

  render() {
    const { collections } = this.props;

    return (
      <div className="collection__wrapper">
        {collections.map((collection, index) => (
          <div key={index} className="collection__item">
            <Link to= {`/exploreCollection/${collection._id}`}>
            <figure className="collection__image__wrap" data-category={collection.type}>
            {collection.image === "" || collection.image === null ? (
              ""
            ) : (
              <img className="collection__image" width={100} height={100} src={collection.image} />
            )} 
            </figure>
            </Link>
            <div className="collection__item__info">
            <p>Name: {collection.name}</p>
            <p>Description: {collection.description}</p>
            <p>Likes: {collection.likes}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserProfileCollections;
