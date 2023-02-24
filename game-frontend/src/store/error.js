const { createSlice } = require('@reduxjs/toolkit');

const errorSlice = createSlice({
    name: 'error',
    initialState: "",
    reducers: {
        set(state, action) {
            return action.payload;
        },
    },
});

export const { set } = errorSlice.actions;
export default errorSlice.reducer;
    