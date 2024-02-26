import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, BackHandler, Alert } from "react-native";
import { iconpathurl } from "../../assets/iconpath";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import CircularProgress from "react-native-circular-progress-indicator";
import Button from "../../components/button";
import NavigationServices from "../../navigation/NavigationServices";
import { SCREENS } from "../../constants/screens";
import CustomSafeArea from "../../components/customSafeArea";
import styles from "./styles";
import { baseStyle } from "../../utils/baseStyles/theme";
import { strings } from "../../constants/strings";
import { allowNotification, loginSucess, updateUserStatus } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/selectors";

const OnboardingScreenComp = ({
  navigation,
  onboardingData,
  currentPage,
  notify = false,
  setCurrentPage = () => { },
}) => {
  const isNewUser = useSelector((state) => state?.authSlice?.isNewUser);
  //accessing notification
  const isNotifyStatus = getToken()
  //dispatch
  const dispatch = useDispatch()

  //onBoarding continue btn
  const onContinue = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navigate to the next screen or perform any other action
      // For simplicity, we are just logging a message
      console.log("Continue button pressed");
    }
  };
  //isNotification api call 
  const handleNotifyApi = async (data) => {
    try {
      let body = {
        notificationPreference: data
      };
      const res = await allowNotification(body);
      if (res?.status === 200) {
        console.log(res?.message, "message");
        dispatch(loginSucess(res?.data?.notificationPreference === true ? true : false))
        toast.show(res?.message, { type: "success" });
        NavigationServices.navigate(SCREENS.BOTTOMNAVIGATION)
      }
    } catch (error) {
      console.error(error, "login Error");
    }

  };

  const handleLoginScreen = () => {
    setCurrentPage(onboardingData.length - 1);
    if (notify) {
      NavigationServices.navigate(SCREENS.BOTTOMNAVIGATION)
    } else {
      NavigationServices.navigate(SCREENS.LOGIN);

    }


    // console.log("update data");
  };


  return (
    <CustomSafeArea backgroundColor={colors.orangeAB} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.slide}>
          <Image source={iconpathurl.VeloLogo} alt="Logo" style={styles.logo} />
          {currentPage !== onboardingData.length - 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleLoginScreen}
            >
              <Text style={styles.skipButtonLabel}>Skip</Text>
            </TouchableOpacity>
          )}
          {notify && currentPage === onboardingData.length - 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleLoginScreen}
            >
              <Text style={styles.skipButtonLabel}>Skip</Text>
            </TouchableOpacity>
          )}

          <Image
            source={onboardingData[currentPage].image}
            alt="Image"
            style={notify !== true ? styles.image : styles.notifyImg}
          />
          <View>
            <Text style={notify ? styles.notifytitle : styles.title}>
              {onboardingData[currentPage].title}
            </Text>
            <Text style={styles.description}>
              {onboardingData[currentPage].description}
            </Text>
          </View>
        </View>

        {(currentPage < onboardingData.length && !notify) && (
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentPage ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.progressCircle}>
            {currentPage !== onboardingData.length - 1 && (
              <CircularProgress
                value={currentPage == 0 ? -35 : currentPage == 1 ? -70 : -100}
                radius={widthPercentageToDP("7.9%")}
                duration={1000}
                progressValueColor={"#ecf0f1"}
                maxValue={100}
                inActiveStrokeWidth={3}
                activeStrokeWidth={3}
                activeStrokeColor={colors.primaryViolet}
                inActiveStrokeColor={colors.grey95}
                titleColor={"transparent"}
                titleStyle={{
                  fontWeight: "bold",
                }}
              >
                <Image source={iconpathurl.onBoardingNextBtn} />
              </CircularProgress>
            )}
          </View>

          <View style={notify && styles.allowContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
            >
              <View>
                {currentPage === onboardingData.length - 1 ? (
                  <View>
                    <Button
                      btnLabel={notify ? strings.allow : "Get Started"}
                      isPrimaryButton
                      onPress={() => notify ? handleNotifyApi(true) : handleLoginScreen()}
                    />
                  </View>
                ) : (
                  <Image source={iconpathurl.onBoardingNextBtn} />
                )}
              </View>
              {notify && <View >
                <Button
                  btnLabel={strings.otherTime}
                  isEmptyButton
                  // onPress={() => handleLoginScreen()}
                  onPress={() => handleNotifyApi(false)}
                />
              </View>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default OnboardingScreenComp;
