import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from 'react';
import { SCREENS } from '../../constants/screens';
import NavigationServices from '../NavigationServices';
import screenNames from '../screenNames';
import BottomTabNavigator from "../BottomNavigation";
import { useSelector } from "react-redux";

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();
    const appNavigation = useSelector((state) => state?.authSlice?.appNavigation)
    return (

        <Stack.Navigator initialRouteName={SCREENS.TYPEOFUSERS}>

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
            <Stack.Screen
                name={SCREENS.LOGIN}
                component={screenNames.Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.REGISTER}
                component={screenNames.Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.VERIFYOTP}
                component={screenNames.VerifyOtp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={SCREENS.NOTIFICATION}
                component={screenNames.Notification}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>

    );
};

export default AuthNavigation;