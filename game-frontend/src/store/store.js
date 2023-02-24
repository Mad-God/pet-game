import { configureStore } from '@reduxjs/toolkit';
import lobbiesReducer from './lobbies';
import lobbyReducer from './lobby';
import nameReducer from './name';
import namesReducer from './names';
import errorReducer from './error';
// for persisting
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
    key: "pet-game-root-store",
    version: 1,
    storage
}

const reducer = combineReducers({
    lobbies: lobbiesReducer,
    names: namesReducer,
    name: nameReducer,
    lobby: lobbyReducer,
    error: errorReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
});

export default store;
