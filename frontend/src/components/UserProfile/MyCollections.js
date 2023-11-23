import React from 'react'
import { useState } from 'react';
import "./css/CollectionForm.css";
import axios from "axios";

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

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
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

    return (
      <div className="myCollectionsContener">
        <div className="ProfileTitle">
          My Collections
          <button className="createButton" onClick={openModal}>
            Create new collection
          </button>
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