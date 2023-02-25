const initialState = {
    moveNumbers: [1],
    moves: [],
    currentMove: null,
    notationArr: [],
    pieceGainPlayer: [],
    pieceGainOpponent: [],
}

function progressionSlice(state = initialState, action) {
    switch (action.type) {
        case "pieceGainPlayer":
            return {
                ...state,
                pieceGainPlayer: [...state.pieceGainPlayer, action.payload]
            }
        case "pieceGainOpponent":
            return {
                ...state,
                pieceGainOpponent: [...state.pieceGainOpponent, action.payload]
            }
        case "notationArr":
            return {
                ...state,
                notationArr: [...state.notationArr, action.payload]
            }
        case "currentMove":
            return {
                ...state,
                currentMove: action.payload,
            }
        case "recordMoves": 
            return {
                ...state,
                moves: [...state.moves, action.payload]
            }
        case "moveNumbers":
            return {
                ...state,
                moveNumbers: [...state.moveNumbers, state.moveNumbers.length + 1]
            }
        default:
            return state
    }
}

export default progressionSlice