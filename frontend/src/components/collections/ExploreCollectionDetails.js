import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../UserProfile/css/Exhibit.css";

const ExploreCollectionDetails = () => {
  const [exhibits, setExhibits] = useState([]);
  const { id } = useParams();
  const [sellerEmail, setSellerEmail] = useState("");
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const [purchaseOfferformData, setPurchaseOfferFormData] = useState({
    buyerEmail: localStorage.getItem("email"),
    sellerEmail: sellerEmail,
    price: "",
    message: "",
    exhibitId: "",
  });

  const openPurchaseModal = () => {
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
    fetchExhibits();
  };

  const handleChange = (e) => {
    setPurchaseOfferFormData({
      ...purchaseOfferformData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSellerEmail = async (exhibitId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/findCollectionOwnerByExhibitId:${exhibitId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      setSellerEmail(response.data.ownerEmail);
      return response.data.ownerEmail;
    } catch (error) {
      console.error("Error fetching seller's email:", error);
      return null;
    }
  };

  const submitPurchaseOffer = async (sellerEmail, exhibitId) => {
    const token = localStorage.getItem("token");
    const buyerEmail = localStorage.getItem("email");

    const offerData = {
      ...purchaseOfferformData,
      buyerEmail: buyerEmail,
      sellerEmail: sellerEmail,
      exhibitId: exhibitId,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/purchaseOfferForm`,
        offerData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        closePurchaseModal();
      }
    } catch (error) {
      console.error("Error submitting purchase offer:", error);
    }
  };

  const handlePurchaseOfferSubmit = async (e) => {
    e.preventDefault();
    const exhibitId = localStorage.getItem("currentExhibitId");
    const sellerEmail = await fetchSellerEmail(exhibitId);
    if (sellerEmail) {
      await submitPurchaseOffer(sellerEmail, exhibitId);
    } else {
    }
  };

  const handleOpenBuyOfferForm = async (exhibitId) => {
    localStorage.setItem("currentExhibitId", exhibitId);
    openPurchaseModal();
    console.log("Sending Buy Offer for Collection ID:", exhibitId);
  };

  const handleOpenExchangeOfferForm = async (exhibitId) => {
    console.log("Sending Exchange Offer for Collection ID:", exhibitId);
  };

  const fetchExhibits = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: `http://localhost:3000/getAllCollectionExhibits:${id}`,
        headers: {
          "x-access-token": token,
        },
      };
      const response = await axios(config);
      setExhibits(response.data);
    } catch (error) {
      console.error("Error fetching collection details:", error);
    }
  };

  const renderOfferButton = (toSold, exhibitId) => {
    switch (toSold) {
      case "Yes":
        return (
          <button onClick={() => handleOpenBuyOfferForm(exhibitId)}>
            Send Buy Offer
          </button>
        );
      case "To exchange":
        return (
          <button onClick={() => handleOpenExchangeOfferForm(exhibitId)}>
            Send Exchange Offer
          </button>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, []);

  return (
    <>
      <div>
        <h2>Exhibits</h2>
        <div className="exhibitsContainer">
          {exhibits.map((exhibit, index) => (
            <div key={index} className="exhibit">
              <p>Name: {exhibit.name}</p>
              <p>Description: {exhibit.description}</p>
              <p>Year: {exhibit.year}</p>
              <p>State: {exhibit.state}</p>
              {exhibit.image === "" || exhibit.image === null ? (
                ""
              ) : (
                <img width={100} height={100} src={exhibit.image} />
              )}
              {renderOfferButton(exhibit.toSold, exhibit._id)}
            </div>
          ))}
        </div>
      </div>
      {isPurchaseModalOpen && (
        <div className="overlay">
          <form className="modal" onSubmit={handlePurchaseOfferSubmit}>
            <h2>Send buy offer</h2>
            <div>
              <input
                type="text"
                className="form__input"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                value={purchaseOfferformData.price}
                required
              />
            </div>
            <div>
              <textarea
                className="form__input"
                name="message"
                placeholder="Message"
                onChange={handleChange}
                value={purchaseOfferformData.message}
                rows={4}
                required
              />
            </div>
            <div>
              <button className="submit-button" type="submit">
                Send
              </button>
              <button className="cancel-button" onClick={closePurchaseModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ExploreCollectionDetails;
