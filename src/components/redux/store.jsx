import { createStore } from "@reduxjs/toolkit";
import boardReducer from "./reducer";

const store = createStore(boardReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store