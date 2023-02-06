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
        // okw1: [4, "d8"],
        oqb1: [4, "d8"],
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
        empty1: [17, "a6"],
        empty2: [18, "b6"],
        empty3: [19, "c6"],
        empty4: [20, "d6"],
        empty5: [21, "e6"],
        empty6: [22, "f6"],
        empty7: [23, "g6"],
        empty8: [24, "h6"],
        empty9: [25, "a5"],
        empty10: [26, "b5"],
        empty11: [27, "c5"],
        empty12: [28, "d5"],
        empty13: [29, "e5"],
        empty14: [30, "f5"],
        empty15: [31, "g5"],
        empty16: [32, "h5"],
        empty17: [33, "a4"],
        empty18: [34, "b4"],
        empty19: [35, "c4"],
        empty20: [36, "d4"],
        empty21: [37, "e4"],
        empty22: [38, "f4"],
        empty23: [39, "g4"],
        empty24: [40, "h4"],
        empty25: [41, "a3"],
        empty26: [42, "b3"],
        empty27: [43, "c3"],
        empty28: [44, "d3"],
        empty29: [45, "e3"],
        empty30: [46, "f3"],
        empty31: [47, "g3"],
        empty32: [48, "h3"],
        pp1: [49, "a2"],
        pp2: [50, "b2"],
        pp3: [51, "c2"],
        pp4: [52, "d2"],
        pp5: [53, "e2"],
        pp6: [54, "f2"],
        pp7: [55, "g2"],
        pp8: [56, "h2"],
        pr1: [57, "a1"],
        ph1: [58, "b1"],
        pb1: [59, "c1"],
        // pkb1: [60, "d1"],
        pqw1: [60, "d1"],
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
        op1: true,
        op2: true,
        op3: true,
        op4: true,
        op5: true,
        op6: true,
        op7: true,
        op8: true,
    },
    castlingPlayerMoved: {
        pk: true,
        pr1: true,
        pr2: true
    },
    castlingEnemyMoved: {
        ok: true,
        or1: true,
        or2: true
    },
    moveCounter: 1,
    halfMoveCounter: 0,
    enemyKingAttacked: false,
    playerKingAttacked: false,
    sandbox: true,
    moves: [],
}

function boardReducer(state = initialState, action) {
    switch (action.type) {
        case "recordMoves": 
            return {
                ...state,
                moves: [...state.moves, action.payload]
            }
        case "sandbox":
            return {
                ...state,
                sandbox: action.payload
            }
        case "pawnPromotion":
            return {
                ...state,
                board: action.payload
            }
        case "halfMoveCounter/increase":
            return {
                ...state,
                halfMoveCounter: state.halfMoveCounter + 1
            }
        case "halfMoveCounter/reset":
            return {
                ...state,
                halfMoveCounter: 0
            }
        case "enemyKingAttacked":
            return {
                ...state,
                enemyKingAttacked: action.payload
            }
        case "playerKingAttacked":
            return {
                ...state,
                playerKingAttacked: action.payload
            }
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
        case "pawnMoved":
            return {
                ...state,
                pawnsFirstMove: {
                    ...state.pawnsFirstMove,
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
        case "castlingEnemyMoved":
            return {
                ...state,
                castlingEnemyMoved: {
                    ...state.castlingPlayerMoved,
                    ...action.payload
                }
            }
        case "pp1": case "pp2": case "pp3": case "pp4": case "pp5": case "pp6": case "pp7": case "pp8":
        case "ph1": case "ph2": case "ph3": case "ph4": case "ph5": case "ph6": case "ph7": case "ph8": case "ph9": case "ph01": 
        case "pb1": case "pb2": case "pb3": case "pb4": case "pb5": case "pb6": case "pb7": case "pb8": case "pb9": case "pb01": 
        case "pr1": case "pr2": case "pr3": case "pr4": case "pr5": case "pr6": case "pr7": case "pr8": case "pr9": case "pr01": 
        case "pqw1": case "pqw2": case "pqw3": case "pqw4": case "pqw5": case "pqw6": case "pqw7": case "pqw8": case "pqw9": 
        case "pqb1": case "pqb2": case "pqb3": case "pqb4": case "pqb5": case "pqb6": case "pqb7": case "pqb8": case "pqb9": 
        case "pkw": case "pkb": 
        case "op1": case "op2": case "op3": case "op4": case "op5": case "op6": case "op7": case "op8": 
        case "oh1": case "oh2": case "oh3": case "oh4": case "oh5": case "oh6": case "oh7": case "oh8": case "oh9": case "oh01": 
        case "ob1": case "ob2": case "ob3": case "ob4": case "ob5": case "ob6": case "ob7": case "ob8": case "ob9": case "ob01": 
        case "or1": case "or2": case "or3": case "or4": case "or5": case "or6": case "or7": case "or8": case "or9": case "or01":
        case "oqw1": case "oqw2": case "oqw3": case "oqw4": case "oqw5": case "oqw6": case "oqw7": case "oqw8": case "oqw9":
        case "oqb1": case "oqb2": case "oqb3": case "oqb4": case "oqb5": case "oqb6": case "oqb7": case "oqb8": case "oqb9":
        case "okw": case "okb":
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