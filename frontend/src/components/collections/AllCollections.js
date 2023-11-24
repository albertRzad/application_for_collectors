import React, { Component } from 'react';

class AllCollections extends Component {
    render(){
      const { collections } = this.props;

      return (
        <div className='collectionContainers'>
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

export default AllCollections;
