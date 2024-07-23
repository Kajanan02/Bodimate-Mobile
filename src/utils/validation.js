export function loginValidate(values) {

  let errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function personalInfoValidate(values) {

  let errors = {};

  if (!values.phoneNo) {
    errors.phoneNo = 'Contact No is required';
  } else if (!/^([+]\d{2})?\d{10}$/.test(values.phoneNo)) {
    errors.phoneNo = 'Contact No is not valid';
  }

  return errors;
}

export function loginSecurityValidate(values) {

  let errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
