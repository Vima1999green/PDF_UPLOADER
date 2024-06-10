const validator = require("validator");
const isEmpty = require("../validator/isEmpty");

module.exports = registerInputValidator = (data) => {
  let errors = {};

  // Ensure the fields are strings before validation
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // Validate name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Validate email
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Validate password
  if (!validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = "Password should be between 8 and 20 characters";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Validate password confirmation
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Confirmation password does not match";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirmation password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
