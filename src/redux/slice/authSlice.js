import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SCREENS } from "../../constants/screens";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: [],
  },
  reducers: {
    userType: (state, action) => {
      state.userType = action.payload;
    }
  }
});

// //login
// export const loginApi = async (data) => {
//   try {
//     const res = await request({
//       url: endpoints.EndPoints.login,
//       method: endpoints.ApiMethods.POST,
//       headers: {
//         data,
//       },
//     });
//     return res;
//   } catch (error) {
//     // Handle errors if needed
//     console.error("Error in loginApi:", error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// };




export const {
  userType,
  loginData,
  loginSucess,
  updateUserStatus,
  logout,
  updateTypeOfUserStatus,
  updateDecodeData,
  driverStartTrip,
  updateProfileData,
} = authSlice.actions;
// export const token = (state) => state?.authSlice?.accessToken;

export default authSlice.reducer;
