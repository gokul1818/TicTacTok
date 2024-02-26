

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { iconpathurl } from "../assets/iconpath";
import { SCREENS } from "../constants/screens";

import { baseStyle } from "../utils/baseStyles/theme";
import { colors } from "../utils/colors";

// Bottom Stack Part
const AppBottomStack = () => {
  const Tab = createBottomTabNavigator();
  const tabs = [
    {
      name: SCREENS.HOME,
      title: "Home",
      component: Home,
      activeIconName: iconpathurl.activeHome,
      inactiveIconName: iconpathurl.inactiveHome,

    },
 
    // {
    //   name: SCREENS.TRACK,
    //   title: "Route",
    //   component: Home,
    //   activeIconName: iconpathurl.activeTrack,
    //   inactiveIconName: iconpathurl.inactiveTrack,
    // },

  ];
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondaryOrange,
        tabBarInactiveTintColor: colors.grey31,
        tabBarLabelStyle: baseStyle.font12px,
      }}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? tab.activeIconName : tab.inactiveIconName}
                style={styles.tabBarIcon}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppBottomStack;

const styles = StyleSheet.create({
  tabBarIcon: {
    width: "75%",
    height: "75%",
    resizeMode: "contain",
  },
});
