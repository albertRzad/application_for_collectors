import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
        try {
          const token = localStorage.getItem("token");
          const email = localStorage.getItem("email");
    
          const config = {
            method: "get",
            url: `http://localhost:3000/purchaseOffersBySeller:${email}`,
            headers: {
              "x-access-token": token,
            },
          };
    
          const response = await axios(config);
          setOffers(response.data);
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
      };

    fetchOffers();
  }, []);

  return (
    <div className="offers-container">
      {offers.length > 0 ? (
        offers.map((offer, index) => (
          <div key={index} className="offer">
            <p>Buyer Email: {offer.buyerEmail}</p>
            <p>Seller Email: {offer.sellerEmail}</p>
            <p>Price: {offer.price}</p>
            <p>Message: {offer.message}</p>
          </div>
        ))
      ) : (
        <p>No offers available.</p>
      )}
    </div>
  );
};

export default Offers;
