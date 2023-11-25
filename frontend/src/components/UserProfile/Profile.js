import React from 'react';
import  { useState, useEffect } from 'react';
import "./Profile.css"
import '../forms/css/Form.css';


const Profile = () => {

    const [newName , setNewName] = useState('');
    const [newSurname, setNewSurname] = useState('');
    const [country, setCountry] = useState('');
    const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || '');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle the submission of the form, such as validating the input and updating the user's account settings
      };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setAvatar(e.target.result);
                localStorage.setItem('userAvatar', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Proszę wybrać plik obrazu typu JPEG lub PNG.');
        }
    };


    
    return (

        <div className='Profile'>
        <div className='ProfileTitle'>Profile</div>
        <form className='formContainer' onSubmit={handleSubmit}>
            <div className='form__profile'> 
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            

            <div className="avatar-preview" style={{ backgroundImage: `url(${avatar})` }} 
            onClick={() => document.getElementById('avatarInput').click()}>
                {!avatar && <div className="avatar-placeholder">Avatar</div>}
                <i className="fa fa-upload avatar-upload-icon" ></i> 
                
            </div>


            <div id='dodawanie>'>
            <input
                id="avatarInput"
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
                style={{ display: 'none' }}
            />
            
            </div>
            
            <label className='form__input__label ' id="bio">
                Bio:
                <textarea className="bio__input" value={bio} onChange={(e) => setBio(e.target.value)}/>
                </label>

            <button type="submit" id="button_save1">Save Changes</button>
    
                <label className='form__input__label ' id="name">
                Name:
                <input className="form__input" type="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </label>

                <label className='form__input__label' id="surname">
                Surname:
                <input className="form__input" type="surname" value={newSurname} onChange={(e) => setNewSurname(e.target.value)} />
                </label>

                <label className='form__input__label' id="country">
                Country:
                <input className="form__input" type="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                
                </div>  
                </form>
        </div>

    );
};


export default Profile;
