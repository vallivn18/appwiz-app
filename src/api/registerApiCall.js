import axios from "axios";

const registerApiCall = async (name, email, username, password) => {
  const BASE_URL = "http://64.227.172.61:3000/users/register";

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
