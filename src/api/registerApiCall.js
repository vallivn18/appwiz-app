import axios from "axios";

const registerApiCall = async (name, email, username, password) => {
  const BASE_URL = "https://blazentv.in/users/register";

  let isRegistered = false;

  await axios
    .post(BASE_URL, {
      name: name,
      email: email,
      username: username,
      password: password,
    })
    .then((response) => {
      isRegistered = response.data.isRegistered;
    })
    .catch((error) => {
      console.log("Error while Login : ", error);
    });

  console.log(isRegistered);
  return isRegistered;
};

export { registerApiCall };
