import React, { useState } from 'react';
import './AccountSettings.css';
import '../../css/Form.css';

const AccountSettings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the submission of the form, such as validating the input and updating the user's account settings
  };

  return (
    <div className="accountSettings">
      <div className='ProfileTitle'>Account Settings</div>

      <form className='formContainer' onSubmit={handleSubmit}>
        <div className='form__account'>
        {/* <div className='form_group_left'> */}
          <label className='form__input__label' id="n_password">
            New Password:
            <input className="form__input" type="password"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <label className='form__input__label' id="c_password">
            Confirm Password:
            <input className="form__input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
        {/* </div> */}
        <button type="submit" id="button_save">Save Changes</button>
        {/* <div className='form_group_right'> */}
        <label className='form__input__label ' id="email">
          Change Email:
          <input className="form__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='form__input__label' id="phone">
          New Phone Number:
          <input className="form__input" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        {/* <label className='form__input__label' id='payment'>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="transfer">Transfer</option>
          </select>
        </label> */}
        </div>
        {/* </div> */}
      </form>

    </div>
  );
};

export default AccountSettings;
