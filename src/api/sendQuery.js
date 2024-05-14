import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";

const sendQuery = async (app_name, color, request_query) => {
  const BASE_URL = "https://blazentv.in/query";

  let userToken = await AsyncStorage.getItem("userToken");
  const decoded = JWT.decode(userToken, "Qwertasd1234$lghsfdjkh");

  let result = null;

  await axios
    .post(BASE_URL, {
      app_name: app_name,
      username: decoded.username,
      email: decoded.email,
      color: color,
      request_query: request_query,
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.log("Error while Fetching Data : ", error);
    });
  return result;
};

export { sendQuery };
