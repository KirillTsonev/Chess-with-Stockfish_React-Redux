const initialState = {
    opponent: "",
    color: "white",
    time: "",
    difficulty: "",
    options: false,
    activePiece: "",
    board: {
        or1: 1,
        ok1: 2,
        ob1: 3,
        // okw: 4,
        oqb: 4,
        okb: 5,
        // oqw: 5,
        ob2: 6,
        ok2: 7,
        or2: 8,
        op1: 9,
        op2: 10,
        op3: 11,
        op4: 12,
        op5: 13,
        op6: 14,
        op7: 15,
        op8: 16,
        empty1: 17,
        empty2: 18,
        empty3: 19,
        empty4: 20,
        empty5: 21,
        empty6: 22,
        empty7: 23,
        empty8: 24,
        empty9: 25,
        empty10: 26,
        empty11: 27,
        empty12: 28,
        empty13: 29,
        empty14: 30,
        empty15: 31,
        empty16: 32,
        empty17: 33,
        empty18: 34,
        empty19: 35,
        empty20: 36,
        empty21: 37,
        empty22: 38,
        empty23: 39,
        empty24: 40,
        empty25: 41,
        empty26: 42,
        empty27: 43,
        empty28: 44,
        empty29: 45,
        empty30: 46,
        empty31: 47,
        empty32: 48,
        pp1: 49,
        pp2: 50,
        pp3: 51,
        pp4: 52,
        pp5: 53,
        pp6: 54,
        pp7: 55,
        pp8: 56,
        pr1: 57,
        pk1: 58,
        pb1: 59,
        // pkb: 60,
        pqw: 60,
        pkw: 61,
        // pqb: 61,
        pb2: 62,
        pk2: 63,
        pr2: 64,
    },
    pawns: {
        
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
            const { oqw, okw, pqb, pkb, ...boardRest1 } = state.board
            return {
                ...state,
                color: "white",
                board: {
                    ...boardRest1,
                },
            }
        case "color/black":
            const { oqb, okb, pqw, pkw, ...boardRest2 } = state.board
            return {
                ...state,
                color: "black",
                board: {
                    ...boardRest2,
                },
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