import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";

const getApkData = async () => {
  const BASE_URL = "http://64.227.172.61:3000/generateApk/fetchApkData";

  let userToken = await AsyncStorage.getItem("userToken");
  const decoded = JWT.decode(userToken, "Qwertasd1234$lghsfdjkh");

  let result = null;

  await axios
    .post(BASE_URL, { username: decoded.username })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.log("Error while Fetching Data : ", error);
    });

  // console.log("Request Data : ", result);
  return result;
};

export { getApkData };
