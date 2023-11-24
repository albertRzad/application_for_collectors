import React from 'react'
import { useState, useEffect } from 'react';
import "./css/CollectionForm.css";
import axios from "axios";
import UserCollections from  "../collections/UserCollections"

const MyCollections = () => {

    const initialFormData = {
        name: "",
        type: "",
        description: "",
        email: localStorage.getItem("email")
      };
    
      const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        email: localStorage.getItem("email")
      });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userCollections, setUserCollections] = useState([]);

    useEffect(() => {
        fetchCollections();
    }, []);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload()
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const config = {
          method: "post",
          url: "http://localhost:3000/collectionForm",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          data: formData
        };
            
             axios(config)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log(response.status);
              setFormData(initialFormData);
              closeModal();
            }
          }).catch((error) => {
            console.error(error);
          });;
      };

      const fetchCollections = async () => {
        try {
          const token = localStorage.getItem("token");
          const email = localStorage.getItem("email");

          const response = await axios.get(
            `http://localhost:3000/getUserCollections:${email}`,
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          setUserCollections(response.data);
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
    };

    const deleteCollection = async (collectionId) => {
      try {
        const token = localStorage.getItem("token");
    
        const response = await axios.delete(
          `http://localhost:3000/collection/delete:${collectionId}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (response.status === 200) {

          const updatedCollections = userCollections.filter(collection => collection._id !== collectionId);
          setUserCollections(updatedCollections);
        }
      } catch (error) {
        console.error("Error deleting collection:", error);
      }
    };

    return (
      <div className="myCollectionsContener">
      <div className="ProfileTitle">
        My Collections
        <button className="createButton" onClick={openModal}>Create new collection</button>
        <div className='userCollections'>
          <UserCollections collections={userCollections} deleteCollection={deleteCollection} />
        </div>
      </div>

        {isModalOpen && (
  <div className="overlay">
    <form className="modal" onSubmit={handleSubmit}>
      <h2>Create new collection</h2>
      <div>
        <input
          type="text"
          className="form__input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div>
        <select
          className="form__input"
          name="type"
          onChange={handleChange}
          value={formData.type}
          required
        >
          <option value="">Type</option>
          <option value="Coins">Coins</option>
          <option value="Stamps">Stamps</option>
          <option value="Pictures">Pictures</option>
          <option value="Sculptures">Sculptures</option>
          <option value="Postcards">Postcards</option>
          <option value="Banknotes">Banknotes</option>
          <option value="Figurines">Figurines</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <textarea
          className="form__input"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          rows={4}
          required
        />
      </div>
      <div>
        <button className="submit-button" type="submit">
          Dodaj
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Anuluj
        </button>
      </div>
    </form>
  </div>
)}
      </div>
    );
}

export default MyCollections