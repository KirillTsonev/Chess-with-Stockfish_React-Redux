import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import boardReducer from "./reducer";
import swapAndEditBoard from "./middleware";

const middleware = applyMiddleware(swapAndEditBoard)
const store = createStore(boardReducer, middleware)

//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default store