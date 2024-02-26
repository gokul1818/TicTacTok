import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../../constants/screens";
import Home from "../../screens/appscreen/home";

const AppNavigaton = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.HOME}

        >
            <Stack.Screen
                name={SCREENS.HOME}
                component={Home}
                options={{ headerShown: false }}
            />
         
        </Stack.Navigator>

    );
};

export default AppNavigaton;
