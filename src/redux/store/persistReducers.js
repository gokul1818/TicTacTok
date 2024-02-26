import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "velo_diver",
      storage: AsyncStorage,
      whitelist: ["authSlice", ],
    },
    reducers
  );

  return persistedReducer;
};
