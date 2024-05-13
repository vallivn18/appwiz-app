import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { registerApiCall } from "../../api/registerApiCall";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleUserNameChange = (text) => {
    setUsername(text.replace(" ", "_"));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleRegisterPress = async () => {
    // Add your login logic here
    console.log("Name:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    if (name !== "" || email !== "" || username !== "" || password !== "") {
      if (await registerApiCall(name, email, username, password)) {
        alert("Registeration Successful!");
        navigation.navigate("Login");
      } else {
        alert("Username or Email aldready Exists!");
      }
    } else {
      alert("All feild Must not be empty!");
    }
    // navigation.navigate("Login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-primary">
      <Image
        source={require("../../../assets/Appify-Assets/logo.png")}
        className="w-80 h-56 mb-6"
      />

      <TextInput
        className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
        placeholder="Name"
        placeholderTextColor="#4AFAAB"
        value={name}
        onChangeText={handleNameChange}
      />

      <TextInput
        className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
        placeholder="E-mail"
        placeholderTextColor="#4AFAAB"
        value={email}
        onChangeText={handleEmailChange}
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
        className="bg-custom-accent/20 p-3 border rounded-md w-10/12"
        onPress={handleRegisterPress}
      >
        <Text className="text-white font-bold text-center">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-2 mb-4 w-10/12"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-center text-white">I have an account!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
