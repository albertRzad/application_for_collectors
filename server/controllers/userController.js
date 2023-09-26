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

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Pobierz wszystkich użytkowników z bazy danych
  
      if (!users) {
        return res.status(404).json({ message: "Brak użytkowników w bazie danych." });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
      return res.status(500).json({ message: "Wystąpił błąd podczas pobierania użytkowników z bazy danych." });
    }
  };

module.exports = {createUser: createUser, getAllUsers: getAllUsers};