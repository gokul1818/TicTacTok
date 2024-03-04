import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Image, StyleSheet, View } from "react-native";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { iconpathurl } from "../../assets/iconpath";
import { colors } from "../../utils/colors";
import { baseStyle } from "../../utils/baseStyles/theme";
const SingleDropDown = ({
    value,
    setValue,
    items = [{}],
    mainContainerStyle = {},
    CustomDropDownContainerStyle = {},
    placeholder = "select"
}) => {
    const [open, setOpen] = useState(false);
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* <DropDownPicker
                open={open}
                value={value}
                dropDownDirection="bottom"
                items={items}
                setOpen={setOpen}
                scrollViewProps={{ scrollEnabled: true }}
                // setValue={setValue}
                onSelectItem={setValue}
                placeholder={placeholder}
                style={{ ...styles.mainContainer(open), ...mainContainerStyle }}
                dropDownContainerStyle={{
                    ...styles.dropDownContainerStyle,
                    ...CustomDropDownContainerStyle,
                    zIndex: 2,
                }}
                ArrowDownIconComponent={() => (
                    <Image source={iconpathurl.downArrow} style={styles.downArrowIcon} />
                )}
                ArrowUpIconComponent={() => (
                    <Image source={iconpathurl.downArrow} style={styles.upArrowIcon} />
                )}
                listItemContainerStyle={styles.listItemContainerStyle}
            /> */}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                onSelectItem={setValue}
                placeholder={placeholder}
                // containerStyle={{ height: 40, width: 200 }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                style={{ ...styles.mainContainer(open), ...mainContainerStyle }}
                dropDownContainerStyle={{
                    ...styles.dropDownContainerStyle,
                    ...CustomDropDownContainerStyle,
                    zIndex: 2,
                }}
                ArrowDownIconComponent={() => (
                    <Image source={iconpathurl.downArrow} style={styles.downArrowIcon} />
                )}
                ArrowUpIconComponent={() => (
                    <Image source={iconpathurl.downArrow} style={styles.upArrowIcon} />
                )}
                listItemContainerStyle={styles.listItemContainerStyle}
            />
        </View>

    );
};

export default SingleDropDown;

export const styles = StyleSheet.create({
    mainContainer: (open) => ({
        backgroundColor: colors.WHITE_FA,
        borderColor: open ? colors.blueCB : colors.white_F1,
        width: "100%",
        zIndex: 2,

    }),
    dropDownContainerStyle: {
        width: "100%",
        ...baseStyle.marginVertical("1%"),
        backgroundColor: colors.white,
        zIndex: 2,

    },
    downArrowIcon: {
        width: widthPercentageToDP("4%"),
        height: heightPercentageToDP("4%"),
        resizeMode: "contain",
    },
    upArrowIcon: {
        width: widthPercentageToDP("4%"),
        height: heightPercentageToDP("4%"),
        resizeMode: "contain",
        tintColor: colors.secondaryOrange,
        transform: [{ rotate: "180deg" }],
    },
    listItemContainerStyle: {
        ...baseStyle.marginVertical("0.5%"),
        borderBottomWidth: 2,
        width: "100%",
        alignSelf: "flex-end",
        borderBottomColor: colors.greyC4,


    },
});
