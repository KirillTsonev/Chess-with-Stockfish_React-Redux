const initialState = {
    opponent: "",
    color: "white",
    time: "",
    difficulty: "",
    options: false,
    activePiece: "",
}

function boardReducer(state = initialState, action) {
    switch (action.type) {
        case "optionsOff":
            return {
                ...state,
                options: false
            }
        case "color/white":
            return {
                ...state,
                color: "white"
            }
        case "color/black":
            return {
                ...state,
                color: "black"
            }
        case "activePiece":
            return {
                ...state,
                activePiece: action.payload,
            }
        default:
            return state
    }
}

export default boardReducer