const validator = require("validator");

module.exports = (req, res, next) => {
  const { firstName, email, lastName, phoneNumber, password } = req.body;

  // Check the existence of required fields
  if (!email || !password)
    return res.status(400).json({
      message: "All Fields are required.",
    });

  // Check if it valid email
  if (!validator.isEmail(email))
    return res.status(400).json({
      message: "Invalid email.",
    });

  // Check if it is valid phone-number
  if (phoneNumber && !validator.isMobilePhone(phoneNumber))
    return res.status(400).json({
      message: "Invalid phone number.",
    });

  // Check the strength of a password
  if (!validator.isStrongPassword(password))
    return res.status(400).json({
      message: "Password not strong enough.",
    });

  next();
};
