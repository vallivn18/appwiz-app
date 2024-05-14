import axios from "axios";

const getLoginToken = async (username, password) => {
  const BASE_URL = "https://blazentv.in/users/login";

  var login_data = {
    message: null,
    token: null,
  };

  await axios
    .post(BASE_URL, {
      username: username,
      password: password,
    })
    .then((response) => {
      login_data = {
        message: response.data.message,
        token: response.data.token,
      };
    })
    .catch((error) => {
      console.log("Error while Login : ", error);
    });

  // console.log(login_data);
  return login_data;
};

export { getLoginToken };
