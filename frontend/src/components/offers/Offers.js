
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import "./css/offers.css";
 
 const Offers = () => {
   const [purchaseOffers, setPurchaseOffers] = useState([]);
   const [exchangeOffers, setExchangeOffers] = useState([]);
 const [exhibit, setExhibit] = useState([]);
  const [user, setUser] = useState([]);
 
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

   return (
     <div className="offersBody">
       <div className="purchaseOffersContainer">
       <div className="offers-container">
       <div className="offersLabel">Purchase offers:</div>
         {purchaseOffers.length > 0 ? (
           purchaseOffers.map((offer, index) => (
             <div key={index} className="offer">
             <p>Buyer Email: {offer.buyerEmail}</p>
              <p>Offer from: {offer.buyerEmail}</p>
               {/* <p>Seller Email: {offer.sellerEmail}</p> */}
              <p>Exhibit: {offer.exhibitId}</p>
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
              <p>Offer from: {offer.buyerEmail}</p>
              <p>Exhibit: {offer.exhibitId}</p>
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
