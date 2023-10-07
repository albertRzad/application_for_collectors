const express = require('express');
require('./database/connectToDb');
const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");
const exhibitController = require("./controllers/exhibitController");
const cors = require('cors');
const tokenVerification = require('./middleware/tokenVerification.js');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/registerForm',userController.createUser);
app.post('/loginForm', userController.loginUser);
app.post('/collectionForm', collectionController.createCollection);
app.post('/exhibitForm', exhibitController.createExhibit);

app.listen(3000);