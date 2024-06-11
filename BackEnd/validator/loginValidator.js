const validator = require("validator");
const isEmpty = require("../validator/isEmpty");

module.exports = loginValidator = (data) => {
  let errors = {};

  // Ensure the fields are strings before validation

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
