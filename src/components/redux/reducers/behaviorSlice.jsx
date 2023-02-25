const initialState = {
    darkTheme: true,
    numbers: false,
    animations: "fast",
    coordinates: true,
    sounds: true,
    milliseconds: true
}

function behaviorSlice(state = initialState, action) {
    switch(action.type) {
        case "darkTheme":
            return {
                ...state,
                darkTheme: action.payload
            }
        case "numbers":
            return {
                ...state,
                numbers: action.payload
            }
        case "animationSpeed":
            return {
                ...state,
                animations: action.payload
            }
        case "coordinates":
            return {
                ...state,
                coordinates: action.payload
            }
        case "sounds":
            return {
                ...state,
                sounds: action.payload
            }
        case "milliseconds":
            return {
                ...state,
                milliseconds: action.payload
            }
        default:
            return state
    }
}

export default behaviorSlice