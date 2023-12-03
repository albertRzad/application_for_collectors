import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../UserProfile/css/Exhibit.css";

const CollectionDetails = () => {
  const [exhibits, setExhibits] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    state: localStorage.getItem("email"),
    image: "",
    collectionId: id,
    toSold: "No",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchExhibits();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  useEffect(() => {
    fetchExhibits();
  }, [id]);

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
      setFormData({ ...formData, image: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: " + error);
    };
  }

  const deleteExhibit = async (exhibitId) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        method: "delete",
        url: `http://localhost:3000/exhibit/delete:${exhibitId}`,
        headers: {
          "x-access-token": token,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        await fetchExhibits();
      }
    } catch (error) {
      console.error("Error deleting exhibit:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      method: "post",
      url: "http://localhost:3000/exhibitForm",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      data: formData,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.status);
          closeModal();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="exhibitsWrapper">
      <div className='ProfileTitle'>Exhibits</div>
      <button className="createButton" onClick={openModal}>
        Add new exhibit
      </button>
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
            <button onClick={() => deleteExhibit(exhibit._id)}>Delete</button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="overlay">
          <form className="modal" onSubmit={handleSubmit}>
            <h2>Add new exhibit</h2>
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
              <input
                type="text"
                className="form__input"
                name="year"
                placeholder="Year"
                onChange={handleChange}
                value={formData.year}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form__input"
                name="state"
                placeholder="State"
                onChange={handleChange}
                value={formData.state}
                required
              />
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
              To sold:
              <select
                className="form__input"
                name="toSold"
                onChange={handleChange}
                value={formData.toSold}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="To exchange">To exchange</option>
              </select>
            </div>

            <div>
              <input
                type="file"
                className="form__input"
                name="image"
                onChange={convertToBase64}
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
};

export default CollectionDetails;
