const initialState = {
    opponent: "",
    color: "white",
    time: "",
    difficulty: "",
    options: false
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
        default:
            return state
    }
}

export default boardReducer