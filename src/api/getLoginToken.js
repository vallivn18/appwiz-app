import axios from "axios";

const getLoginToken = async (username, password) => {
  const BASE_URL = "http://64.227.172.61:3000/users/login";

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
