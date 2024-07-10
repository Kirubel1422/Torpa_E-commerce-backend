const objectId = /^[a-fA-F0-9]{24}$/;
const path = require("path");

exports.isValidID = (id) => {
  return id.match(objectId);
};

exports.isImgValid = (img) => {
  if (
    !path.extname(img.name) ||
    !path.extname(img.name).match(/\.(jpg|jpeg|png)$/i)
  ) {
    return false;
  }

  return true;
};
