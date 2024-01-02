import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/offers.css";

const Offers = () => {
  const [purchaseOffers, setPurchaseOffers] = useState([]);
  const [exchangeOffers, setExchangeOffers] = useState([]);
  const [renderedPurchaseOffers, setRenderedPurchaseOffers] = useState([]);
  const [renderedExchangeOffers, setRenderedExchangeOffers] = useState([]);


  useEffect(() => {
    const fetchPurchaseOffers = async () => {
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
        setPurchaseOffers(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchPurchaseOffers();
  }, []);

  useEffect(() => {
    const fetchExchangeOffers = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        const config = {
          method: "get",
          url: `http://localhost:3000/exchangeOffersBySeller:${email}`,
          headers: {
            "x-access-token": token,
          },
        };

        const response = await axios(config);
        setExchangeOffers(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchExchangeOffers();
  }, []);

  useEffect(() => {
    
  }, 
  []);

  const fetchUserDetails = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `http://localhost:3000/user:${email}`,
        headers: {
          "x-access-token": token,
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const fetchExhibitDetails = async (exhibitId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `http://localhost:3000/exhibit:${exhibitId}`,
        headers: {
          "x-access-token": token,
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error fetching exhibit details:", error);
      return null;
    }
  };

  useEffect(() => {
    const renderPurchaseOffers = async () => {
      const offers = await Promise.all(
        purchaseOffers.map(async (offer, index) => {
          const buyerDetails = await fetchUserDetails(offer.buyerEmail);
          const exhibitDetails = await fetchExhibitDetails(offer.exhibitId);

          return (
            <div key={index} className="offer">
              <p>Buyer Name: {buyerDetails ? `${buyerDetails.name} ${buyerDetails.surname}` : 'N/A'}</p>
              <p>Exhibit Name: {exhibitDetails ? exhibitDetails.name : 'N/A'}</p>
              <img className="exhibitImage" width={100} height={100} src={exhibitDetails.image} />
              <p>Price: {offer.price}</p>
              <p>Message: {offer.message}</p>
            </div>
          );
        })
      );

      setRenderedPurchaseOffers(offers);
    };

    renderPurchaseOffers();
  }, [purchaseOffers]);

  useEffect(() => {
    const renderExchangeOffers = async () => {
      const offers = await Promise.all(
        exchangeOffers.map(async (offer, index) => {
          const buyerDetails = await fetchUserDetails(offer.buyerEmail);
          const exhibitDetails = await fetchExhibitDetails(offer.offeredExhibitId);

          return (
            <div key={index} className="offer">
              <p>Buyer Name: {buyerDetails ? `${buyerDetails.name} ${buyerDetails.surname}` : 'N/A'}</p>
              <p>Exhibit Name: {exhibitDetails ? exhibitDetails.name : 'N/A'}</p>
              <img className="exhibitImage" width={100} height={100} src={exhibitDetails.image} />
              <p>Message: {offer.message}</p>
            </div>
          );
        })
      );

      setRenderedExchangeOffers(offers);
    };

    renderExchangeOffers();
  }, [exchangeOffers]);


  return (
    <div className="offersBody">
      <div className="purchaseOffersContainer">
      <div className="offers-container">
      <div className="offersLabel">Purchase offers:</div>
        {purchaseOffers.length > 0 ? (
          purchaseOffers.map((offer, index) => (
            <div key={index} className="offer">
              <p>Buyer Email: {offer.buyerEmail}</p>
              {/* <p>Seller Email: {offer.sellerEmail}</p> */}
              <p>Price: {offer.price}</p>
              <p>Message: {offer.message}</p>
            </div>
          ))
        ) : (
          <p>No purchase offers available.</p>
        )}
      </div>
      </div>
      <div className="exchangeOffersContainer">
      <div className="offers-container">
      <div className="offersLabel">Exchange offers:</div>
        {exchangeOffers.length > 0 ? (
          exchangeOffers.map((offer, index) => (
            <div key={index} className="offer">
              <p>Buyer Email: {offer.buyerEmail}</p>
              {/* <p>Seller Email: {offer.sellerEmail}</p> */}
              <p>Offered exhibit id: {offer.offeredExhibitId}</p>
              <p>Message: {offer.message}</p>
            </div>
          ))
        ) : (
          <p>No exchange offers available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Offers;
