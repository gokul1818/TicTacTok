import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomSafeArea from "../../../components/customSafeArea";
import { colors } from "../../../utils/colors";
import styles from "./styles";
import { Text } from "react-native";
import Button from "../../../components/button";


const Home = () => {


  return (
    <CustomSafeArea style={styles.container} backgroundColor={colors.white}>
      <Button
        isPrimaryButton
        btnLabel={"ON"} />
    </CustomSafeArea>
  );
};

export default Home;
