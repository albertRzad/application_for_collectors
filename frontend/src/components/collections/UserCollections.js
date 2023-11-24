import React from "react";

class CollectionList extends React.Component {
  render() {
    const { collections, deleteCollection } = this.props;
    
    return (
      <div>
        {collections.map((collection, index) => (
          <div key={index} className="collection">
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
            <button onClick={() => deleteCollection(collection._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default CollectionList;

