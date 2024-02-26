// import React from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from "react-native-responsive-screen";
// import { strings } from "../../constants/strings";
// import { colors } from "../../utils/colors";
// import { baseStyle } from "../../utils/baseStyles/theme";

// const TextInputComponent = ({
//   onChangeText = () => {
//     // This is intentional
//   },
//   value = "",
//   maxLength = 250,
//   placeholder = strings.enterHere,
//   placeholderTextColor = colors.grey95,
//   keyboardType = "default",
//   containerStyle = {},
//   secureKey = false,
//   textCaptitalize = "none",
//   onPressSecure = () => {
//     // This is intentional
//   },
//   hidden = false,
//   errorTextStyle = {},
//   enableErrorMsg = false,
//   errorMsg = "",
//   inputTextStyle = {},
//   returnKeyType = "default",
//   editable = false,
//   disabled = true,
//   isCountryCode = false,
//   isPrefixValue = "",
//   isSuffixValue = ""
// }) => {
//   return (
//     <>
//       <View style={{ ...styles.container, ...containerStyle }}>
//         {isCountryCode && (
//           <Text
//             style={{
//               ...baseStyle.marginRight("1%"),
//               ...baseStyle.txtStyleInterMedium(
//                 heightPercentageToDP("1.9%"),
//                 colors.grey95
//               ),
//             }}
//           >
//             +91
//           </Text>
//         )}
//         {Boolean(isPrefixValue) && (
//           <Text
//             style={{
//               ...baseStyle.marginRight("1%"),
//               ...baseStyle.txtStyleInterMedium(
//                 heightPercentageToDP("1.9%"),
//                 value == "" ? colors.black : colors.grey95
//               ),
//             }}
//           >
//             {isPrefixValue}
//           </Text>
//         )}
//         <TextInput
//           secureTextEntry={hidden}
//           style={[
//             styles.inputStyle,
//             inputTextStyle,
//             { width: secureKey ? "90%" : "95%" },
//           ]}
//           onChangeText={(text) => onChangeText(text)}
//           maxLength={maxLength}
//           keyboardType={keyboardType}
//           autoCorrect={false}
//           placeholder={placeholder}
//           placeholderTextColor={placeholderTextColor}
//           value={value}
//           autoCapitalize={textCaptitalize}
//           returnKeyType={returnKeyType}
//           editable={disabled}
//         />
//         {secureKey && (
//           <TouchableOpacity onPress={onPressSecure} disabled={editable}>
//             {hidden ? (
//               <Text style={styles.hideshowLabel}>Show</Text>
//             ) : (
//               <Text style={styles.hideshowLabel}>Hide</Text>
//             )}
//           </TouchableOpacity>
//         )}
//       </View>
//       {enableErrorMsg && Boolean(errorMsg) && (
//         <Text style={{ ...styles.errorText, ...errorTextStyle }}>
//           {errorMsg}
//         </Text>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "row",
//     // borderWidth: 1.5,
//     // borderColor: colors.grey95,
//     borderRadius: 5,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     height:
//       Platform.OS === "ios"
//         ? widthPercentageToDP("13%")
//         : widthPercentageToDP("11%"),
//     backgroundColor: colors.greyF1,
//   },
//   inputStyle: {
//     width: "95%",
//     ...baseStyle.fontInter_medium,
//     fontSize: widthPercentageToDP("4%"),
//     textAlignVertical: "center",
//     color: colors.grey95,
//     letterSpacing: 0.18,
//     paddingVertical: 6,
//   },
//   hideshowLabel: {
//     ...baseStyle.fontInter_regular,
//     letterSpacing: 0.18,
//     color: colors.blue_B3,
//   },
//   errorText: {
//     ...baseStyle.txtStyleInterRegular(heightPercentageToDP("1.5%"), colors.red),
//     ...baseStyle.alignSelfFS,
//     ...baseStyle.marginTop("1%"),
//   },
// });

// export default TextInputComponent;





