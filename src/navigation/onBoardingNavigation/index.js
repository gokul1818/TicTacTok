import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../BottomNavigation";
import { SCREENS } from "../../constants/screens";
import screenNames from "../screenNames";
import NavigationServices from "../NavigationServices";
import { useSelector } from "react-redux";

const OnBoardingNavigation = () => {
    const Stack = createNativeStackNavigator();
    const appNavigation = useSelector((state) => state?.authSlice?.appNavigation)
    return (

        <>

            <Stack.Screen
                name={SCREENS.TYPEOFUSERS}
                component={screenNames.TypeOfUsers}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.ONBOARDING}
                component={screenNames.OnboardingScreen}
                options={{ headerShown: false }}
            />
        </>
    );
};

export default OnBoardingNavigation;
