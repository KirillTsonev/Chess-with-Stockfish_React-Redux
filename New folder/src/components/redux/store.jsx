import { configureStore } from "@reduxjs/toolkit"

import boardSlice from "./reducers/boardSlice"
import optionsSlice from "./reducers/optionsSlice"
import behaviorSlice from "./reducers/behaviorSlice"
import progressionSlice from "./reducers/progressionSlice"

import { swapAndEditBoard } from "./middleware"
import { checkPieceMoved } from "./middleware"
import { checkCastlingMoved } from "./middleware"
import { pawnPromotion } from "./middleware"

const store = configureStore({
    reducer: {
        board: boardSlice,
        options: optionsSlice,
        behavior: behaviorSlice,
        progression: progressionSlice
    },
    middleware: [swapAndEditBoard, checkPieceMoved, checkCastlingMoved, pawnPromotion]
})

export default store