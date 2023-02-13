// import { combineReducers } from "redux";

// const initialName = null;
// const initialNames = [];
// const initialLobby = null;
// const initialLobbies = [];

// const changeName = (state, action) => {
//     switch(action.type){
//         case "CHANGE_NAME": return "name" in action?action.name:"";
//         default: return state;
//     }
// }
// const changeNames = (state, action) => {
//     switch(action.type){
//         case "CHANGE_NAME": return "names" in action?action.names:[];
//         default: return state;
//     }
// }
// const changeLobby = (state, action) => {
//     switch(action.type){
//         case "CHANGE_NAME": return "lobby" in action?action.lobby:"";
//         default: return state;
//     }
// }
// const changeLobbies = (state, action) => {
//     switch(action.type){
//         case "CHANGE_NAME": if("lobbies" in action){return action.lobbies;}else{return [];};
//         default: return state;
//     }
// }

// const rootReducer = combineReducers({
//     changeLobbies,
//     changeLobby,
//     changeName,
//     changeNames,
// });
// export default rootReducer;