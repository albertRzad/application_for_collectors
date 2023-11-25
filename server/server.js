const express = require('express');
const cors = require('cors');
const tokenVerification = require('./middleware/tokenVerification.js');
require('./database/connectToDb');

const userController = require("./controllers/userController");
const collectionController = require("./controllers/collectionController");
const exhibitController = require("./controllers/exhibitController");
const purchaseOfferController = require("./controllers/purchaseOfferController");



const app = express();
app.use(express.json())

app.use(cors());


app.get('/user:email',tokenVerification,userController.findUserByEmail);
app.get('/getUserCollections:ownerEmail', tokenVerification, collectionController.findAllUserCollections);
app.get('/getAllCollections', tokenVerification, collectionController.findAllCollections);
app.get('/getAllCollectionExhibits:collectionId', tokenVerification,collectionController.getAllExhibitsByCollectionId);

app.post('/registerForm',userController.createUser);
app.post('/loginForm', userController.loginUser);
app.post('/collectionForm',tokenVerification, collectionController.createCollection);
app.post('/exhibitForm', tokenVerification,exhibitController.createExhibit);
app.post('/purchaseOfferForm',tokenVerification, purchaseOfferController.createPurchaseOffer);
app.post('/tokenVerification', userController.verificateUser);

app.put('/user/update', tokenVerification,userController.updateUserDetails);

app.delete('/collection/delete:collectionId', tokenVerification,collectionController.deleteCollectionById);

app.listen(3000);