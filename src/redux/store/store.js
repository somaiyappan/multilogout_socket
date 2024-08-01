import logoutPopupSlice from "../slice/logoutPopupSlice";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        logoutPopup: logoutPopupSlice
    },
});

