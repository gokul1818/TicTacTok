import { store } from "../store";

export function getToken() {
  try {
    return store.getState().authSlice?.userData;
  } catch (error) { }
}
