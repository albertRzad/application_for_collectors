const User = require("../models/user")

const createUser = async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;

    const newUser = new User({
        name: name,
        surname: surname,
        email: email,
        password: password,
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
      return res.status(404).json({ message: 'Użytkownik o podanym adresie email nie istnieje' });
    }

    const passwordMatch = password.isEqualTo(user.password)
    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, password, {expiresIn: "7d",})
      return res.status(200).json({ data: {token,email}, message: "Succesfully logged" })
    } else {
      return res.status(401).json({ error: 'Given password is incorrect' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'There was an error during login' });
  }
}

const getAllUsers = async (_req, res) => {
    try {
      const users = await User.find();
  
      if (!users) {
        return res.status(404).json({ message: "Brak użytkowników w bazie danych." });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
      return res.status(500).json({ message: "Wystąpił błąd podczas pobierania użytkowników z bazy danych." });
    }
  };

module.exports = {createUser: createUser, getAllUsers: getAllUsers, loginUser: loginUser};