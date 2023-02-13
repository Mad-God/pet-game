const { createSlice } = require('@reduxjs/toolkit');

const nameSlice = createSlice({
    name: 'name',
    initialState: "",
    reducers: {
        set(state, action) {
            return action.payload;
        },
    },
});

export const { set } = nameSlice.actions;
export default nameSlice.reducer;
