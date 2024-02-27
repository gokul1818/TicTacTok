import { Platform, StyleSheet } from "react-native";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { baseStyle } from "../../../utils/baseStyles/theme";
import { colors } from "../../../utils/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.grey3B,
        flex: 1,
    },
    mainContainer: {
        width:widthPercentageToDP("90%"),
        ...baseStyle.marginVertical("2%"),
        // ...baseStyle.marginHorizontal("2%"),
        ...baseStyle.screenContainer,
        ...baseStyle.alignSelfCenter
    },
    headerContainer:[
        baseStyle.flexDirectionColumn,
        baseStyle.marginBottom("1%"),
    ]



});
export default styles;
