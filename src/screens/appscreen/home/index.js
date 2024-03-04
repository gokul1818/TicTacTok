import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomSafeArea from "../../../components/customSafeArea";
import { colors } from "../../../utils/colors";
import styles from "./styles";
import { FlatList, Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../components/button";
import { baseStyle } from "../../../utils/baseStyles/theme";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../../database/firebaseConfig';
import RbSheetAddBreak from "../../../components/rbSheetAddBreak";
import { iconpathurl } from "../../../assets/iconpath";
import SingleDropDown from "../../../components/singleDropdown";

const Home = () => {
  // Get current hour
  const rbSheetRef = useRef();

  const [selectedRoom, setSelectedRooms] = useState({})
  const [breakType, setBreakType] = useState(null);

  const [data, setData] = useState([])
  const [device, setDevice] = useState([{
    roomType: "LivingRoom1",
    img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg",
    decives: [
      {
        deviceType: 'Fan',
        status: 1,
        img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg",
        "12": 1,
      },
      {
        deviceType: 'Fan',
        status: 1,
        img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg",
        "13": 1,

      },
      {
        deviceType: 'Fan',
        status: 1,
        img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg",
        "14": 1
      },
    ]
  },
  ])


  const breakTypeData = [
    { value: "1", label: "D01" },
    { value: "2", label: "D02" },
    { value: "3", label: "D03" },
    { value: "4", label: "D04" },
    { value: "5", label: "D05" },
    { value: "6", label: "D06" },
    { value: "7", label: "D07" },
    { value: "8", label: "D08" },
    { value: "9", label: "D09" },
    { value: "10", label: "D10" },
    { value: "11", label: "D11" },
    { value: "12", label: "D12" },
    { value: "13", label: "D13" },
    { value: "14", label: "D14" },
  ]

  // set data in fb database
  const addOnData = () => {
    // rbSheetRef.current.open();
    try {
      // Set the data for the 'livingRoom' document under the 'board1' collection
      setDevice([...device, device[device.length - 1]])
      set(ref(db, 'board1/device'), {
        device
      });
    } catch (error) {
      console.error("Error occurred:", error);
      console.error("Error stack trace:", error.stack);
    }
  };

  const fetchData = useCallback(() => {
    const reference = ref(db, 'board1/device/device');
    onValue(reference, (snapshot) => {
      const boardData = snapshot.val();
      setDevice(boardData);
    });

    return () => {

      reference.off('value');
    };
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
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



  const updateDeviceStatus = (roomIndex, deviceIndex, device) => {
    try {
      // Create a copy of the device data
      const updatedDeviceData = JSON.parse(JSON.stringify(device));
      // Update the status of the device at the specified roomIndex and deviceIndex
      console.log(updatedDeviceData)
      updatedDeviceData.status =
        updatedDeviceData.status === 1 ? 0 : 1;

      // Set additional properties "12", "13", or "14" based on deviceIndex
      const additionalProperty = deviceIndex === 0 ? "12" : deviceIndex === 1 ? "13" : "14";
      updatedDeviceData[additionalProperty] =
        updatedDeviceData[additionalProperty] === 1 ? 0 : 1;

      console.log(updatedDeviceData)
      // Update the device data state
      // setDevice(updatedDeviceData);
      console.log(device, "device");

      // Update the device status in the database
      set(ref(db, `board1/device/device/${roomIndex}/decives/${deviceIndex}`), {
        ...updatedDeviceData
      });
      fetchData()

      console.log('Device status updated successfully.');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleEdit = (roomIndex, deviceIndex, device) => {
    const dataToPass = {
      roomIndex: roomIndex,
      deviceIndex: deviceIndex,
      device: device
    };
    rbSheetRef.current.open(dataToPass);
  };


  const renderItem = ({ item, index }) => (


    <TouchableOpacity style={
      [baseStyle.flexDirectionColumn,
      baseStyle.marginRight("1%"),
      baseStyle.marginVertical("2%"),

      baseStyle.borderRadius8px,

      baseStyle.alignItemsCenter,
      {
        borderWidth: 0.9,
        borderColor: selectedRoom?.item == item?.roomType ? colors.secondaryOrange : "transparent",
        backgroundColor: colors.grey4D,
        height: heightPercentageToDP("18%"),
        width: widthPercentageToDP("37%")
      }
      ]}
      onPress={() => setSelectedRooms({ item: item?.roomType, index })}
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
      ]}>
        {item.device && `${item.device.length} Device`}
      </Text>
    </TouchableOpacity>
  );
  const deciverenderItem = ({ item }) => {
    return (
      <FlatList
        data={item}
        numColumns={2}
        keyExtractor={(device, deviceIndex) => deviceIndex.toString()} // Change 'deviceIndex' to whatever unique identifier you have for each device
        renderItem={({ item: device, index: deviceIndex }) => (
          <TouchableOpacity
            key={deviceIndex}

            style={[
              baseStyle.flexDirectionColumn,
              baseStyle.marginRight("2%"),
              baseStyle.marginVertical("1%"),
              baseStyle.borderRadius8px,
              {
                backgroundColor: colors.grey4D,
                height: heightPercentageToDP("20%"),
                width: widthPercentageToDP("43%")
              }
            ]}
          >
            <View>
              <Image
                source={{ uri: device.img }}
                style={[
                  baseStyle.marginTop("2%"),
                  baseStyle.marginLeft("2%"),
                  {
                    width: 60,
                    height: 60,
                    borderRadius: 30
                  }
                ]}
              />
              <TouchableOpacity onPress={() => handleEdit(selectedRoom?.index, deviceIndex, device)} style={[{ position: "absolute", right: 10, top: 5, width: widthPercentageToDP("5%"), height: heightPercentageToDP("5%") }]}>

                <Image source={iconpathurl.editIcon} style={[{ position: "absolute", right: 15, top: 5, width: widthPercentageToDP("5%"), height: heightPercentageToDP("5%") }]} resizeMode="contain" />
              </TouchableOpacity>
              <View style={[baseStyle.flexDirectionRow, baseStyle.alignItemsFE, baseStyle.justifyContentSA, baseStyle.marginTop("2%")]}>
                <Text style={[
                  baseStyle.font16px,
                  baseStyle.fontWeight600,
                  { color: colors.white_F1 }
                ]}>
                  {device.deviceType}
                </Text>
                <Switch
                  value={device.status === 1 ? true : false}
                  trackColor={{
                    true: colors.grey3B,
                    false: colors.grey3B,
                  }}
                  thumbColor={
                    device.status === 1 ? colors.secondaryOrange : colors.blueEA
                  }
                  style={{
                    borderRadius: 20,
                    transform: [{ scaleX: 1 }, { scaleY: 1 }],
                  }}
                  onChange={() => updateDeviceStatus(selectedRoom?.index, deviceIndex, device)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };



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
          {/* <SingleDropDown
            value={breakType?.value}
            setValue={(x) => { setBreakType(x) }}
            items={breakTypeData}
            // mainContainerStyle={styles.dropdownMainContainer}
            CustomDropDownContainerStyle={styles.dropdownMainContainer}
          /> */}
            <View style={[baseStyle.flexDirectionColumn, baseStyle.marginTop("2%")]}>
              <View style={[baseStyle.flexDirectionRow, baseStyle.justifyContentSB, baseStyle.alignItemsCenter]}>
                <Text style={[baseStyle.font24px, baseStyle.fontWeight800, { color: colors.WHITE_FA }]}>Your Rooms</Text>
                <TouchableOpacity onPress={() => addOnData()} style={[{ backgroundColor: colors.secondaryOrange, borderRadius: 20, width: widthPercentageToDP("13%"), height: widthPercentageToDP("6%") }, baseStyle.flexDirectionRow, baseStyle.justifyContentCenter, baseStyle.alignItemsCenter]}>
                  <Text style={[baseStyle.font14px, baseStyle.fontWeight600, { color: colors.WHITE_FA }, baseStyle.marginRight("0.5%")]}>+</Text>
                  <TouchableOpacity >
                    <Text style={[baseStyle.font14px, baseStyle.fontWeight600, { color: colors.WHITE_FA }]}>Add</Text>
                  </TouchableOpacity>

                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              style={{ width: widthPercentageToDP("90%") }}
              data={device}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={[baseStyle.font24px, baseStyle.fontWeight800, { color: colors.WHITE_FA }]}>{selectedRoom?.item} </Text>
          <View
            style={[baseStyle.marginTop("2%")]}
          // style={{ flex: 1 }}
          >

            <FlatList
              // style={{ flex: 1 }}
              style={[
                baseStyle.alignSelfCenter,
                {
                  width: widthPercentageToDP("90%"),
                  height: heightPercentageToDP("53%")
                }, // Adjusting width using widthPercentageToDP
              ]}
              data={device?.filter((x) => selectedRoom?.item === x.roomType)?.map((x) => x.decives) || []}
              renderItem={deciverenderItem}
              keyExtractor={(item, index) => index.toString()}
            // numColumns={2}
            // horizontal={false}
            // showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <RbSheetAddBreak rbSheetRef={rbSheetRef} data={data} />
      {/* <Button isPrimaryButton btnLabel={"ON"} /> */}
    </CustomSafeArea>
  );
};

export default Home;