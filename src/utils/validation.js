export const validateField = (field) => {
  //   console.info(field[0].includes("s"));
  if (field.trim().length < 4) {
    return "small";
  }
  if (field.trim().length > 100) {
    return "big";
  }
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (specialChars.test(field[0])) {
    return "special";
  }
  return true;
};
