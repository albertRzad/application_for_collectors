import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../UserProfile/css/CollectionDetails.css";

const ExploreCollectionDetails = () => {
  const [exhibits, setExhibits] = useState([]);
  const { id } = useParams();
  const [sellerEmail, setSellerEmail] = useState("");
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [isExchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [collectionName, setcollectionName] = useState("");
  const [allUserExhibits, setAllUserExhibits] = useState([]);
  const [exhibitNames, setExhibitNames] = useState([]);

  useEffect(() => {
    const fetchExhibitsForUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("email");

        const response = await axios.get(
          `http://localhost:3000/findAllExhibitsForUser:${userEmail}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.status === 200) {
          setAllUserExhibits(response.data);
          const names = response.data.map((exhibit) => exhibit.name);
          setExhibitNames(names);
        } else {
          console.error("Error fetching exhibits for user");
        }
      } catch (error) {
        console.error("Error fetching exhibits for user", error);
      }
    };
    fetchExhibitsForUser();
  }, []);

  const [purchaseOfferformData, setPurchaseOfferFormData] = useState({
    buyerEmail: localStorage.getItem("email"),
    sellerEmail: sellerEmail,
    price: "",
    message: "",
    exhibitId: "",
  });

  const [exchangeOfferFormData, setExchangeOfferFormData] = useState({
    buyerEmail: localStorage.getItem("email"),
    sellerEmail: sellerEmail,
    offeredExhibitId: "",
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

  const openExchangeModal = () => {
    setExchangeModalOpen(true);
  };

  const closeExchangeModal = () => {
    setExchangeModalOpen(false);
    fetchExhibits();
  };

  const handleChange = (e) => {
    setPurchaseOfferFormData({
      ...purchaseOfferformData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExchangeFormChange = (e) => {
    const selectedExhibitName = e.target.value;
    const selectedExhibit = allUserExhibits.find(
      (exhibit) => exhibit.name === selectedExhibitName
    );

    setExchangeOfferFormData({
      ...exchangeOfferFormData,
      offeredExhibitId: selectedExhibit?._id || "",
      [e.target.name]: selectedExhibitName,
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

  const submitExchangeOffer = async (sellerEmail, exhibitId) => {
    const token = localStorage.getItem("token");
    const buyerEmail = localStorage.getItem("email");

    const offerData = {
      ...exchangeOfferFormData,
      buyerEmail: buyerEmail,
      sellerEmail: sellerEmail,
      exhibitId: exhibitId,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/exchangeOfferForm`,
        offerData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        closeExchangeModal();
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

  const handleExchangeOfferSubmit = async (e) => {
    e.preventDefault();
    const exhibitId = localStorage.getItem("currentExhibitId");
    const sellerEmail = await fetchSellerEmail(exhibitId);
    if (sellerEmail) {
      await submitExchangeOffer(sellerEmail, exhibitId);
    } else {
    }
  };

  const handleOpenBuyOfferForm = async (exhibitId) => {
    localStorage.setItem("currentExhibitId", exhibitId);
    openPurchaseModal();
    console.log("Sending Buy Offer for Collection ID:", exhibitId);
  };

  const handleOpenExchangeOfferForm = async (exhibitId) => {
    localStorage.setItem("currentExhibitId", exhibitId);
    openExchangeModal();
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
      setcollectionName(response.data.collectionName);
      setExhibits(response.data.exhibits);
    } catch (error) {
      console.error("Error fetching collection details:", error);
    }
  };

  const renderOfferButton = (toSold, exhibitId) => {
    switch (toSold) {
      case "Yes":
        return (
          <button
            className="exhibitsOfferButton"
            onClick={() => handleOpenBuyOfferForm(exhibitId)}
          >
            Send Buy Offer
          </button>
        );
      case "To exchange":
        return (
          <button
            className="exhibitsOfferButton"
            onClick={() => handleOpenExchangeOfferForm(exhibitId)}
          >
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
      <div className="exhibitsBody">
        <div className="exhibitsContainer">
          <div className="CollectionName"> {collectionName} </div>
          <div className="exhibitsItems">
            {exhibits.map((exhibit, index) => (
              <div key={index} className="exhibit">
                <figure
                  className="exhibitImageWrap"
                  data-category={exhibit.type}
                >
                  {exhibit.image === "" || exhibit.image === null ? (
                    ""
                  ) : (
                    <img
                      className="exhibitImage"
                      width={100}
                      alt="exhibitImage"
                      height={100}
                      src={exhibit.image}
                    />
                  )}
                </figure>
                <div className="exhibitItemInfo">
                  <p>Name: {exhibit.name}</p>
                  <p>Description: {exhibit.description}</p>
                  <p>Year: {exhibit.year}</p>
                  <p>State: {exhibit.state}</p>
                </div>
                <div className="exhibitOfferButton">
                  {renderOfferButton(exhibit.toSold, exhibit._id)}
                </div>
              </div>
            ))}
          </div>
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

      {isExchangeModalOpen && (
        <div className="overlay">
          <form className="modal" onSubmit={handleExchangeOfferSubmit}>
            <h2>Send exchange offer</h2>
            <div>
              <select
                className="form__input"
                name="offeredExhibitId"
                onChange={handleExchangeFormChange}
                value={exchangeOfferFormData.offeredExhibitId}
                required
              >
                <option value="" disabled>
                  Select Exhibit
                </option>
                {allUserExhibits.map((exhibit, index) => (
                  <option key={index} value={exhibit._id}>
                    {exhibit.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                className="form__input"
                name="message"
                placeholder="Message"
                onChange={handleExchangeFormChange}
                value={exchangeOfferFormData.message}
                rows={4}
                required
              />
            </div>
            <div>
              <button className="submit-button" type="submit">
                Send
              </button>
              <button className="cancel-button" onClick={closeExchangeModal}>
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
