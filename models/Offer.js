// Importation du modele 'Offer' il faut donc importer mongoose//

const mongoose = require("mongoose");
//-------CREATION DU MODELE--OFFER-------//

const Offer = mongoose.model("Offer", {
  product_name: String,
  product_description: String,
  product_price: Number,
  product_details: Array,
  product_image: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// comme c'est un fichier importé il faut l'exporter pour communiquer avec les autres fichiers//
module.exports = Offer;
