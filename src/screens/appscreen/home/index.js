import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomSafeArea from "../../../components/customSafeArea";
import { colors } from "../../../utils/colors";
import styles from "./styles";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../components/button";
import { baseStyle } from "../../../utils/baseStyles/theme";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";


const Home = () => {
  // Get current hour
  const currentHour = new Date().getHours();
  let greetingMessage;

  // Determine the greeting based on the current hour
  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning 👋🏻';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = 'Good Afternoon 🤗';
  } else if (currentHour >= 17 && currentHour < 21) {
    greetingMessage = 'Good Evening 🫡';
  } else {
    greetingMessage = 'Good Night 😴';
  }

  const data = [
    { roomType: 'Living Room', device: '01',img:"https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg" },
    { roomType: 'Bedroom', device: '03',img:"" },
    { roomType: 'Kitchen', device: '04' },
    { roomType: 'studyRoom', device: '04' },

  ];

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, margin: 10 }}>
      <Text style={{ fontSize: 16 }}>{item.roomType}</Text>
      <Text style={{ fontSize: 14 }}>{item.device}</Text>
    </View>
  );

  return (
    <CustomSafeArea style={styles.container} backgroundColor={colors.grey3B}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>

          <View style={styles.headerContainer}>
            <Text style={[baseStyle.font26px, baseStyle.fontWeight700, { color: colors.white_FF, fontFamily: "robo" }]}>
              {greetingMessage}
            </Text>
            <Text style={[baseStyle.font14px, baseStyle.fontWeight400, { color: colors.WHITE_FA }]}>
              Welcome to Home
            </Text>
          </View>
          <View style={[baseStyle.flexDirectionColumn, baseStyle.marginTop("2%")]}>
            <View style={[baseStyle.flexDirectionRow, baseStyle.justifyContentSB, baseStyle.alignItemsCenter]}>
              <Text style={[baseStyle.font24px, baseStyle.fontWeight800, { color: colors.WHITE_FA }]}>Your Rooms</Text>
              <TouchableOpacity style={[{ backgroundColor: colors.secondaryOrange, borderRadius: 20, width: widthPercentageToDP("13%"), height: widthPercentageToDP("6%") }, baseStyle.flexDirectionRow, baseStyle.justifyContentCenter, baseStyle.alignItemsCenter]}>
                <Text style={[baseStyle.font14px, baseStyle.fontWeight600, { color: colors.WHITE_FA }, baseStyle.marginRight("0.5%")]}>+</Text>
                <Text style={[baseStyle.font14px, baseStyle.fontWeight600, { color: colors.WHITE_FA }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      </View>

      <Button isPrimaryButton btnLabel={"ON"} />
    </CustomSafeArea>
  );
};

export default Home;