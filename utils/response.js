const response = (status, message) => {
  // status must be one of "Success", "Error" or "Failure"
  if (typeof status !== "string" || (status !== "Success" && status !== "Failure" && success !== "Error")) {
    status = "Error";
  }
  if (typeof message !== "string") {
    message = "Internal Server Error";
  }
  return { status, message };
};

export { response };
