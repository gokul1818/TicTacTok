import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./NavigationServices";
import AppNavigaton from "./appNavigation";

export const AppStack = () => {

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <AppNavigaton />
    </NavigationContainer>
  );
};

