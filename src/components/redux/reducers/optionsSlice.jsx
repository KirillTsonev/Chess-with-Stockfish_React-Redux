const initialState = {
    sandbox: null,
    skillLevel: null,
    depth: null,
    milliseconds: null,
    color: "",
    time: 0,
    increment: 0,
    options: true
}

function optionsSlice(state = initialState, action) {
    switch (action.type) {
        case "sandbox":
            return {
                ...state,
                sandbox: action.payload
            }
        case "skillLevel":
            return {
                ...state,
                skillLevel: action.payload
            }
        case "depth":
            return {
                ...state,
                depth: action.payload
            }
        case "milliseconds":
            return {
                ...state,
                milliseconds: action.payload
            }
        case "color":
            return {
                ...state,
                color: action.payload
            }
        case "setTime":
            return {
                ...state,
                time: action.payload
            }
        case "increment":
            return {
                ...state,
                increment: action.payload
            }
        case "optionsOff":
            return {
                ...state,
                options: false
            }
        default:
            return state
    }
}

export default optionsSlice