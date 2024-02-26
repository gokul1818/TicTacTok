import { Platform, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { baseStyle } from "../../utils/baseStyles/theme";
const styles = StyleSheet.create({
  primaryblueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: wp("4%"),
    paddingLeft: wp("4%"),
    borderRadius: widthPercentageToDP("2%"),
    backgroundColor: colors.primaryViolet,
    width: wp("30%"),
    ...baseStyle.alignItemsCenter,
    ...baseStyle.justifyContentCenter,
    height: Platform.OS === "android" ? hp("20%") : hp("6%"),

    color: colors.white_FF,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: wp("4%"),
    paddingLeft: wp("4%"),
    borderRadius: widthPercentageToDP("4%"),
    backgroundColor: "transparent",
    width: wp("90%"),
    height: hp("4%"),
    marginTop: wp('2%'),
    color: colors.white_FF,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: wp("4%"),
    paddingLeft: wp("4%"),
    borderRadius: widthPercentageToDP("4%"),
    backgroundColor: "transparent",
    // width: wp("auto"),
    width: "100%",
    height: hp("4%"),
    color: colors.primaryViolet,
    borderColor: colors.primaryViolet,
    borderWidth: 1,
  },
  icon: {
    width: wp("6%"),
    height: wp("6%"),
    resizeMode: "contain",
  },
  whiteBtnColor: {
    color: colors.white_FF,
    // width: widthPercentageToDP("20%"),
    // height: hp("10%"),
    ...baseStyle.font20px,
    fontFamily: baseStyle.fontInterSemiBold,
  },
  VioletBtnColor: {
    color: colors.primaryViolet,

    fontSize: 16,
    fontFamily: baseStyle.fontInterSemiBold,
  },
});

export default styles;
