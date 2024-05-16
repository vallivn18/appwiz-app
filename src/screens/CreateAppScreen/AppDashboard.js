import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { getApkData } from "../../api/getApkData";

const AppDashboard = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [apkData, setApkData] = useState([]);
  const [, forceUpdate] = useState();

  const getUserDetail = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    const decoded = JWT.decode(userToken, "Qwertasd1234$lghsfdjkh");
    // console.log("Data : ", decoded);
    return decoded;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchApkData();

    // forceUpdate();
  };

  const fetchApkData = async () => {
    const latestData = await getApkData();
    setApkData(latestData.data);
    setRefreshing(false);
  };

  const renderApp = (item, index) => {
    return (
      <View
        key={index}
        className="flex-row p-1 w-[100%] m-1 bg-custom-accent/20 rounded-2xl"
      >
        <Image
          source={{
            uri: `data:image/png;base64,${item.app_image}`,
          }}
          className="w-[100] h-[100]  rounded-full"
        />
        <View className="ml-3 justify-center">
          <Text className="text-white text-xl">
            {item.app_name.toUpperCase()}
          </Text>

          <View className="flex-row mt-2 w-[230px] justify-around">
            <TouchableOpacity
              className={`${
                item.status ? "bg-custom-accent/10" : "bg-red-700/50"
              } p-1 rounded-md w-[110px]  mt-1`}
              disabled={true}
            >
              <Text className="text-white font-bold text-center">
                {item.status ? "PASS" : "FAIL"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-custom-accent/20 p-1 rounded-md  mt-1 w-[110px]"
              onPress={() => {
                item.status
                  ? Linking.openURL(item.drive_path)
                  : Alert.alert(
                      "Failed Apk",
                      "Instance of Apk generation unexpectedly failed"
                    );
              }}
            >
              <Text className="text-white font-bold text-center">GET LINK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const detail = await getUserDetail();
      setUsername(detail.username.toUpperCase());
      setEmail(detail.email);
    };

    fetchUserDetails();
    fetchApkData();
  }, []);

  return (
    <>
      <Header title={"Dashboard"} />
      <View className="flex-1 items-center bg-custom-primary p-3">
        <View className="flex-row border-custom-primary border-[2px] rounded-md w-[98%] h-[10%] justify-between items-center p-2 bg-custom-accent/50">
          <View>
            <Text className="text-white text-3xl">{username}</Text>
            <Text className="text-white">{email}</Text>
          </View>
          <Image
            source={require("../../../assets/Appify-Assets/logo.png")}
            className="w-[50] h-[50] border rounded-full"
          />
        </View>
        <ScrollView
          className="flex-1  w-[98%] m-2"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {apkData.length !== 0
            ? apkData.map((item, index) => renderApp(item, index))
            : null}
        </ScrollView>
      </View>
    </>
  );
};

export default AppDashboard;
