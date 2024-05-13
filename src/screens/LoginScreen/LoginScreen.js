import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../components/Authentication/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (text) => {
    setUserName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLoginPress = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    login(username, password);
    // navigation.navigate("AppCreation");
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-primary">
      <Image
        source={require("../../../assets/Appify-Assets/logo.png")}
        className="w-80 h-56 mb-6"
      />

      <TextInput
        className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
        placeholder="Username"
        placeholderTextColor="#4AFAAB"
        value={username}
        onChangeText={handleUserNameChange}
      />

      <TextInput
        className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
        placeholder="Password"
        placeholderTextColor="#4AFAAB"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      <TouchableOpacity
        className="p-2 mb-4 w-10/12"
        onPress={() => navigation.navigate("Register")}
      >
        <Text className="text-center text-white">
          Can't Sign In? Create an account!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-custom-accent/20 p-3 border rounded-md w-10/12"
        onPress={handleLoginPress}
      >
        <Text className="text-white font-bold text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
