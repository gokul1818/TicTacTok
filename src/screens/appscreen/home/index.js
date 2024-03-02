import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomSafeArea from "../../../components/customSafeArea";
import { colors } from "../../../utils/colors";
import styles from "./styles";
import { FlatList, Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../components/button";
import { baseStyle } from "../../../utils/baseStyles/theme";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";


const Home = () => {
  // Get current hour
  const [selectedRoom, setSelectedRooms] = useState("Living Room")

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
    { roomType: 'Living Room', device: '01', img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg" },
    { roomType: 'Bedroom', device: '03', img: "https://media.designcafe.com/wp-content/uploads/2023/09/20122959/simple-bedroom-interior-designs.jpg" },
    { roomType: 'Kitchen', device: '04', img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/featured-image-kitchen-layouts.jpg" },
    { roomType: 'studyRoom', device: '04', img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },

  ];
  const conectionData = [
    { deciveType: 'Fan', status: 0, img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg" },
    { deciveType: 'Light', status: 0, img: "https://media.designcafe.com/wp-content/uploads/2023/09/20122959/simple-bedroom-interior-designs.jpg" },
    { deciveType: 'Blub', status: 1, img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/featured-image-kitchen-layouts.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },
    { deciveType: 'socket', status: 1, img: "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg" },

  ];


  const handleSwitch = (item) => {

  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={
      [baseStyle.flexDirectionColumn,
      baseStyle.marginRight("1%"),
      baseStyle.marginVertical("2%"),

      baseStyle.borderRadius8px,

      baseStyle.alignItemsCenter,
      {
        borderWidth: 0.9,
        borderColor: selectedRoom == item?.roomType ? colors.secondaryOrange : "transparent",
        backgroundColor: colors.grey4D,
        height: heightPercentageToDP("18%"),
        width: widthPercentageToDP("37%")
      }
      ]}
      onPress={() => setSelectedRooms(item?.roomType)}
    >
      <Image source={{ uri: item.img }} style=
        {[
          baseStyle.marginTop("2%")
          , {
            width: 60,
            height: 60,
            borderRadius: 30
          }
        ]}
      />
      <Text style={[
        baseStyle.font16px,
        baseStyle.fontWeight600,
        baseStyle.marginTop("1%"),
        { color: colors.white_F1 }
      ]}
      >{item.roomType}</Text>
      <Text style={[
        baseStyle.font12px,
        baseStyle.fontWeight400,
        { color: colors.greyC4 }

      ]}
      > {item.device}{"Device"}</Text>
    </TouchableOpacity>
  );

  const deciverenderItem = ({ item, index }) => (
    <TouchableOpacity style={
      [baseStyle.flexDirectionColumn,
      baseStyle.marginRight("2%"),
      baseStyle.marginVertical("1%"),

      baseStyle.borderRadius8px,

      // baseStyle.alignItemsCenter,
      // baseStyle.justifyContentCenter,
      // baseStyle.alignSelfCenter,
      {
        backgroundColor: colors.grey4D,
        height: heightPercentageToDP("20%"),
        width: widthPercentageToDP("43%")
      }
      ]}

    >
      <Image source={{ uri: item.img }} style=
        {[
          baseStyle.marginTop("2%"),
          baseStyle.marginLeft("2%")
          , {
            width: 60,
            height: 60,
            borderRadius: 30
          }
        ]}
      />
      <View style={[baseStyle.flexDirectionRow, baseStyle.alignItemsFE, baseStyle.justifyContentSA, baseStyle.marginTop("2%")]}>

        <Text style={[
          baseStyle.font16px,
          baseStyle.fontWeight600,
          { color: colors.white_F1 }
        ]}
        >{item?.deciveType}</Text>

        <Switch
          value={item?.status == 1 ? true : false}
          trackColor={{
            true: colors.grey3B,
            false: colors.grey3B,
          }}
          thumbColor={
            item?.status == 1 ? colors.secondaryOrange : colors.blueEA
          }
          style={{
            borderRadius: 20,
            transform: [{ scaleX: 1 }, { scaleY: 1 }],
          }}
          onChange={(item) => handleSwitch(item)}
        />
      </View>

    </TouchableOpacity>
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
          <View>

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
              style={{ width: widthPercentageToDP("90%") }}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={[baseStyle.font24px, baseStyle.fontWeight800, { color: colors.WHITE_FA }]}>{selectedRoom} </Text>
          <View
            style={[ baseStyle.marginTop("2%")]}
            // style={{ flex: 1 }}
          >
            <FlatList
              // style={{ flex: 1 }}
              style={[
                baseStyle.alignSelfCenter,
                { width: widthPercentageToDP("90%"), 
              height:heightPercentageToDP("53%")
              }, // Adjusting width using widthPercentageToDP
              ]}
              data={conectionData}
              renderItem={deciverenderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              horizontal={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      {/* <Button isPrimaryButton btnLabel={"ON"} /> */}
    </CustomSafeArea>
  );
};

export default Home;