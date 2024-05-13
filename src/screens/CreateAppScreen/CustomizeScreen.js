import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ColorPicker } from "react-native-color-picker";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { sendQuery } from "../../api/sendQuery";
import * as MailComposer from "expo-mail-composer";

const CustomizeScreen = ({ navigation }) => {
  const [appname, setAppName] = useState("");
  const [query, setQuery] = useState("");

  const [color, setColor] = useState({ h: 0, s: 1, v: 1 });

  const handleAppnameChange = (text) => {
    setAppName(text);
  };

  const handleQueryChange = (text) => {
    setQuery(text);
  };

  const onColorChange = (color) => {
    console.log(color);
    setColor({ color });
  };

  const getUserDetail = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    const decoded = JWT.decode(userToken, "Qwertasd1234$lghsfdjkh");
    // console.log("Data : ", decoded);
    return decoded;
  };

  const handleSubmit = async () => {
    console.log("App Name:", appname);
    console.log("Query:", query);
    if (appname != "" && query != "" && setColor != {}) {
      const result = await sendQuery(appname, color.h, query);
      if (result != null) {
        await sendEmail();
        Alert.alert(
          "Wola..!",
          "We have Recieved your Query, Please await as our team will reach out to your registered email..."
        );
        navigation.navigate("AppDashboard");
      } else {
        Alert.alert("Oops..!", "Something went wrong..Please try again...");
      }
    } else {
      alert("Please fill in all details.");
    }
  };

  const sendEmail = async () => {
    try {
      const detail = await getUserDetail();
      const { status } = await MailComposer.composeAsync({
        recipients: ["appwiz.dev@gmail.com"],
        subject: `QUERY : Request from ${detail.username} for app ${appname}`,
        body: `DESCRIPTION : ${query} \n COLOR in HUE : ${color.h}`,
      });

      if (status === "sent") {
        console.log("Email sent successfully!");
      } else {
        console.log("Email not sent.");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <>
      <Header title={"Customize"} />
      <View className="flex-1 justify-center items-center bg-custom-primary">
        <TextInput
          className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
          placeholder="App Name"
          placeholderTextColor="#4AFAAB"
          value={appname}
          onChangeText={handleAppnameChange}
        />

        <TextInput
          className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
          placeholder="Queries - Mention your Request here"
          placeholderTextColor="#4AFAAB"
          multiline
          numberOfLines={4}
          maxLength={100}
          value={query}
          onChangeText={handleQueryChange}
        />

        <ColorPicker
          onColorChange={onColorChange}
          style={{ height: 150, width: 150, padding: 8, marginBottom: 16 }}
          hideSliders
        />

        <TouchableOpacity
          className="bg-custom-accent/20 p-3 border rounded-md w-10/12 m-3"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomizeScreen;
