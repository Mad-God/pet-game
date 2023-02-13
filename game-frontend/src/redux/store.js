// import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';


// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
// })

// export const persistor = persistStore(store)


import { createStore } from "redux";
const store = createStore(rootReducer);
export default store;

