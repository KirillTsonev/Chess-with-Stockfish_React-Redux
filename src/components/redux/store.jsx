import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducer";
import { swapAndEditBoard } from "./middleware";
import { pawnFirstMoved } from "./middleware";

const store = configureStore({
    reducer: boardReducer,
    middleware: [swapAndEditBoard, pawnFirstMoved]
})

export default store