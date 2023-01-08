import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducer";
import swapAndEditBoard from "./middleware";

const store = configureStore({
    reducer: boardReducer,
    middleware: [swapAndEditBoard]
})

export default store