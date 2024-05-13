import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Authentication/AuthContext";

const Header = ({ title }) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    console.log("Logout");
    logout();
  };
  return (
    <>
      <View className="flex-row justify-between items-center bg-custom-accent h-16 p-1 pt-4 border">
        <Text className="text-xl pl-2 text-custom-primary">{title}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" color="#0C212B" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;
