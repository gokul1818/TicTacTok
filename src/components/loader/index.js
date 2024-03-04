import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../utils/colors";

const ActivityLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.primaryViolet} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default ActivityLoader;
