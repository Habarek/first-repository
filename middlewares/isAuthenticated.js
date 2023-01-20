// Il faut importer le modèle 'User' qui est dans le dossier 'models'
const User = require("../models/User");

// pour accorder une autorisation en fonction du token
const isAuthenticated = async (req, res, next) => {
  try {
    // Le token reçu est dans req.headers.authorization
    console.log(req.headers.authorization);
    // je vais chercher mon token dans mongoose et le renseigner dans postman  j'enlève "Bearer pour afficher que le token "
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    // Je vais chercher dans ma BDD un user dont le token est celui que j'ai reçu
    // Je créer une variable qui va chercher dans la collection User la valeur de la variable 'token' stocker precedement
    const user = await User.findOne({ token });

    // Si la valeur de la variable 'user' est differente de la valeur de la variable 'token'
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Si J'en trouve un, je le stocke dans req.user pour le garder sous la main et pouvoir le réutiliser dans ma route
    req.user = user;
    // Je passe au middleware suivant
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Il faut également exporter le fichier pour qu'il puisse être lu par les autres fichier
module.exports = isAuthenticated;
