export function loginValidate(values) {

  let errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function signupValidate(values) {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.contactNo) {
    errors.contactNo = 'Contact number is required';
  } else if (!/^\d{10}$/.test(values.contactNo)) {
    errors.contactNo = 'Invalid contact number';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.nicNo) {
    errors.nicNo = 'NIC number is required';
  }

  return errors;
}

export function bodimateYourHomeValidate(values) {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.contactNo) {
    errors.contactNo = 'Contact number is required';
  } else if (!/^\d{10}$/.test(values.contactNo)) {
    errors.contactNo = 'Invalid contact number';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.nicNo) {
    errors.nicNo = 'NIC number is required';
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

export function boardingDetailsValidate(values) {
  let errors = {};

  if (!values.boardingName) {
    errors.boardingName = 'Boarding Name is required';
  }

  if (!values.street) {
    errors.street = 'Street is required';
  }

  if (!values.city) {
    errors.city = 'City/Town/Village is required';
  }

  if (!values.district) {
    errors.district = 'District is required';
  }

  if (!values.province) {
    errors.province = 'Province is required';
  }

  if (!values.boardingType) {
    errors.boardingType = 'Boarding type is required';
  }

  if (!values.stayPreference) {
    errors.stayPreference = 'Stay preference is required';
  }

  if (!values.selectedFacilities || values.selectedFacilities.length === 0) {
    errors.selectedFacilities = 'Facilities Listings is required';
  }

  if (!values.membersCount) {
    errors.membersCount = 'Members Count is required';
  } else if (!/^\d+$/.test(values.membersCount)) {
    errors.membersCount = 'Members Count must be a valid integer';
  } else if (parseInt(values.membersCount, 10) < 0 || parseInt(values.membersCount, 10) > 15) {
    errors.membersCount = 'Members Count must be between 0 and 15';
  }

  if (!values.noOfRooms) {
    errors.noOfRooms = 'No of Rooms is required';
  } else if (!/^\d+$/.test(values.noOfRooms)) {
    errors.noOfRooms = 'No of Rooms must be a valid integer';
  } else if (parseInt(values.noOfRooms, 10) < 0 || parseInt(values.noOfRooms, 10) > 15) {
    errors.noOfRooms = 'No of Rooms must be between 0 and 15';
  }

  if (!values.pricePerMonth) {
    errors.pricePerMonth = 'Price Per Month is required';
  } else if (isNaN(values.pricePerMonth)) {
    errors.pricePerMonth = 'Price Per Month must be a valid number';
  }

  if (!values.distance) {
    errors.distance = 'Distance is required';
  } else if (isNaN(values.distance)) {
    errors.distance = 'Distance must be a valid number';
  }

  if (!values.nearestUniversityName) {
    errors.nearestUniversityName = 'Nearest University Name is required';
  }

  if (!values.advancePayment) {
    errors.advancePayment = 'Advance Payment is required';
  } else if (isNaN(values.advancePayment)) {
    errors.advancePayment = 'Advance Payment must be a valid number';
  }

  if (!values.selectedImages || values.selectedImages.length === 0) {
    errors.selectedImages = 'At least one boarding image is required';
  }

  return errors;
}

export function CardDetailsValidate(values) {
  let errors = {};

  if (!values.cardNumber) {
    errors.cardNumber = 'Card Number is required';
  } else if (!/^(?:4[0-9]{15}|5[1-5][0-9]{14}|3[47][0-9]{13})$/.test(values.cardNumber) &&
      !/^\d{16}$/.test(values.cardNumber) && !/^\d{15}$/.test(values.cardNumber)) {
    errors.cardNumber = 'Invalid Card Number. Must be 16 digits (Visa/MasterCard) or 15 digits (Amex)';
  }

  if (!values.expiryDate) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(values.expiryDate)) {
    errors.expiryDate = 'Invalid expiry date. Use MM/YY format';
  } else {
    const [month, year] = values.expiryDate.split('/').map(num => parseInt(num, 10));
    const expiry = new Date(2000 + year, month - 1);
    const now = new Date();
    if (expiry < now) {
      errors.expiryDate = 'Card has expired';
    }
  }

  if (!values.cvv) {
    errors.cvv = 'CVV is required';
  } else if (!/^\d{3}$/.test(values.cvv) && !/^\d{4}$/.test(values.cvv)) {
    errors.cvv = 'CVV must be 3 digits (Visa/MasterCard) or 4 digits (Amex)';
  }

  return errors;
}
