const { createSlice } = require('@reduxjs/toolkit');

const lobbiesSlice = createSlice({
    name: 'lobbies',
    initialState: [],
    reducers: {
        setLobbies(state, action) {
            return action.payload;
        },
        addLobby(state, action){
            state.push(action.payload);
        },
        removeLobby(state, action){
            return state.filter((lobby)=>lobby!=action.payload);
        }
    },
});

export const { setLobbies, addLobby, removeLobby } = lobbiesSlice.actions;
export default lobbiesSlice.reducer;
