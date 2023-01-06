const initialState = {
    opponent: "",
    color: "white",
    time: "",
    difficulty: "",
    options: false,
    activePiece: "",
    board: {
        er1: 1,
        er2: 8,
        ek1: 2,
        ek2: 7,
        eb1: 3,
        eb2: 6,
        ekb: 5,
        ekw: 4,
        eqb: 4,
        eqw: 5,
        ep1: 9,
        ep2: 10,
        ep3: 11,
        ep4: 12,
        ep5: 13,
        ep6: 14,
        ep7: 15,
        ep8: 16,
        pr1: 57,
        pr2: 64,
        pk1: 58,
        pk2: 63,
        pb1: 59,
        pb2: 62,
        pkb: 60,
        pkw: 61,
        pqb: 61,
        pqw: 60,
        pp1: 49,
        pp2: 50,
        pp3: 51,
        pp4: 52,
        pp5: 53,
        pp6: 54,
        pp7: 55,
        pp8: 56,
    }
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
        // case "activePiece":
        //     return {
        //         ...state,
        //         activePiece: action.payload,
        //     }
        case "playerKnight1":
            return {
                ...state,
                board: {
                    ...state.board,
                    pk1: action.payload
                },
            }
        case "playerKnight2":
            return {
                ...state,
                board: {
                    ...state.board,
                    pk2: action.payload
                },
            }
        default:
            return state
    }
}

export default boardReducer