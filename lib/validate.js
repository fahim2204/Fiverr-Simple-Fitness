const jwt = require("jsonwebtoken");


exports.loginValidate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Must be greater than or equal to 3 characters";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
};

exports.registerValidate = (values) => {
  const errors = {};

  //Username
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Must be greater than 3 characters";
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = 'Invalid Email/Username';
  }
  //Full Name
  if (!values.fullName) {
    errors.fullName = "Required";
  } else if (values.fullName.length < 3) {
    errors.fullName = "Must be greater than or equal to 3 characters";
  }
  //Mobile
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 5) {
    errors.phone = "Must be greater than 5 characters";
  }else if (!/^\d+$/.test(values.phone)) {
    errors.phone = "Must be a number";
  }
  // Password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  //Confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 6 || values.confirmPassword.length > 20) {
    errors.confirmPassword = "Must be greater than 6 and less then 20 characters";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Invalid Confirm Password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwrod and Confirm Password did not match";
  }

  return errors;
};

exports.machineValidate = (values) => {
  const errors = {};

  if (!values.machineId) {
    errors.machineId = "Required";
  } 

  if (!values.machineMac) {
    errors.machineMac = "Required";
  } 

  return errors;
};

exports.machineDataValidate = (values) => {
  const errors = {};

  if (!values.fkMachineId) {
    errors.fkMachineId = "Required";
  } 

  // validation for data
  if (!values.sensorData) {
    errors.sensorData = "Required";
  }  else if(!(values.sensorData instanceof Object)) {
    errors.sensorData = "Invalid";
  }

  return errors;
};

exports.machineAssignDataValidate = (values) => {
  const errors = {};

  if (!values.machineMac) {
    errors.machineMac = "Required";
  } 
  
  return errors;
};

// Check if the Token is expired
exports.isTokenExpired = (token) => {
  try {
      jwt.verify(token, "2204");
  } catch (err) {
      return true;
  }
  return false;
};