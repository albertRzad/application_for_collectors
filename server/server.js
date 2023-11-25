const express = require("express");
const cors = require("cors");
const tokenVerification = require("./middleware/TokenVerification.js");
require("./database/connectToDb.js");

const userController = require("./controllers/userController.js");
const collectionController = require("./controllers/collectionController.js");
const exhibitController = require("./controllers/exhibitController.js");
const purchaseOfferController = require("./controllers/purchaseOfferController.js");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use(cors());

app.post("/registerForm", userController.createUser);
app.post("/loginForm", userController.loginUser);
app.get("/user:email", tokenVerification, userController.findUserByEmail);
app.post("/tokenVerification", userController.verificateUser);
app.put("/user/update", tokenVerification, userController.updateUserDetails);

app.get(
  "/getUserCollections:ownerEmail",
  tokenVerification,
  collectionController.findAllUserCollections
);
app.get(
  "/getAllCollections",
  tokenVerification,
  collectionController.findAllCollections
);
app.get(
  "/getAllCollectionExhibits:collectionId",
  tokenVerification,
  collectionController.getAllExhibitsByCollectionId
);
app.delete(
  "/collection/delete:collectionId",
  tokenVerification,
  collectionController.deleteCollectionById
);
app.post(
  "/collectionForm",
  tokenVerification,
  collectionController.createCollection
);

app.post("/exhibitForm", tokenVerification, exhibitController.createExhibit);
app.delete(
  "/exhibit/delete:id",
  tokenVerification,
  exhibitController.deleteExhibit
);

app.post(
  "/purchaseOfferForm",
  tokenVerification,
  purchaseOfferController.createPurchaseOffer
);

app.listen(3000);
