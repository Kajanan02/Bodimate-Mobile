import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDataUpdate: (state, action) => {
            state.user = action.payload;
        },
    },
})

export const {userDataUpdate} = userDataSlice.actions;

export default userDataSlice.reducer;
