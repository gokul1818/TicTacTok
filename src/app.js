import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-notifications';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppStack } from "./navigation";
import { persistor, store } from "./redux/store";
import Splash from "./screens/splash";
import Home from "./screens/appscreen/home";


const App = () => {
  const [isSplashVisible, setIsSplashVisisble] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsSplashVisisble(false);
  //   }, 1000);
  // }, []);
  // if (isSplashVisible) {
  //   return <Splash />;
  // }
  console.log('')
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toast
          ref={ref => (global['toast'] = ref)}
          ToastProvider
          duration={3000}
          placement="top"
          animationType="zoom-in"
          offsetTop={100}
          swipeEnabled={true}
        />


        <AppStack/>
      </PersistGate>
    </Provider>
  );
};

export default App;

