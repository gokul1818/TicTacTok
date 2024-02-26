import { Platform, StyleSheet } from "react-native";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { baseStyle } from "../../../utils/baseStyles/theme";
import { colors } from "../../../utils/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white_F1,
        flex: 1,
    },
    mainContainer: {
        ...baseStyle.marginVertical("3%"),
        ...baseStyle.marginHorizontal("2%"),
        ...baseStyle.screenContainer,
    },
    imgContainer: {
        width: widthPercentageToDP("90%"),
        height:
            Platform.OS === "ios"
                ? heightPercentageToDP("15%")
                : heightPercentageToDP("15%"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: heightPercentageToDP("2%"),
    },
    imgContainer1: {
        position: "absolute",
        ...baseStyle.marginVertical("4%"),
    },

    homeDescLabel: {
        ...baseStyle.font24px,
        ...baseStyle.fontWeight700,
        color: colors.white_FF,
        ...baseStyle.marginHorizontal("2%"),
        width: widthPercentageToDP("50%"),
    },
    quickBook: {
        ...baseStyle.font22px,
        color: colors.black1A,
        fontFamily: baseStyle.fontInterBold
    },
    locationImgContainer: {
        ...baseStyle.alignItemsCenter,
        marginTop: widthPercentageToDP("3%"),
        height: "16%",
    },



});
export default styles;
