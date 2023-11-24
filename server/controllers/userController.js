const User = require("../models/user")
const Collection = require("../models/collection");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const hashedPassword = await bcrypt.hash(password, 10);

  const nameRegex = /^[A-Z][a-zA-Z]+$/;
  const surnameRegex = /^[A-Z][a-zA-Z-]*$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
  const phoneNumberRegex = /^\d{9}$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: "Invalid name format." });
  }
  if (!surnameRegex.test(surname)) {
    return res.status(400).json({ message: "Invalid surname format." });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Invalid password format." });
  }
  if (!phoneNumberRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });

    try {
      await newUser.save();
      return res.status(200).json({ message: "User registered." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error registering user.", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Email already taken." });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ "email": email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the provided email." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, password, { expiresIn: "7d" });
      console.log(token);
      return res
        .status(200)
        .json({ token, message: "Successfully logged in." });
    } else {
      return res.status(401).json({ error: 'Incorrect password.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ message: "There was an error during the login process." });
  }
};


const findUserByEmail = async(req,res) =>{
    try {
      const email = req.params.email; 
      const trimmedEmail = email.replace(":", "");
    
      const user = await User.findOne({ "email": trimmedEmail });
      if (!user) {
        return res.status(404).json({ message: 'There is no user with given email address.' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'There was an error' });
  };
}

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'There are no users in the database.' });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'There was an error' });
  }
};

const verificateUser = async (req, res) => {
  const token = req.params.email;
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'There is no user with the given email address.' });
    }

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.decode(token, user.password, (err) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token!" });
      }
        return res.status(200).send({ message: "Approved" });

    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;
    const newPhoneNumber = req.body.newPhoneNumber;
    const confirmPassword = req.body.confirmPassword;

    const user = await User.findOne({ email });

    if (newPassword && confirmPassword && newPassword.trim() !== '' && newPassword !== confirmPassword) {
      return res
      .status(400)
      .json({ message: "Passwords aren't the same." });
    }

    if (newPassword && newPassword.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    
    if (newEmail && newEmail.trim() !== '') {
      const userWithGivenEmailExist = await User.findOne({ email: newEmail });

      if (userWithGivenEmailExist) {
        return res
        .status(400)
        .json({
          message: "Account with given email address already exists.",
        });
      }
      user.email = newEmail;
      await updateCollectionsOwnerEmail(email, newEmail);
    }

    if (newPhoneNumber && newPhoneNumber.trim() !== '') {
      user.phoneNumber = newPhoneNumber;
    }

    await user.save();

    return res
      .status(200)
      .json({
        message: "User details updated successfully.",
        newEmail: user.email,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "There was an error updating the user details." });
  }
};

const updateCollectionsOwnerEmail = async (currentEmail, newEmail) => {
  try {
    if (!currentEmail || !newEmail) {
      throw new Error("Current email and new email are required.");
    }

    const result = await Collection.updateMany(
      { ownerEmail: currentEmail },
      { $set: { ownerEmail: newEmail } }
    );

    if (result.matchedCount === 0) {
      throw new Error("No collections found with the given email.");
    }

    return { updatedCount: result.modifiedCount };
  } catch (err) {
    throw err;
  }
};


module.exports = {createUser: createUser, loginUser: loginUser, findUserByEmail: findUserByEmail, verificateUser: verificateUser, findAllUsers: findAllUsers,updateUserDetails: updateUserDetails};