import { View, Text, Image, ImageBackground, StyleSheet, Platform, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { iconpathurl } from "../../assets/iconpath";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { baseStyle, horizontal } from "../../utils/baseStyles/theme";
import { errorMsg, strings } from "../../constants/strings";
import SingleDropDown from "../singleDropdown";
import TextInputComponent from "../TextInput";
import Button from "../button";
import BackgroundTimer from 'react-native-background-timer';
import { err } from "react-native-svg";
import ActivityLoader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { ref, set } from "firebase/database";
import { db } from "../../database/firebaseConfig";

const RbSheetAddBreak = ({ rbSheetRef, }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [data, setData] = useState({})
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [breakType, setBreakType] = useState(null);
  const [breakTypeErr, setBreakTypeErr] = useState(false);
  const [reasonErr, setReasonErr] = useState(false);

  const [deviceName, setDeviceName] = useState(data?.deviceType)
  const [loader, setLoader] = useState(false)

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

  //onChange function
  const handleChange = (txt) => {
    setDeviceName(txt);
  };



  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = BackgroundTimer.setInterval(() => {
        if (seconds === 59) {
          if (minutes === 59) {
            setHours((prevHours) => prevHours + 1);
            setMinutes(0);
          } else {
            setMinutes((prevMinutes) => prevMinutes + 1);
          }
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    };

    const stopTimer = () => {
      BackgroundTimer.clearInterval(timerId);
    };

    if (timerRunning) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [timerRunning, seconds, minutes]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };



  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0)
    setTimerRunning(false);
  };

  const handleOpen = (data) => {
    console.log('Data received in RBSheet:', data);
    setData(data)
    // Use the received data as needed
  };

  // const isFormDataValid = () => {
  //   if (breakType?.value) {
  //     setBreakTypeErr(false)
  //     setReasonErr(false)
  //     if (breakType?.value == "others" && deviceName == "") {
  //       setReasonErr(true)
  //       return false;
  //     }
  //     startTimer()
  //     return true;
  //   } else {
  //     if (breakType?.value == "others") {
  //       setBreakTypeErr(true)
  //       setReasonErr(true)
  //       return false;
  //     }
  //     else {
  //       setBreakTypeErr(true)
  //       return false;

  //     }
  //   }
  // };

  // const handleAddBreak = async () => {
  //   try {
  //     setLoader(true);
  //     stopTimer()
  //     let body = {
  //       driverId: decodeData?.driverId,
  //       bookingId: bookingId,
  //       breakType: breakType?.value,
  //       deviceName: deviceName || null,
  //       hh: String(hours),
  //       mm: String(minutes),
  //       ss: String(seconds)
  //     };
  //     /* api call done here */
  //     const response = await addBreakPostApi(body);
  //     if (response?.status === 200) {
  //       resetTimer()
  //       setTimeout(() => {
  //         rbSheetRef.current.close();
  //         setBreakType(null)
  //         setReason("")
  //         setLoader(false);
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     setLoader(false);

  //     if (error.response) {
  //     } else {
  //       console.error("An unexpected error occurred:", error.message);
  //     }
  //   }
  // };
  useEffect(() => {
    setDeviceName(data?.device?.deviceType)
  }, [data])



  const handleSave = () => {
    try {
      const updatedDeviceData = JSON.parse(JSON.stringify(data?.device));
      updatedDeviceData.deviceType = deviceName;
      console.log(updatedDeviceData)
      // Set additional properties "12", "13", or "14" based on deviceIndex
      // const additionalProperty = deviceIndex === 0 ? "12" : deviceIndex === 1 ? "13" : "14";
      // updatedDeviceData[additionalProperty] =
      //   updatedDeviceData[additionalProperty] === 1 ? 0 : 1;

      console.log(updatedDeviceData)
      set(ref(db, `board1/device/device/${data?.roomIndex}/decives/${data?.deviceIndex}`), {
        ...updatedDeviceData
      });
      // fetchData()
      rbSheetRef.current.close()


      console.log('Device status updated successfully.');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <RBSheet
      ref={rbSheetRef}
      onOpen={(args) => handleOpen(args)}
      height={Platform.OS === "ios" ? heightPercentageToDP("53%") : heightPercentageToDP("55%")}
      openDuration={250}
      closeOnPressMask={false}
      customStyles={{
        container: styles.rbContainer,
      }}
    >
      <ScrollView style={styles.mainContainer}>
        <View style={styles.counterContainer}>
          <View style={styles.hoursContainer}>
            <Text style={timerRunning ? styles.activeHoursLabel : styles.hoursLabel}>
              {hours < 10 ? `0${hours}` : hours}
            </Text>
            <Text style={timerRunning ? styles.activeMinutesLabelSuffix : styles.minutesLabelSuffix}>
              hr
            </Text>
          </View>
          <Text style={timerRunning ? styles.activeHoursLabel : styles.hoursLabel}>:</Text>
          <View style={styles.minsContainer}>
            <Text style={timerRunning ? styles.activeHoursLabel : styles.hoursLabel}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </Text>
            <Text style={timerRunning ? styles.activeMinutesLabelSuffix : styles.minutesLabelSuffix}>
              min
            </Text>
          </View>
          <Text style={timerRunning ? styles.activeHoursLabel : styles.hoursLabel}>:</Text>
          <View style={styles.minsContainer}>
            <Text style={timerRunning ? styles.activeHoursLabel : styles.hoursLabel}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
            <Text style={timerRunning ? styles.activeMinutesLabelSuffix : styles.minutesLabelSuffix}>
              sec
            </Text>
          </View>
        </View>

        <View style={[baseStyle.flexDirectionRow, baseStyle.alignItemsCenter, baseStyle.justifyContentFS, baseStyle.marginTop("1%")]}>
          <TouchableOpacity onPress={() => rbSheetRef.current.close()}>
            <Image style={{ width: widthPercentageToDP("10%"), height: widthPercentageToDP("10%") }} resizeMode="contain" source={iconpathurl.backScreen} />
          </TouchableOpacity>
          <Text style={[baseStyle.font18px, baseStyle.fontWeight700]}> {"Edit"} {data?.deviceType}</Text>
        </View>


        <View style={[baseStyle.marginVertical("1%")]}>
          <Text style={[baseStyle.font16px, baseStyle.fontWeight500, baseStyle.marginBottom("1%"), { color: colors.black31 }]}>{"DeviceName"}</Text>
          <TextInputComponent
            containerStyle={styles.textInput}
            onChangeText={(txt) => handleChange(txt)}
            value={deviceName}
            inputTextStyle
            placeholder={strings.enterHereDot}
            disabled={!timerRunning}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            isSecondaryButton={true}
            btnLabel={strings.addBreak}
            buttonStyle={styles.buttonStyle}
            onPress={startTimer}
            // disabled={!timerRunning}
          />
          <Button
            isPrimaryButton={true}
            btnLabel={strings.save}
            buttonStyle={styles.buttonStyle}
            // disabled={!isFormDataValid()}
            onPress={handleSave}
          />
        </View>
      </ScrollView>


      {loader && <ActivityLoader />}


    </RBSheet>
  );
};

const styles = StyleSheet.create({
  rbContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: widthPercentageToDP('5%'),
    borderTopRightRadius: widthPercentageToDP('5%'),
    ...baseStyle.padding("2%")
  },
  mainContainer: {
    width: widthPercentageToDP("90%"),
    alignSelf: "center"
  },
  counterContainer: [
    {
      width: widthPercentageToDP("79%"),
      height: widthPercentageToDP("20%"),
      backgroundColor: colors.white_F1,
    },
    baseStyle.justifyContentSB,
    baseStyle.alignItemsCenter,
    baseStyle.flexDirectionRow,
    baseStyle.borderRadius8px,
    baseStyle.shadowBlack,
    baseStyle.alignSelfCenter,


    baseStyle.paddingHorizontal("2.5%"),

  ],
  hoursContainer: [
    baseStyle.flexDirectionRow,
    baseStyle.alignItemsFE

  ],
  minsContainer: [
    baseStyle.flexDirectionRow,
    baseStyle.alignItemsFE
  ],
  hoursLabel: [

    baseStyle.txtStyleIntersBold(
      heightPercentageToDP("5.4%"),
      colors.greyC4
    ),

    baseStyle.fontWeight700,

  ],
  activeHoursLabel: [

    baseStyle.txtStyleIntersBold(
      heightPercentageToDP("5.4%"),
      colors.black
    ),

    baseStyle.fontWeight700,

  ],
  minutesLabelSuffix: [

    baseStyle.txtStyleInterRegular(
      heightPercentageToDP("1.4%"),
      colors.greyC4
    ),

    baseStyle.fontWeight700,

  ],
  activeMinutesLabelSuffix: [

    baseStyle.txtStyleInterRegular(
      heightPercentageToDP("1.4%"),
      colors.black
    ),

    baseStyle.fontWeight700,

  ],
  dropdownMainContainer: {
    ...baseStyle.alignSelfCenter,
    zIndex: 10,
    height: widthPercentageToDP("35%"),


  },
  textInput:
  {
    backgroundColor: colors.WHITE_FA,
    height:
      Platform.OS === "ios"
        ? widthPercentageToDP("12%")
        : widthPercentageToDP("12%"),
    ...baseStyle.alignItemsFS

  },
  btnContainer: {
    marginTop: heightPercentageToDP("2%"),
    ...baseStyle.justifyContentSB,
    ...baseStyle.flexDirectionRow
  },
  buttonStyle: {
    width: widthPercentageToDP("40%"),
    height: widthPercentageToDP("13%"),
    ...baseStyle.borderRadius8px
  }



});

export default RbSheetAddBreak;
