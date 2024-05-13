import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { generateApk } from "../../api/generateApk";

const EditAppScreen = ({ route, navigation }) => {
  const { category, app_name, app_image } = route.params;
  const [selectTemplate, setSelectTemplate] = useState(null);

  const handleGenerateApk = async () => {
    if (selectTemplate != null) {
      console.log("Category : ", category);
      console.log("App Name : ", app_name);

      console.log("App Image : ", app_image);
      console.log("Selected Template : ", selectTemplate);
      const result = await generateApk(selectTemplate, app_name, app_image);
      console.log("Result : ", result);
      if (result.error) {
        Alert.alert("Fail", result.message);
      } else {
        Alert.alert("Success", result.message);
        navigation.navigate("AppDashboard");
      }
    } else {
      alert("Select A Template...");
    }
  };

  const handleImagePress = (image) => {
    setSelectTemplate(image);
  };

  const template = {
    Education: [
      require("../../../assets/Appify-Assets/templates/Education/template_1.png"),
      require("../../../assets/Appify-Assets/templates/Education/template_2.png"),
    ],
    Gardening: [
      require("../../../assets/Appify-Assets/templates/Gardening/template_1.png"),
      require("../../../assets/Appify-Assets/templates/Gardening/template_2.png"),
    ],
    HealthCare: [
      require("../../../assets/Appify-Assets/templates/HealthCare/template_1.png"),
      require("../../../assets/Appify-Assets/templates/HealthCare/template_2.png"),
    ],
    RealEstate: [
      require("../../../assets/Appify-Assets/templates/RealEstate/template_1.png"),
      require("../../../assets/Appify-Assets/templates/RealEstate/template_2.png"),
    ],
    Restaurant: [
      require("../../../assets/Appify-Assets/templates/Restaurant/template_1.png"),
      require("../../../assets/Appify-Assets/templates/Restaurant/template_2.png"),
    ],
  };

  return (
    <>
      <Header title={"Edit"} />
      <View className="flex-1 justify-center items-center bg-custom-primary">
        <Text className="text-white font-bold text-center mb-3">
          Select Template to Generate
        </Text>
        <View className="flex-row justify-between h-[50%] w-[80%]">
          <TouchableOpacity
            className="flex justify-center items-center w-[50%] h-[100%] p-1"
            onPress={() => handleImagePress(`/${category}/template_1`)}
          >
            <Image
              source={template[`${category}`][0]}
              className="w-[100%] h-[100%]"
              resizeMode="contain"
            />

            {selectTemplate == `/${category}/template_1` ? (
              <View className="absolute w-[90%] h-[50%] bg-black/[0.8] justify-center items-center">
                <Image
                  source={require("../../../assets/Appify-Assets/select.png")}
                  className="w-[60%] h-[50%]"
                />
              </View>
            ) : (
              ""
            )}

            {/* <View className="absolute w-[90%] h-[50%] bg-black/[0.8] justify-center items-center">
              <Image
                source={require("../../../assets/Appify-Assets/select.png")}
                className="w-[60%] h-[50%]"
              />
            </View> */}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex justify-center items-center w-[50%] h-[100%] p-1"
            onPress={() => handleImagePress(`/${category}/template_2`)}
          >
            <Image
              source={template[`${category}`][1]}
              className="w-[100%] h-[100%]"
              resizeMode="contain"
            />

            {selectTemplate == `/${category}/template_2` ? (
              <View className="absolute w-[90%] h-[50%] bg-black/[0.8] justify-center items-center">
                <Image
                  source={require("../../../assets/Appify-Assets/select.png")}
                  className="w-[60%] h-[50%]"
                />
              </View>
            ) : (
              ""
            )}

            {/* <View className="absolute w-[90%] h-[50%] bg-black/[0.8] justify-center items-center">
              <Image
                source={require("../../../assets/Appify-Assets/select.png")}
                className="w-[60%] h-[50%]"
              />
            </View> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-custom-accent/20 p-3 border rounded-md w-10/12 mt-1"
          onPress={handleGenerateApk}
        >
          <Text className="text-white font-bold text-center">Generate APK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditAppScreen;
