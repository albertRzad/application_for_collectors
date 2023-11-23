import React from "react";

class CollectionList extends React.Component {
  render() {
    const { collections } = this.props;

    return (
      <div>
        {collections.map((collection, index) => (
          <div key={index} className="collection">
            <p>Name: {collection.name}</p>
            <p>Type: {collection.type}</p>
            <p>Description: {collection.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default CollectionList;
