// Commencer par npm init -y pour pouvoir installer des package
// Istaller package express
// Installer package mongoose
// Installer package uid2 (pour générer des string aléatoir)
// Installer crypto-js (pour crypter)
// Lancer le server (npx nodemon + nom du fichier)

// Importer express
const express = require("express");
// Importer mongoose
const mongoose = require("mongoose");
// Création du Server
const Server = express();
// Fonction pour pouvoir utiliser les requête en POST sur postman
Server.use(express.json());
// Importer cloudinary
const cloudinary = require("cloudinary").v2;
// En attendant la MAJ
mongoose.set("strictQuery", false);
//Se connecter à mongoose en créant le nom de la BDD(/Vinted)
mongoose.connect("mongodb://localhost:27017/Vinted");
// Connection à mon compte cloudinary
cloudinary.config({
  cloud_name: "das4zg1hz",
  api_key: "279673591539827",
  api_secret: "4V6xAtKRKXZX6eSPAvxMATzUnn4",
  secure: true,
});

// Importation de la route user//
const userRoutes = require("./routes/user");
// Importation de la route offer//
const offerRoutes = require("./routes/offer");
// Connection du server aux fichier user et offer
Server.use(userRoutes);
Server.use(offerRoutes);

// Routre créée pour toute les autres route non enregistré
Server.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});
//Activation du Server
Server.listen(3000, () => {
  console.log("Server Started 🚀");
});
