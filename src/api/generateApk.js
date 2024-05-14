import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { manipulateAsync } from "expo-image-manipulator";

const generateApk = async (template_path, app_name, app_image) => {
  const BASE_URL = "https://blazentv.in/generateApk";

  let userToken = await AsyncStorage.getItem("userToken");
  const decoded = JWT.decode(userToken, "Qwertasd1234$lghsfdjkh");
  console.log(decoded);

  const app_encoded_image = await encodeImageToBase64(app_image);

  const app_data = {
    username: decoded.username,
    template_path: `/home/valli/testing/Templates${template_path}`,
    app_name: app_name,
    client_email: decoded.email,
    app_image: app_encoded_image,
  };

  let result = null;

  await axios
    .post(BASE_URL, app_data)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.log("Error while Login : ", error);
    });

  console.log("Request Data : ", app_data.app_image);
  return result;
};

const encodeImageToBase64 = async (uri) => {
  const manipulatedImage = await manipulateAsync(uri, [], {
    format: "png",
    base64: true,
  });
  console.log("Encoded Image : ", manipulatedImage);
  if (!manipulatedImage.base64) {
    throw new Error("Failed to encode image to base64");
  }
  return manipulatedImage.base64;
};

export { generateApk };
