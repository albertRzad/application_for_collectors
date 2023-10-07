const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber
      });

      newUser.save()
      .then(() => {
        console.log("SAVED")
        return res.status(200).json({ message: "User registered."});
      })
}

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({"email": email});
    if (!user) {
      return res.status(404).json({ message: 'There no user associated with this email address.' });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, password, {expiresIn: "7d",})
      console.log(token)
      return res.status(200).json({token, message: "Succesfully logged in."});
    } else {
      return res.status(401).json({ error: 'Given password is incorrect' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'There was an error during login' });
  }
}

module.exports = {createUser: createUser, loginUser: loginUser};