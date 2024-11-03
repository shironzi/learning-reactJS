const { body, validationResult } = require("express-validator");

const registerValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("firstName")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include at least one symbol, one number, one lowercase letter, and one uppercase letter"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { registerValidator, loginValidation };
