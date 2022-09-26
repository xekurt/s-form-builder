const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const validateField = (field) => {
  if (field.trim().length < 3) {
    return "small";
  }
  if (field.trim().length > 100) {
    return "big";
  }

  if (specialChars.test(field[0])) {
    return "special";
  }
  return true;
};

export const validateFourAnswer = (options) => {
  let error;
  if (!options.every((option) => option.title)) {
    error = "title";
    return error;
  }
  if (options.some((option) => specialChars.test(option.title[0]))) {
    error = "special";
    return error;
  }
  if (!options.some((option) => option.value)) {
    error = "value";
    return error;
  }
  return true;
};

export const validateDate = (start, end) => {
  if (start.trim().length === 0) {
    return { error: "small", type: "startDate" };
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate > endDate) {
    return "invalid";
  }
  return true;
};
