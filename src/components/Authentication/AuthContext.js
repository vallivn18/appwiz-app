import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { getLoginToken } from "../../api/getLoginToken";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    login_data = await getLoginToken(username, password);

    if (login_data.token !== null) {
      console.log("login token : ", login_data.message);
      console.log("USERTOKEN : ", login_data.token);
      await AsyncStorage.setItem("userToken", login_data.token);
      setUserToken(login_data.token);
    } else {
      console.log("Error : ", login_data.message);
      alert(login_data.message);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
