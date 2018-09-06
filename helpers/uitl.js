const crypto = require('crypto');

const utils = {

  encrypt( texto ){
    let typeCipher = 'aes192';
    let clave = 'R0vt3R-B4r';

    let cipher = crypto.createCipher(typeCipher, clave);
    let encrypted = cipher.update(texto, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },

  validarEmail(email){
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return re.test(email);
  },
  escapeURIparam (url) {
    if (encodeURIComponent) url = encodeURIComponent(url);
    else if (encodeURI) url = encodeURI(url);
    else url = escape(url);
    url = url.replace(/\+/g, '%2B'); // Force the replacement of "+"
    return url;
  }
}
  
module.exports = utils;