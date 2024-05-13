import axios from "axios";

const login = async (username, password) => {
  const loginUrl = "http://192.168.0.100:3000/users/login";

  var login_data = null;

  await axios
    .post(loginUrl, {
      username: username,
      password: password,
    })
    .then((response) => {
      login_data = response.data.token;
    })
    .catch((error) => {
      login_data = error;
    });

  return login_data;
};

export { login };
