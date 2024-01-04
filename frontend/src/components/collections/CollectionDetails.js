import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../UserProfile/css/CollectionDetails.css";

const CollectionDetails = () => {
  const [exhibits, setExhibits] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setcollectionName] = useState("");
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    state: localStorage.getItem("email"),
    image: "",
    collectionId: id,
    toSold: "No",
  });

  const toggleExhibit = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      fetchExhibits();
    }
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
      setcollectionName(response.data.collectionName);
      setExhibits(response.data.exhibits);
    } catch (error) {
      console.error("Error fetching collection details:", error);
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, [id]);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
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
        setShowPopupDelete(true);
        setTimeout(function () {
          setShowPopupDelete(false);
        }, 1500);
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
        if (response.status === 200) {
          toggleExhibit();
          setShowPopupAdd(true);
          setTimeout(function () {
            setShowPopupAdd(false);
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="exhibitsBody">
      <div className="exhibitsContainer">
        <div className="CollectionName"> {collectionName} </div>
        <div className="exhibitsItems">
          {exhibits.map((exhibit, index) => (
            <div key={index} className="exhibit">
              <figure className="exhibitImageWrap" data-category={exhibit.type}>
                {exhibit.image === "" || exhibit.image === null ? (
                  ""
                ) : (
                  <img className="exhibitImage" width={100} height={100} src={exhibit.image} alt="exhibit" />
                )}
              </figure>
              <div className="exhibitItemInfo">
                <p>Name: {exhibit.name}</p>
                <p>Description: {exhibit.description}</p>
                <p>Year: {exhibit.year}</p>
                <p>State: {exhibit.state}</p>
                <div className="exhibitDeleteButton">
                  <button className="delete__button" onClick={() => deleteExhibit(exhibit._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="addExhibitButtonContainer">
          <button className="addExhibitButton" onClick={toggleExhibit}>
            Add new exhibit
          </button>
        </div>
      </div>

      <dialog className="modal" open={isModalOpen}>
        <form className="collectionForm" onSubmit={handleSubmit}>
          <div className='formTitle'>Add new exhibit</div>

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

          <div className='modal__actions'>
            <button className='modal-button' type='submit'>
              Add
            </button>
            <button className='modal-button' onClick={toggleExhibit} type='button'>
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      {showPopupDelete && (
        <div className="popup">
          <div className="popup-content">
            <b> Exhibit has been deleted. </b>
            <br></br>
          </div>
        </div>
      )}

      {showPopupAdd && (
        <div className="popup">
          <div className="popup-content">
            <b> Exhibit has been added. </b>
            <br></br>
          </div>
        </div>
      )}

    </div>
  );
};

export default CollectionDetails;
