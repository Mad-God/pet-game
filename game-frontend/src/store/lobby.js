const { createSlice } = require('@reduxjs/toolkit');

const lobbySlice = createSlice({
    name: 'lobby',
    initialState: "",
    reducers: {
        set(state, action) {
            return action.payload;
        },
    },
});

export const { set } = lobbySlice.actions;
export default lobbySlice.reducer;
