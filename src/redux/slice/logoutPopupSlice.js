import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    view: false,

};


const logoutPopup = createSlice({
    name: "logoutPopup",
    initialState,
    reducers: {
        viewLogoutPopup: (state, action) => {
            return {
                ...state,
                view: action.payload.view,

            }
        },


    },
});


export const { viewLogoutPopup } = logoutPopup.actions;
export default logoutPopup.reducer;
