// Importer express
const express = require("express");
// Importer uid2 sert à générer des string aléatoir
const uid2 = require("uid2");
// Importer le dossier 'SHA256' du package crypto-js sert à cryper les string
const SHA256 = require("crypto-js/sha256");
// Importer le dossier 'encBase64' du package crypto-js
const encBase64 = require("crypto-js/enc-base64");
// Importer les router pour la communication entres fichier
const router = express.Router();

// Importer la variable 'User' qui contient la valeur du model 'User' qui est dans le dossier models
const User = require("../models/User");

//-------------CREATION-DE-ROUTE- user (pour l'inscription)---//

// Les élément à afficher dans postman pour pouvoir enregistrer dans la BDD
// Il doit correspondre au modèle

// Comme ce sont des fichiers importé on remplace la variable du server(appelé 'Server' ou 'app') par la variable 'router'//
// Exemple : Server.post => router.post

router.post("/user/signup", async (req, res) => {
  try {
    //console.log(req.body.password);
    const salt = uid2(16);
    const hash = SHA256(salt + req.body.password).toString(encBase64);
    const token = uid2(64);

    // Si l'email existe déjà
    // Créer une variable contenant les email de la collection 'User'
    // .findOne() (mettre le chemin de la requête sans oublier la clef au départ)
    const emailAlreadyUsed = await User.findOne({ email: req.body.email });
    if (emailAlreadyUsed) {
      return res.json("cet email existe déjà");
    }

    const NewUser = new User({
      account: {
        username: req.body.username,
      },
      email: req.body.email,
      newsletter: req.body.newsletter,
      token: token,
      hash: hash,
      salt: salt,
    });

    // Création d'une variable qui stoquera uniquement les élément pour la réponse
    const response = {
      _id: NewUser._id,
      token: NewUser.token,
      account: NewUser.account,
    };
    //Sauvgarde de l'élément dans BDD
    //'await' permet d'attendre la réponse pour pouvoir continuer

    await NewUser.save();

    //Réponse au client si tout est Bon
    res.json(response);

    // En cas d'érreur
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//-----CREATION-DE-LA ROUTE user (pour la connection) ----//

router.post("/user/login", async (req, res) => {
  try {
    // Créer une variable
    const login = await User.findOne({ email: req.body.email });
    //console.log(login); // Me permet de voir les élément stoqué dans la variable

    const response2 = {
      _id: login._id,
      token: login.token,
      account: login.account,
    };

    res.json(response2);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
