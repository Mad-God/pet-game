import { configureStore } from '@reduxjs/toolkit';
import lobbiesReducer from './lobbies';
import lobbyReducer from './lobby';
import nameReducer from './name';
import namesReducer from './names';
import errorReducer from './error';

const store = configureStore({
    reducer: {
        lobbies: lobbiesReducer,
        names: namesReducer,
        name: nameReducer,
        lobby: lobbyReducer,
        error: errorReducer,
    },
});

export default store;
