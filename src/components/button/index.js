import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
//styles
import styles from "./styles";
import { baseStyle } from "../../utils/baseStyles/theme";
import { iconpathurl } from "../../assets/iconpath";
//component
//constant

export default function Button(props) {
  //props
  const {
    onPress = () => {
      //This is intentional
    },
    btnLabel = "",
    textColor = {},
    disabled = false,
    buttonStyle = {},
    isPrimaryButton = false,
    isEmptyButton = false,
    isSecondaryButton = false,
    activeOpacity = 0.7,
  } = props;

  return (
    <TouchableOpacity
      style={[
        isPrimaryButton
          ? styles.primaryblueButton
          : isEmptyButton
            ? styles.emptyButton
            : isSecondaryButton
              ? styles.secondaryButton
              : styles.secondaryButton,
        { ...buttonStyle },
      ]}
      onPress={onPress}

    >
      {/* <Image source={iconpathurl.editIcon} /> */}
      {Boolean(btnLabel) && (
        <View

          style={[
            baseStyle.alignItemsCenter, baseStyle.justifyContentCenter, 
          ]}>
          <Text
            style={[
              isPrimaryButton
                ? styles.whiteBtnColor
                : isEmptyButton
                  ? styles.VioletBtnColor
                  : isSecondaryButton
                    ? styles.VioletBtnColor
                    : styles.whiteBtnColor,
              { ...textColor },
            ]}
          >
            {btnLabel}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
