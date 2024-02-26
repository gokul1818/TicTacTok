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

const RbSheetAddBreak = ({ rbSheetRef, }) => {
  const dispatch = useDispatch()
  const decodeData = useSelector((state) => state?.authSlice?.decodeData)

  const [timerRunning, setTimerRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [breakType, setBreakType] = useState(null);
  const [breakTypeErr, setBreakTypeErr] = useState(false);
  const [reasonErr, setReasonErr] = useState(false);

  const [reason, setReason] = useState("")
  const [loader, setLoader] = useState(false)


  //onChange function
  const handleChange = (txt) => {
    setReason(txt);
    setReasonErr(false)
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

  const isFormDataValid = () => {
    if (breakType?.value) {
      setBreakTypeErr(false)
      setReasonErr(false)
      if (breakType?.value == "others" && reason == "") {
        setReasonErr(true)
        return false;
      }
      startTimer()
      return true;
    } else {
      if (breakType?.value == "others") {
        setBreakTypeErr(true)
        setReasonErr(true)
        return false;
      }
      else {
        setBreakTypeErr(true)
        return false;

      }
    }
  };

  const handleAddBreak = async () => {
    try {
      setLoader(true);
      stopTimer()
      let body = {
        driverId: decodeData?.driverId,
        bookingId: bookingId,
        breakType: breakType?.value,
        reason: reason || null,
        hh: String(hours),
        mm: String(minutes),
        ss: String(seconds)
      };
      /* api call done here */
      const response = await addBreakPostApi(body);
      if (response?.status === 200) {
        resetTimer()
        setTimeout(() => {
          rbSheetRef.current.close();
          setBreakType(null)
          setReason("")
          setLoader(false);
        }, 1000);
      }
    } catch (error) {
      setLoader(false);

      if (error.response) {
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getReasonType());
  }, [])
  return (
    <RBSheet
      ref={rbSheetRef}
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

        <View style={[baseStyle.flexDirectionRow, baseStyle.alignItemsCenter, baseStyle.marginTop("1%")]}>
          <TouchableOpacity onPress={() => rbSheetRef.current.close()}>

            <Image style={{width:widthPercentageToDP("15%"), height:widthPercentageToDP("10%")}} resizeMode="contain" source={iconpathurl.backScreen} />
          </TouchableOpacity>
          <Text style={[baseStyle.font18px, baseStyle.fontWeight700]}> {strings.addBreakHalt}</Text>
        </View>
        <View style={[baseStyle.marginVertical("2%"), { zIndex: 20 }]}>
          <Text style={[baseStyle.font16px, baseStyle.fontWeight500, baseStyle.marginBottom("1%"), { color: colors.black31 }]}>{strings.typeOfBreak}</Text>
          <SingleDropDown
            value={breakType?.value}
            setValue={(x) => { setBreakType(x); setBreakTypeErr(false) }}
            items={breakData}
            // mainContainerStyle={styles.dropdownMainContainer}

            CustomDropDownContainerStyle={styles.dropdownMainContainer}
          />
          {breakTypeErr && <Text style={{ color: colors.red }}>{errorMsg.typeOfBreak}</Text>}
        </View>
        <View style={[baseStyle.marginVertical("1%")]}>
          <Text style={[baseStyle.font16px, baseStyle.fontWeight500, baseStyle.marginBottom("1%"), { color: colors.black31 }]}>{strings.typeReason}</Text>
          <TextInputComponent
            containerStyle={styles.textInput}
            onChangeText={(txt) => handleChange(txt)}
            value={reason}
            inputTextStyle
            placeholder={strings.enterHereDot}
            disabled={!timerRunning}
          />
          {reasonErr && <Text style={{ color: colors.red }}>{errorMsg.typeOfReason}</Text>}
        </View>
        <View style={styles.btnContainer}>
          <Button
            isSecondaryButton={true}
            btnLabel={strings.endTimer}
            buttonStyle={styles.buttonStyle}
            onPress={handleAddBreak}
            disabled={!timerRunning}
          />
          <Button
            isPrimaryButton={true}
            btnLabel={strings.startTimer}
            buttonStyle={styles.buttonStyle}
            // disabled={!isFormDataValid()}
            onPress={isFormDataValid}
          />
        </View>
      </ScrollView>

      {/* <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.mainContainer}>
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

            <View style={[baseStyle.flexDirectionRow, baseStyle.alignItemsCenter, baseStyle.marginTop("1%")]}>
              <TouchableOpacity onPress={() => rbSheetRef.current.close()}>

                <Image source={iconpathurl.backScreen} />
              </TouchableOpacity>
              <Text style={[baseStyle.font18px, baseStyle.fontWeight700]}> {strings.addBreakHalt}</Text>
            </View>
            <View style={[baseStyle.marginVertical("2%"), { zIndex: 20 }]}>
              <Text style={[baseStyle.font16px, baseStyle.fontWeight500, baseStyle.marginBottom("1%"), { color: colors.black31 }]}>{strings.typeOfBreak}</Text>
              <SingleDropDown
                value={breakType?.value}
                setValue={(x) => { setBreakType(x); setBreakTypeErr(false) }}
                items={breakData}
                // mainContainerStyle={styles.dropdownMainContainer}

                CustomDropDownContainerStyle={styles.dropdownMainContainer}
              />
              {breakTypeErr && <Text style={{ color: colors.red }}>{errorMsg.typeOfBreak}</Text>}
            </View>
            <View style={[baseStyle.marginVertical("1%")]}>
              <Text style={[baseStyle.font16px, baseStyle.fontWeight500, baseStyle.marginBottom("1%"), { color: colors.black31 }]}>{strings.typeReason}</Text>
              <TextInputComponent
                containerStyle={styles.textInput}
                onChangeText={(txt) => handleChange(txt)}
                value={reason}
                inputTextStyle
                placeholder={strings.enterHereDot}
                disabled={!timerRunning}
              />
              {reasonErr && <Text style={{ color: colors.red }}>{errorMsg.typeOfReason}</Text>}
            </View>
            <View style={styles.btnContainer}>
              <Button
                isSecondaryButton={true}
                btnLabel={strings.endTimer}
                buttonStyle={styles.buttonStyle}
                onPress={handleAddBreak}
                disabled={!timerRunning}
              />
              <Button
                isPrimaryButton={true}
                btnLabel={strings.startTimer}
                buttonStyle={styles.buttonStyle}
                // disabled={!isFormDataValid()}
                onPress={isFormDataValid}
              />
            </View>
          </View>
        )}

      /> */}
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
    // width:widthPercentageToDP("90%"),
    // alignSelf: "center"
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
        ? widthPercentageToDP("23%")
        : widthPercentageToDP("21%"),
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
