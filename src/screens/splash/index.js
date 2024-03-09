import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { iconpathurl } from "../../assets/iconpath";
import { SCREENS } from "../../constants/screens";
import NavigationServices from "../../navigation/NavigationServices";
import CustomSafeArea from "../../components/customSafeArea";
import { colors } from "../../utils/colors";

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      NavigationServices.navigate(SCREENS.HOME);
    }, 1000);
  }, []);
  return (
    <CustomSafeArea backgroundColor={colors.grey3B}>
      <Image source={iconpathurl.splashLogo} style={styles.imgStyle} />
    </CustomSafeArea>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imgStyle: {
    height: "100%",
    width: "100%",
    resizeMode:"contain",
    backgroundColor:colors.grey3B
  },
});
