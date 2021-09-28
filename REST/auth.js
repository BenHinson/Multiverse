const crypto = require("crypto");
const generateHash = (word) => { return crypto.createHash("md5").update(word).digest("hex"); }

const serverKey = "1657ec96792937f71c20c9e1bdc2300f";
// In Postman: Select Authorization.  Type=API Key.  Key: auth.   Value: nano  Add to: Header

const checkUser = async(req, res, next) => {
  let authKey = generateHash(req.headers.auth || '');

  if (authKey !== serverKey) { return res.json({'error': 'Invalid authentication key.'}) }

  return next();
}


module.exports = {checkUser};