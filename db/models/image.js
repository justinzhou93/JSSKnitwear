const Sequelize = require('sequelize');
const db = require('APP/db');

const Image = db.define('images', {
  path: {
    type: Sequelize.BLOB()
  }
});

const b64toBlob = (input) => {
  let j = 0;
  while (input[j] !== ','){
    j++;
  }
  let b64Data = input.slice(j + 1);
  var buf = Buffer.from(b64Data, 'base64');
  return buf;
}

Image.beforeCreate(image => {
  const contentType = 'image/jpeg';
  image.path = b64toBlob(image.path, contentType);
})

module.exports = Image;
