const validator = require("validator");

const registerValidator = (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const trimmedEmail = email.trim();
  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();

  if (
    !trimmedEmail ||
    !password ||
    !confirmPassword ||
    !trimmedFirstName ||
    !trimmedLastName
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(trimmedEmail)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
    })
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  req.body.email = validator.normalizeEmail(trimmedEmail);
  req.body.firstName = validator.escape(trimmedFirstName);
  req.body.lastName = validator.escape(trimmedLastName);

  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  const trimmedEmail = email.trim();

  if (!trimmedEmail || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(trimmedEmail)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  req.body.email = validator.normalizeEmail(trimmedEmail);

  next();
};

module.exports = { registerValidator, loginValidator };
