import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { login } from "./apicall";

const TestApi = () => {
  const handlePress = async () => {
    const token = await login("bharath", "qwertasd123");
    console.log(token);
  };
  return (
    <View className="flex-1 justify-center items-center bg-custom-primary">
      <TouchableOpacity onPress={handlePress}>
        <Text className="text-white">PRESS</Text>
      </TouchableOpacity>
      <Text className="text-white"></Text>
    </View>
  );
};

export default TestApi;
