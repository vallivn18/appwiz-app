import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppCreationScreen from "../../screens/CreateAppScreen/AppCreationScreen";
import EditAppScreen from "../../screens/CreateAppScreen/EditAppScreen";
import CustomizeScreen from "../../screens/CreateAppScreen/CustomizeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppDashboard from "../../screens/CreateAppScreen/AppDashboard";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      none
      screenOptions={{
        tabBarActiveTintColor: "#0C212B",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="AppDashboard"
        screenOptions={{
          tabBarActiveTintColor: "#0C212B",
          headerTintColor: "#fff",
        }}
        component={AppDashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AppCreation"
        screenOptions={{
          tabBarActiveTintColor: "#0C212B",
          headerTintColor: "#fff",
        }}
        component={AppCreationScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="creation" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditAppScreen}
        options={{
          tabBarLabel: "Edit",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="application-edit"
              color={color}
              size={size}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="Customize"
        component={CustomizeScreen}
        options={{
          tabBarLabel: "Customize",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="pencil-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
