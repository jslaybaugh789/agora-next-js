import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./profile/reducer";
const store = configureStore({
 reducer: { 
    profilesReducer,
 },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;