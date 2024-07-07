const validator = require("validator");

module.exports = (req, res, next) => {
  const { firstName, email, lastName, phoneNumber, password } = req.body;

  // Check the existence of required fields
  if (!firstName || !email || !phoneNumber || !password)
    return res.status(400).json({
      message: "All Fields are required.",
    });

  // Check if it valid email
  if (!validator.isEmail(email))
    return res.status(400).json({
      message: "Invalid email.",
    });

  // Check if it is valid phone-number
  if (!validator.isMobilePhone(phoneNumber))
    return res.status(400).json({
      message: "Invalid phone number.",
    });

  // First name at least 4 chars
  if (!validator.isLength(firstName, { min: 4 }))
    return res.status(400).json({
      message: "First name should be at least 4 characters.",
    });

  // Check the strength of a password
  if (!validator.isStrongPassword(password))
    return res.status(400).json({
      message: "Password not strong enough.",
    });

  next();
};
