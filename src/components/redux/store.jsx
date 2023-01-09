import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducer";
import { swapAndEditBoard } from "./middleware";
import { checkPieceMoved } from "./middleware";
import { checkCastlingMoved } from "./middleware";

const store = configureStore({
    reducer: boardReducer,
    middleware: [swapAndEditBoard, checkPieceMoved, checkCastlingMoved]
})

export default store