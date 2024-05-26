import { combineReducers } from "redux";
import userHandler from './userHandler'
import cartHandler from "./cartHandler";
import favHandler from "./favHandler";

const rootReducer = combineReducers({
    userHandler,
    cartHandler,
    favHandler
})
export default rootReducer