import {configureStore} from "@reduxjs/toolkit";
import loaderSlice from "./features/loaderSlice.js";
import confirmationDialogSlice from "./features/confirmationDialogSlice.js";
import userDataSlice from "./features/userDataSlice";

const store = configureStore({
    reducer: {
        loader: loaderSlice,
        confirmationDialog: confirmationDialogSlice,
        userData: userDataSlice,
    },
    setting: {
        confirmationDialog: confirmationDialogSlice,
    },
    loader: {
        isLoading: false,
    },
    userDetail: {
        data: {},
    },
    mqttDetail: {
        data: {},
    }
})
export default store;