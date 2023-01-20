// Importer express
const express = require("express");
// Import fileUpload permet de reçevoir des requête en form-data
const fileUpload = require("express-fileupload");
// Import cloudinary
const cloudinary = require("cloudinary").v2;
// Import router pour la communication entres fichiers
const router = express.Router();
// Import du middleware 'isAuthenticated' pour sécuriser
const isAuthenticated = require("../middlewares/isAuthenticated");
// Import convertToBase64 pour convertir les photos en chaine de caractère
const convertToBase64 = require("../utils/convertToBase64");

// Importer la variable du modèle Offer
const Offer = require("../models/Offer");

// CREATION DE ROUTE POUR CREER UNE PUBLICATION
// Comme ce sont des fichiers importé on remplace la variable du server(appelé 'Server' ou 'app') par la variable 'router'//
// Exemple : Server.post => router.post
router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(
        convertToBase64(req.files.picture),
        {
          folder: "/vinted/offer",
        }
      );
      console.log(result);
      // DEMANDER SI C‘EST BIEN UN DESTRUCTURING
      //const { title, description, price, condition, city,brand,size,color,picture } = req.body;

      const newOffer = new Offer({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        condition: req.body.condition,
        city: req.body.city,
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.color,
        picture: req.body.picture,
      });
      await newOffer.save();

      // const response = {
      //   _id: newOffer._id,
      //   product_name: newOffer.product_name,
      //   product_description: newOffer.product_description,
      //   procuct_price: newOffer.product_price,
      //   product_details: newOffer.product_details,
      //   owner: newOffer.owner,
      //   product_image: newOffer.product_image,
      // };

      res.json(newOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
