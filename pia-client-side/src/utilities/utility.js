export function successMessage(message) {
  return {
    success: true,
    message,
  };
}

export function failedMessage(message) {
  return {
    success: false,
    message,
  };
}

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
