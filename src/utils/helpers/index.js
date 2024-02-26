//checking both email and phone number
export const CheckEmailPhone = (str) => {
  const emailRegex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
  return emailRegex.test(str);
};
//check email
export const CheckEmail = (str) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;
  return emailRegex.test(str);
};

//restrict numbers and special characters in name field
export const CheckName = (str) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(str);
};
export const CheckNumber = (value) => {
  // Add a length check here
  // return /^[0-9]{10}$/.test(value);
  return /^[6-9][0-9]{9}$/.test(value)
};
