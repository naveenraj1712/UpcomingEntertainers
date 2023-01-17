const generateUserName = (first_name, last_name) => {
  return String.concat(
    first_name.replace(" ", ""),
    ".",
    last_name.replace(" ", "")
  );
};
