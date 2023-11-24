const express = require('express');
require('./database/connectToDb');

const cors = require('cors');
const tokenVerification = require('./middleware/tokenVerification.js');

const app = express();
app.use(express.json());
app.use(cors());

const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");
const exhibitController = require("./controllers/exhibitController");
const purchaseOfferController = require("./controllers/purchaseOfferController");

app.post('/registerForm',userController.createUser);
app.post('/loginForm', userController.loginUser);
app.post('/collectionForm',tokenVerification, collectionController.createCollection);
app.post('/exhibitForm', tokenVerification,exhibitController.createExhibit);
app.post('/purchaseOfferForm',tokenVerification, purchaseOfferController.createPurchaseOffer)
app.post('/tokenVerification', userController.verificateUser)

app.get('/userProfile/:email',tokenVerification,userController.findUserByEmail);
app.get('/getUserCollections:ownerEmail', tokenVerification, collectionController.findAllUserCollections)

app.delete('/collection/delete:collectionId', tokenVerification,collectionController.deleteCollectionById)

app.listen(3000);