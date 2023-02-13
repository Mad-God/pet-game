const { createSlice } = require('@reduxjs/toolkit');

const namesSlice = createSlice({
    name: 'names',
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload;
        },
    },
});

export const { set } = namesSlice.actions;
export default namesSlice.reducer;