import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { strings } from "../../constants/strings";
import { colors } from "../../utils/colors";
import { baseStyle, horizontal } from "../../utils/baseStyles/theme";
import { iconpathurl } from "../../assets/iconpath";

const TextInputComponent = ({
  onChangeText = () => {
    // This is intentional
  },
  value = "",
  maxLength = 250,
  placeholder = strings.enterHere,
  placeholderTextColor = colors.grey95,
  keyboardType = "default",
  containerStyle = {},
  secureKey = false,
  textCaptitalize = "none",
  onPressSecure = () => {
    // This is intentional
  },
  hidden = false,
  errorTextStyle = {},
  enableErrorMsg = false,
  errorMsg = "",
  inputTextStyle = {},
  returnKeyType = "default",
  editable = false,
  disabled = true,
  isCountryCode = false,
  isPrefixValue = "",
  isSuffixValue = "",
  suffixIcon,
  locationImg = false
}) => {
  return (
    <>
      <View style={{ ...styles.container, ...containerStyle }}>
        {isCountryCode && (
          <Text
            style={{
              ...baseStyle.marginRight("1%"),
              ...baseStyle.txtStyleInterMedium(
                heightPercentageToDP("1.9%"),
                colors.grey95
              ),
            }}
          >
            +91
          </Text>
        )}
        {Boolean(isPrefixValue) && (
          <Text
            style={{
              ...baseStyle.marginRight("1%"),
              ...baseStyle.txtStyleInterMedium(
                heightPercentageToDP("1.9%"),
                value === "" ? colors.black : colors.grey95
              ),
            }}
          >
            {isPrefixValue}
          </Text>
        )}
        <TextInput
          secureTextEntry={hidden}
          style={[
            styles.inputStyle,
            inputTextStyle,
            { width: secureKey ? "90%" : "95%" },
            {
              width: isPrefixValue || isSuffixValue ? "75%" : "95%",
              color: value !== "" && colors.black1A,
            },
          ]}
          onChangeText={(text) => onChangeText(text)}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          autoCapitalize={textCaptitalize}
          returnKeyType={returnKeyType}
          editable={disabled}
        />
        {Boolean(suffixIcon) && (
          <Image
            source={suffixIcon}
            style={{
              width: widthPercentageToDP("5%"),
              height: widthPercentageToDP("5%"),
              resizeMode: "contain",
              marginRight: "10%",
            }}
          />
        )}
        {locationImg && <Image
          source={iconpathurl.locateDrop}
          style={styles.locationImg}
        />}

        {secureKey && (
          <TouchableOpacity onPress={onPressSecure} disabled={editable}>
            {hidden ? (
              <Text style={styles.hideshowLabel}>Show</Text>
            ) : (
              <Text style={styles.hideshowLabel}>Hide</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      {enableErrorMsg && Boolean(errorMsg) && (
        <Text style={{ ...styles.errorText, ...errorTextStyle }}>
          {errorMsg}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1.5,
    // borderColor: colors.grey95,
    borderRadius: 5,
    paddingHorizontal: 12,
    alignItems: "center",
    height:
      Platform.OS === "ios"
        ? widthPercentageToDP("13%")
        : widthPercentageToDP("11%"),
    backgroundColor: colors.greyF1,
  },
  inputStyle: {
    width: "95%",
    ...baseStyle.fontInter_medium,
    fontSize: widthPercentageToDP("4%"),
    textAlignVertical: "center",
    color: colors.grey95,
    letterSpacing: 0.18,
    paddingVertical: 6,
  },
  hideshowLabel: {
    ...baseStyle.fontInter_regular,
    letterSpacing: 0.18,
    color: colors.blue_B3,
  },
  errorText: {
    ...baseStyle.txtStyleInterRegular(heightPercentageToDP("1.5%"), colors.red),
    ...baseStyle.alignSelfFS,
    ...baseStyle.marginTop("1%"),
  },
  locationImg: {
    width: widthPercentageToDP("5%"),
    height: heightPercentageToDP("5%"),
    resizeMode: "contain",
    tintColor: colors.secondaryOrange,
  }
});

export default TextInputComponent;