const initialState = {
    opponent: "",
    color: "white",
    time: "",
    difficulty: "",
    options: false,
    animations: "fast",
    sounds: true,
    numbers: false,
    activePiece: "",
    oldSquare: null,
    newSquare: null,
    board: {
        or1: [1, "a8"],
        oh1: [2, "b8"],
        ob1: [3, "c8"],
        // okw: [4, "d8"],
        oqb: [4, "d8"],
        okb: [5, "e8"],
        // oqw: [5, "e8"],
        ob2: [6, "f8"],
        oh2: [7, "g8"],
        or2: [8, "h8"],
        op1: [9, "a7"],
        op2: [10, "b7"],
        op3: [11, "c7"],
        op4: [12, "d7"],
        op5: [13, "e7"],
        op6: [14, "f7"],
        op7: [15, "g7"],
        op8: [16, "h7"],
        empty1: [17],
        empty2: [18],
        empty3: [19],
        empty4: [20],
        empty5: [21],
        empty6: [22],
        empty7: [23],
        empty8: [24],
        empty9: [25],
        empty10: [26],
        empty11: [27],
        empty12: [28],
        empty13: [29],
        empty14: [30],
        empty15: [31],
        empty16: [32],
        empty17: [33],
        empty18: [34],
        empty19: [35],
        empty20: [36],
        empty21: [37],
        empty22: [38],
        empty23: [39],
        empty24: [40],
        empty25: [41],
        empty26: [42],
        empty27: [43],
        empty28: [44, "d3"],
        empty29: [45, "e3"],
        empty30: [46, "f3"],
        empty31: [47, "g3"],
        empty32: [48, "h3"],
        pp1: [49, "a2"],
        pp2: [50, "b2"],
        pp3: [51, "c1"],
        pp4: [52, "d2"],
        pp5: [53, "e2"],
        pp6: [54, "f2"],
        pp7: [55, "g2"],
        pp8: [56, "h2"],
        pr1: [57, "a1"],
        ph1: [58, "b1"],
        pb1: [59, "c1"],
        // pkb: [60, "d1"],
        pqw: [60, "d1"],
        pkw: [61, "e1"],
        // pqb: [61, "e1"],
        pb2: [62, "f1"],
        ph2: [63, "g1"],
        pr2: [64, "h1"],
    },
    pawnsFirstMove: {
        pp1: true,
        pp2: true,
        pp3: true,
        pp4: true,
        pp5: true,
        pp6: true,
        pp7: true,
        pp8: true,
    },
    castlingPlayerMoved: {
        pkw: true,
        pkb: true,
        pr1: true,
        pr2: true
    },
    moveCounter: 0,
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
                    ...boardRest1
                },
            }
        case "color/black":
            const { oqb, okb, pqw, pkw, ...boardRest2 } = state.board

            return {
                ...state,
                color: "black",
                board: {
                    ...boardRest2
                },
            }
        case "behavior/numbers":
            return {
                ...state,
                numbers: action.payload
            }
        case "behavior/animationSpeed":
            return {
                ...state,
                animations: action.payload
            }
        case "activePiece":
            return {
                ...state,
                activePiece: action.payload
            }
        case "oldSquare":
            return {
                ...state,
                oldSquare: action.payload
            }
        case "newSquare":
            return {
                ...state,
                newSquare: action.payload
            }
        case "ph1":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "ph2":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "pawnMoved":
            return {
                ...state,
                pawnsFirstMove: {
                    ...state.pawnsFirstMove,
                    ...action.payload
                }
            }
        case "pp1":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp2":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp3":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp4":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp5":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp6":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp7":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pp8":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pb1":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pb2":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pr1":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pr2":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pqw":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pqb":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pkw":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "pkb":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "castlingPlayerMoved":
            return {
                ...state,
                castlingPlayerMoved: {
                    ...state.castlingPlayerMoved,
                    ...action.payload
                }
            }
        case "op1":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op2":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op3":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op4":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op5":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op6":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op7":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "op8":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "oh1":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "oh2":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "ob1":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "ob2":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "or1":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "or2":
            return {
                ...state,
                board: {
                    ...action.payload
                },
            }
        case "oqw":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "oqb":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "okw":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "okb":
            return {
                ...state,
                board: {
                    ...action.payload
                }
            }
        case "moveCounter":
            return {
                ...state,
                moveCounter: state.moveCounter + 1
            }
        default:
            return state
    }
}

export default boardReducer