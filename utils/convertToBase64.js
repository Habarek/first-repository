//--------------convertToBase64---------------//
//---CONVERTIR UNE PHOTO EN CHAINE DE CARACTERE---//
const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

// Il faut également l'exporter
module.exports = convertToBase64;
