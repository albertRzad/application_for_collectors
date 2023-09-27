const express = require('express');
require('./database/connectToDb');
const userController = require("./controllers/userController")
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/registerForm',userController.createUser )

app.get('/users', userController.getAllUsers)

app.listen(3000);