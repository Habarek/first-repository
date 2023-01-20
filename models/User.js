//---------CREATION DU MODELE--'USER'-----------//
//---------JAMAIS DE MDP DANS LES MODELS------//

// Nous avons importer le model 'User' dans un autre dossier//
// il faut alors importer mongoose//
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  account: {
    username: {
      type: String,
      required: true,
    },

    avatar: Object, // nous verrons plus tard comment uploader une image
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
});

// comme c'est un fichier importé il faut l'exporter pour communiquer avec les autres fichiers//
module.exports = User;
