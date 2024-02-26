import { Platform, StyleSheet } from 'react-native';
import { baseStyle } from "../../utils/baseStyles/theme";
import { colors } from "../../utils/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white
  },
  logo: {
    position: "absolute",
    top: "5%",
    left: "2%",
    zIndex: 10,
    width: wp("30%"),
    height: hp("3%"),
    resizeMode: "contain",
  },
  skipButton: {
    position: "absolute",
    top: "5%",
    right: "8%",
    zIndex: 10,
  },
  skipButtonLabel: {
    color: colors.primaryViolet,
    ...baseStyle.font16px,
    ...baseStyle.fontWeight600,
  },
  slide: {
    flex: 1,
    ...baseStyle.alignItemsCenter,
    ...baseStyle.justifyContentFS,
  },
  image: {
    flex: 1,
    width: wp("100%"),
    height: hp("68%"),
    resizeMode: "stretch",
  },
  notifyImg: {
    width: wp("100%"),
    height: hp("60%"),
    resizeMode: "stretch",
  },
  title: {
    ...baseStyle.font24px,
    ...baseStyle.textAlignCenter,
    ...baseStyle.fontWeight700,
    ...baseStyle.marginVertical("2%"),
    color: colors.black,
  },
  notifytitle: {
    ...baseStyle.font24px,
    ...baseStyle.textAlignCenter,
    ...baseStyle.fontWeight700,
    ...baseStyle.marginVertical("1.7%"),
    color: colors.black,
  },
  description: {
    ...baseStyle.font14px,
    ...baseStyle.fontWeight400,
    ...baseStyle.textAlignCenter,
    ...baseStyle.marginHorizontal("8%"),
    color: colors.grey63,
  },

  pagination: {
    flex: 0.05,
    ...baseStyle.flexDirectionRow,
    ...baseStyle.alignItemsCenter,
    ...baseStyle.justifyContentCenter,
    color: colors.secondaryOrange,
  },
  paginationDot: {
    width: wp("5%"),
    height: hp("0.5%"),
    ...baseStyle.borderRadius4px,
    backgroundColor: colors.grey63,
    marginHorizontal: 7,
  },
  paginationDotActive: {
    backgroundColor: colors.secondaryOrange,
    height: hp("0.5%"),
    width: wp("9%"),
  },
  buttonContainer: {
    flex: 0.15,
    ...baseStyle.flexDirectionRow,
    ...baseStyle.alignItemsCenter,
    ...baseStyle.justifyContentCenter,
    position: "relative",
  },
  progressCircle: {
    position: "absolute",
    // bottom: hp("2.1%"),
  },

  continueButton: {
    ...baseStyle.borderRadius4px
  },
  allowContainer: { bottom: hp('2%') }
});
export default styles