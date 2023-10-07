const express = require('express');
require('./database/connectToDb');
const userController = require("./controllers/userController")
const cors = require('cors');
const tokenVerification = require('./middleware/tokenVerification.js');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/registerForm',userController.createUser)
app.post('/loginForm', userController.loginUser)
app.post('/checkAuthentication',tokenVerification)

app.listen(3000);