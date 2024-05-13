import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";

const AppCreationScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [appname, setAppName] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [isPickerLoading, setIsPickerLoading] = useState(false);

  const handleAppnameChange = (text) => {
    setAppName(text);
  };
  const items = [
    { label: "Education", value: "Education" },
    { label: "Gardening", value: "Gardening" },
    { label: "Health Care", value: "HealthCare" },
    { label: "Real Estate", value: "RealEstate" },
    { label: "Restaurant", value: "Restaurant" },
  ];

  const handleSubmit = () => {
    if (selectedItem != null && appname != "" && selectedImage != null) {
      console.log("Selected Item:", selectedItem);
      console.log("App Name:", appname);
      navigation.navigate("Edit", {
        category: selectedItem.value,
        app_name: appname,
        app_image: selectedImage,
      });
    } else {
      alert("Please Select all the Details....");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)}>
      <View className={`p-2 bg-custom-accent/20`}>
        <Text className="text-white">{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleImagePicker = async () => {
    if (isPickerLoading) return; // Prevent multiple presses

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    try {
      setIsPickerLoading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        Alert.alert(
          "Operation Cancelled",
          "Image picker operation was cancelled."
        );
      } else {
        if (
          result.assets[0].type === "image" &&
          result.assets[0].uri.endsWith(".png")
        ) {
          const croppedImage = await cropImage(result.assets[0].uri);
          setSelectedImage(croppedImage);
        } else {
          Alert.alert("Invalid Format", "Please select a PNG image.");
        }
        setIsPickerLoading(false);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const cropImage = async (uri) => {
    const cropOptions = {
      uri,
      width: 512,
      height: 512,
      resizeMode: "contain",
    };

    const croppedImage = await manipulateAsync(cropOptions.uri, [], {
      format: "png",
      compress: 1,
      width: 512,
      height: 512,
    });

    return croppedImage.uri;
  };

  const handleClearLogo = () => {
    setSelectedImage("");
  };

  return (
    <>
      <Header title={"Create"} />
      <View className="flex-1 justify-center items-center bg-custom-primary">
        <View className="border border-custom-accent rounded-md w-80 mb-4">
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
          />
          {selectedItem && (
            <View className="p-2 ">
              <Text className="text-center text-white">
                Selected Category: {selectedItem.label}
              </Text>
            </View>
          )}
        </View>

        <TextInput
          className="border border-custom-accent rounded-md p-2 w-10/12 mb-4 text-white"
          placeholder="App Name"
          placeholderTextColor="#4AFAAB"
          value={appname}
          onChangeText={handleAppnameChange}
        />

        <TouchableOpacity
          className="bg-custom-accent/20 border-2 border-dashed w-[155] h-[155] justify-center"
          onPress={handleImagePicker}
          onLongPress={handleClearLogo}
        >
          {selectedImage && (
            <Image
              source={{
                uri: selectedImage,
              }}
              className="w-[150] h-[150] border rounded"
            />
          )}

          {!selectedImage && (
            <Text className="text-white font-bold text-center">
              Select Logo
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-custom-accent/20 p-3 border rounded-md w-10/12 m-2"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AppCreationScreen;
