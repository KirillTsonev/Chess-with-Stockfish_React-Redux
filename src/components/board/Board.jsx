/* eslint-disable react-hooks/exhaustive-deps */
import whiteKing from "../../images/whiteKing.png"
import blackKing from "../../images/blackKing.png"
import whiteQueen from "../../images/whiteQueen.png"
import blackQueen from "../../images/blackQueen.png"
import whiteRook from "../../images/whiteRook.png"
import blackRook from "../../images/blackRook.png"
import whiteKnight from "../../images/whiteKnight.png"
import blackKnight from "../../images/blackKnight.png"
import whiteBishop from "../../images/whiteBishop.png"
import blackBishop from "../../images/blackBishop.png"
import whitePawn from "../../images/whitePawn.png"
import blackPawn from "../../images/blackPawn.png"

import moveSoundFile from "../../sounds/move.ogg"
import captureSoundFile from "../../sounds/capture.ogg"
import checkSoundFile from "../../sounds/check.ogg"
import castlingSoundFile from "../../sounds/castling.ogg"

import store from "../redux/store"

import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"

import "./board.sass"

const Board = () => {
    const [activeStatePiece, setActiveStatePiece] = useState("") //1
    const [moveSquares, setMoveSquares] = useState([]) //2
    const [pieceSquare, setPieceSquare] = useState(null) //3
    // const [occupiedSquares, setOccupiedSquares] = useState([])
    // const [emptySquares, setEmptySquares] = useState([])
    // const [playerSquares, setPlayerSquares] = useState([])
    // const [enemySquares, setEnemySquares] = useState([])
    const [moveVar, setMoveVar] = useState([0, 0]) // 4
    const [lastMadeMove, setLastMadeMove] = useState([]) // 5
    // const [enemyKingAttacked, setEnemyKingAttacked] = useState(false) // 6
    // const [playerKingAttacked, setPlayerKingAttacked] = useState(false) // 7
    // const [attackedByOpponentArr, setAttackedByOpponentArr] = useState([]) // 8
    const [toMove, setToMove] = useState("w") // 6
    const [pawnPromotes, setPawnPromotes] = useState(false)

    const board = useSelector(state => state.board)
    const color = useSelector(state => state.color)
    const activePiece = useSelector(state => state.activePiece)
    const numbers = useSelector(state => state.numbers)
    const pawnsFirstMove = useSelector(state => state.pawnsFirstMove)
    const castlingPlayerMoved = useSelector(state => state.castlingPlayerMoved)
    const castlingEnemyMoved = useSelector(state => state.castlingEnemyMoved)
    const moveCounter = useSelector(state => state.moveCounter)
    // const playerSquares = useSelector(state => state.playerSquares)
    // const enemySquares = useSelector(state => state.enemySquares)
    // const occupiedSquares = useSelector(state => state.occupiedSquares)
    const enemyKingAttacked = useSelector(state => state.enemyKingAttacked)
    const playerKingAttacked = useSelector(state => state.playerKingAttacked)
    const halfMoveCounter = useSelector(state => state.halfMoveCounter)







    
    let boardEntries = Object.entries(board)
    // const boardEntries = Object.entries(store.getState().board)

    let filteredEnemyRender = boardEntries.filter(([key, value]) => /^o/.test(key))
    let filteredEnemyLive = Object.entries(store.getState().board).filter(([key, value]) => /^o/.test(key))
    let justEnemyRender = Object.fromEntries(filteredEnemyRender)
    let justEnemyLive = Object.fromEntries(filteredEnemyLive)
    
    let filteredPlayerRender = boardEntries.filter(([key, value]) => /^p/.test(key))
    let filteredPlayerLive = Object.entries(store.getState().board).filter(([key, value]) => /^p/.test(key))
    let justPlayerRender = Object.fromEntries(filteredPlayerRender)
    let justPlayerLive = Object.fromEntries(filteredPlayerLive)

    // const filteredEmpty = boardEntries.filter(([key, value]) => /empty/.test(key))
    const filteredOccupied = boardEntries.filter(([key, value]) => !/empty/.test(key))
    // const filteredOccupied = Object.entries(store.getState().board).filter(([key, value]) => !/empty/.test(key))
    // const justEmpty = Object.fromEntries(filteredEmpty)
    const justOccupied = Object.fromEntries(filteredOccupied)


    let enemySquaresRender = Object.values(justEnemyRender).map(a => a = a[0])
    let playerSquaresRender =  Object.values(justPlayerRender).map(a => a = a[0])
    let enemySquaresLive = Object.values(justEnemyLive).map(a => a = a[0])
    let playerSquaresLive =  Object.values(justPlayerLive).map(a => a = a[0])
    let occupiedSquares = Object.values(justOccupied).map(a => a = a[0])

    
    const recordBoard = () => {
        filteredEnemyRender = boardEntries.filter(([key, value]) => /^o/.test(key))
        filteredEnemyLive = Object.entries(store.getState().board).filter(([key, value]) => /^o/.test(key))
        filteredPlayerLive = Object.entries(store.getState().board).filter(([key, value]) => /^p/.test(key))
        filteredPlayerRender = boardEntries.filter(([key, value]) => /^p/.test(key))
        justEnemyRender = Object.fromEntries(filteredEnemyRender)
        justPlayerRender = Object.fromEntries(filteredPlayerRender)

        justEnemyLive = Object.fromEntries(filteredEnemyLive)
        justPlayerLive = Object.fromEntries(filteredPlayerLive)

        enemySquaresRender = Object.values(justEnemyRender).map(a => a = a[0])
        playerSquaresRender =  Object.values(justPlayerRender).map(a => a = a[0])
        enemySquaresLive = Object.values(justEnemyLive).map(a => a = a[0])
        playerSquaresLive =  Object.values(justPlayerLive).map(a => a = a[0])
        occupiedSquares = Object.values(justOccupied).map(a => a = a[0])

        resetPieces()
        playerNewSquareForEngine = boardEntries.filter(([key, value]) => value[0] === pieceSquareForEngine.current).flat()[1][1]
        encode()

        playerKingSpiderSense()
        enemyKingSpiderSense()
    }

    useEffect(() => {
        recordBoard()
        stockfish.postMessage('uci')
        stockfish.postMessage('isready')
        stockfish.postMessage('ucinewgame')
        
        // stockfish.postMessage('setoption name Skill Level value -10/20')        
    }, [])

    useEffect(() => {
        recordBoard()
    }, [board])

    useEffect(() => {
        if (notInitialRender.current) {
            const movePiece = setTimeout(() => {
                setActiveStatePiece("")
                setMoveVar([0, 0])
            }, store.getState().animations === "none" ? 0 : 50)
            const resetPiece = setTimeout(() => {
                store.dispatch({
                    type: "activePiece",
                    payload: ""
                })
                store.dispatch({
                    type: "oldSquare",
                    payload: null
                })
                store.dispatch({
                    type: "newSquare",
                    payload: null
                })
            }, 150);
            return () => {
                clearTimeout(movePiece)
                clearTimeout(resetPiece)
            }
        } else {
            notInitialRender.current = true
        }
    }, [JSON.stringify(board)]);

    useEffect(() => {
        if ((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) {
            engineTurn()
        }
    }, [toMove])

    let enPassantSquare

    let pieceSquareForEngine = useRef(1)
    

    const notInitialRender = useRef(false)


    const wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))

    const stockfish = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js')
    
    stockfish.addEventListener('message', function(e) {
        // console.log(e.data)
        if (/^bestmove/.test(e.data)) {
            const engineOldSquare = e.data.slice(9, 11)
            const engineNewSquare = e.data.slice(11, 13)

            const enginePieceToMove = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[0]
            const enginePieceSquare = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[1][0]
            const engineWhereToMove = boardEntries.filter(([key, value]) => value[1] === engineNewSquare).flat()[1][0]

            setActiveStatePiece(enginePieceToMove)

            store.dispatch({
                type: "oldSquare",
                payload: enginePieceSquare
            })

            if (color === "white") {
                store.dispatch({
                    type: "moveCounter"
                })
            }

            // console.log(engineOldSquare)
            // console.log(engineNewSquare)
            // console.log(enginePieceToMove)
            // console.log(enginePieceSquare)
            // console.log(engineWhereToMove)

            pieceSquareForEngine.current = enginePieceSquare      

            if (/^op/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                recordOpponentPawnMoves(engineWhereToMove, checkedByOpponentArr.current[0])

                movePawn(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[0] = []
            } 
            
            if (enginePieceToMove === "ob1") {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                checkArrays(whiteBishopMoves, engineWhereToMove, checkedByOpponentArr.current[1], enemySquaresLive, playerSquaresLive, true)

                

                enemyBishop1.current = engineWhereToMove

                moveBishop(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[1] = []
            } 
            
            if (enginePieceToMove === "ob2") {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                
                checkArrays(blackBishopMoves, engineWhereToMove, checkedByOpponentArr.current[2], enemySquaresLive, playerSquaresLive, true)

               

                enemyBishop2.current = engineWhereToMove

                moveBishop(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[2] = []
            } 
            
            if (/^oh/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                
                recordKnightMoves(engineWhereToMove, checkedByOpponentArr.current[3], enemySquaresLive)

                

                if (enginePieceToMove === "oh1") {
                    enemyKnight1.current = engineWhereToMove
                } else {
                    enemyKnight2.current = engineWhereToMove
                }

                moveKnight(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[3] = []
            } 
            
            if (/^or/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                
                checkArrays(rookMoves, engineWhereToMove, checkedByOpponentArr.current[4], enemySquaresLive, playerSquaresLive, true)

                

                if (enginePieceToMove === "or1") {
                    enemyRook1.current = engineWhereToMove
                } else {
                    enemyRook2.current = engineWhereToMove
                }

                moveRook(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[4] = []
            } 
            
            if (/^oq/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                
                
                checkArrays(whiteBishopMoves, engineWhereToMove, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)
                checkArrays(blackBishopMoves, engineWhereToMove, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)
                checkArrays(rookMoves, engineWhereToMove, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)

                

                enemyQueen1.current = engineWhereToMove

                moveQueen(engineWhereToMove, enginePieceToMove)

                checkedByOpponentArr.current[5] = []
            } 
            
            if (/^ok/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                moveKing(engineWhereToMove, enginePieceToMove)
                
                
                enemyKingSpiderSense()
            }


        }
    });

    let playerPiece = useRef(null)
    let playerNewSquareForEngine

    const engineTurn = () => {
        let string = `position fen ${stringToSend} moves ${playerPiece.current}${playerNewSquareForEngine}`

        // console.log(string)
        // stockfish.postMessage(string)
        // setTimeout(() => {
            // stockfish.postMessage('go movetime 1000')
        // }, 1000);
    }

    let stringToSend

    const encode = () => {
        const fenEncode = (arr) => {
            switch (arr[0]) {
                case "or1": case "or2":
                    if (color === "white") {
                        return arr = "r"
                    } else {
                        return arr = "R"
                    }
                case "oh1": case "oh2":
                    if (color === "white") {
                        return arr = "n"
                    } else {
                        return arr = "N"
                    }
                case "ob1": case "ob2":
                    if (color === "white") {
                        return arr = "b"
                    } else {
                        return arr = "B"
                    }
                case "oqw1": case "oqb1": case "oqw2": case "oqb2": case "oqw3": case "oqb3": case "oqw4": case "oqb4":
                    if (color === "white") {
                        return arr = "q"
                    } else {
                        return arr = "Q"
                    }
                case "okw": case "okb":
                    if (color === "white") {
                        return arr = "k"
                    } else {
                        return arr = "K"
                    }
                case "op1": case "op2": case "op3": case "op4": case "op5": case "op6": case "op7": case "op8":
                    if (color === "white") {
                        return arr = "p"
                    } else {
                        return arr = "P"
                    }
                case "pr1": case "pr2":
                    if (color === "white") {
                        return arr = "R"
                    } else {
                        return arr = "r"
                    }
                case "ph1": case "ph2":
                    if (color === "white") {
                        return arr = "N"
                    } else {
                        return arr = "n"
                    }
                case "pb1": case "pb2":
                    if (color === "white") {
                        return arr = "B"
                    } else {
                        return arr = "b"
                    }
                case "pqw1": case "pqb1": case "pqw2": case "pqb2": case "pqw3": case "pqb3": case "pqw4": case "pqb4":
                    if (color === "white") {
                        return arr = "Q"
                    } else {
                        return arr = "q"
                    }
                case "pkw": case "pkb":
                    if (color === "white") {
                        return arr = "K"
                    } else {
                        return arr = "k"
                    }
                case "pp1": case "pp2": case "pp3": case "pp4": case "pp5": case "pp6": case "pp7": case "pp8":
                    if (color === "white") {
                        return arr = "P"
                    } else {
                        return arr = "p"
                    }
                default:
                    return arr = 1
            }
        }

        const fen = boardEntries.map(a => fenEncode(a))

        let fenArrays = [[], [], [], [], [], [], [], []]

        for (let i = 0; i < 8; i++) {
            for (let j = i * 8; j < i * 8 + 8; j++) {
                fenArrays[i].push(fen[j])
            }
        }

        const customReducer = (arr) => {
            if (arr.includes(1)) {
                let temp = 0
                let reducedArr = 0
                for (let elem of arr) {
                    if (typeof elem === "number") {
                        temp += elem
                    } else {
                        reducedArr += temp
                        temp = 0
                        reducedArr += elem
                    }
                }
                reducedArr += temp
                if (typeof reducedArr === "number") {
                    return reducedArr
                } else {
                    return reducedArr.split("").filter(a => a !== "0").join("")
                }
            } else {
                return arr.join("")
            }
        }

        fenArrays = fenArrays.map(a => customReducer(a))

        let fenString = fenArrays.join("/")

        fenString += ` ${toMove} `

        if (castlingPlayerMoved.pk && castlingPlayerMoved.pr1 && castlingPlayerMoved.pr2) {
                if (color === "white") {
                    fenString += "KQ"
                } else {
                    fenString += "kq"
                }
        }
        if (castlingPlayerMoved.pk && castlingPlayerMoved.pr1 && !castlingPlayerMoved.pr2) {
            if (color === "white") {
                fenString += "Q"
            } else {
                fenString += "q"
            }
        }
        if (castlingPlayerMoved.pk && !castlingPlayerMoved.pr1 && castlingPlayerMoved.pr2) {
            if (color === "white") {
                fenString += "K"
            } else {
                fenString += "k"
            }
        }

        if (castlingEnemyMoved.ok && castlingEnemyMoved.or1 && castlingEnemyMoved.or2) {
                if (color === "white") {
                    fenString += "kq "
                } else {
                    fenString += "KQ "
                }
            }
        if (castlingEnemyMoved.ok && castlingEnemyMoved.or1 && !castlingEnemyMoved.or2) {
            if (color === "white") {
                fenString += "q "
            } else {
                fenString += "Q "
            }
        }
        if (castlingEnemyMoved.ok && !castlingEnemyMoved.or1 && castlingEnemyMoved.or2) {
            if (color === "white") {
                fenString += "k "
            } else {
                fenString += "K "
            }
        }

        if (enPassantSquare) {
            fenString += boardEntries.filter(([key, value]) => value[0] === enPassantSquare).flat()[1][1]
        } else {
            fenString += "-"
        }
        
        fenString += ` ${halfMoveCounter} `

        fenString += moveCounter
        stringToSend = fenString
        // console.log(fenString)
    }

    let animationSpeed

    if (store.getState().animations === "fast") {
        animationSpeed = .2
    } else if (store.getState().animations === "average") {
        animationSpeed = .5
    } else if (store.getState().animations === "slow") {
        animationSpeed = .7
    }

    const moveSound = new Audio(moveSoundFile)
    const captureSound = new Audio(captureSoundFile)
    const castlingSound = new Audio(castlingSoundFile)
    const checkSound = new Audio(checkSoundFile)

    const knightLimits = [
        [], [], [], []
    ]

    for (let i = 1; i < 64; i += 8) {
        knightLimits[0].push(i)
        knightLimits[1].push(i + 1)
        knightLimits[2].push(i + 6)
        knightLimits[3].push(i + 7)
    }

    const whiteBishopMoves = [
        [7, 16],
        [5, 14, 23, 32],
        [3, 12, 21, 30, 39, 48],
        [1, 10, 19, 28, 37, 46, 55, 64],
        [17, 26, 35, 44, 53, 62],
        [33, 42, 51, 60],
        [49, 58],
        [3, 10, 17],
        [5, 12, 19, 26, 33],
        [7, 14, 21, 28, 35, 42, 49],
        [16, 23, 30, 37, 44, 51, 58],
        [32, 39, 46, 53, 60],
        [48, 55, 62]
    ]

    const blackBishopMoves = [
        [2, 9],
        [4, 11, 18, 25],
        [6, 13, 20, 27, 34, 41],
        [8, 15, 22, 29, 36, 43, 50, 57],
        [24, 31, 38, 45, 52, 59],
        [40, 47, 54, 61],
        [56, 63],
        [6, 15, 24],
        [4, 13, 22, 31, 40],
        [2, 11, 20, 29, 38, 47, 56],
        [9, 18, 27, 36, 45, 54, 63],
        [25, 34, 43, 52, 61],
        [41, 50, 59]
    ]

    const rookMoves = [
        [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    ]

    for (let i = 1; i < 9; i++) {
        rookMoves[0].push(i)
        rookMoves[1].push(i + 8)
        rookMoves[2].push(i + 16)
        rookMoves[3].push(i + 24)
        rookMoves[4].push(i + 32)
        rookMoves[5].push(i + 40)
        rookMoves[6].push(i + 48)
        rookMoves[7].push(i + 56)
    }

    for (let i = 1; i < 65; i += 8) {
        rookMoves[8].push(i)
        rookMoves[9].push(i + 1)
        rookMoves[10].push(i + 2)
        rookMoves[11].push(i + 3)
        rookMoves[12].push(i + 4)
        rookMoves[13].push(i + 5)
        rookMoves[14].push(i + 6)
        rookMoves[15].push(i + 7)
    }

    const enemyBishop1 = useRef(0)
    const enemyBishop2 = useRef(0)
    const enemyKnight1 = useRef(0)
    const enemyKnight2 = useRef(0)
    const enemyRook1 = useRef(0)
    const enemyRook2 = useRef(0) 
    const enemyQueen1 = useRef(0)
    let enemyKing = board.okw ? board.okw[0] : board.okb[0]
    const enemyPawn1 = board.op1 ? board.op1[0] : null
    const enemyPawn2 = board.op2 ? board.op2[0] : null
    const enemyPawn3 = board.op3 ? board.op3[0] : null
    const enemyPawn4 = board.op4 ? board.op4[0] : null
    const enemyPawn5 = board.op5 ? board.op5[0] : null
    const enemyPawn6 = board.op6 ? board.op6[0] : null
    const enemyPawn7 = board.op7 ? board.op7[0] : null
    const enemyPawn8 = board.op8 ? board.op8[0] : null

    function resetPieces() {
        if (!board.oh1) {
            enemyKnight1.current = 0
        }
        if (!board.oh2) {
            enemyKnight2.current = 0
        }
        if (!board.ob1) {
            enemyBishop1.current = 0
        }
        if (!board.ob2) {
            enemyBishop2.current = 0
        }
        if (!board.or1) {
            enemyRook1.current = 0
        }
        if (!board.or2) {
            enemyRook2.current = 0
        }
        if (!board.oqb1 && color === "white") {
            enemyQueen1.current = 0
        }
        if (!board.oqw1 && color === "black") {
            enemyQueen1.current = 0
        }
        if (!board.ph1) {
            playerKnight1.current = 0
        }
        if (!board.ph2) {
            playerKnight2.current = 0
        }
        if (!board.pb1) {
            playerBishop1.current = 0
        }
        if (!board.pb2) {
            playerBishop2.current = 0
        }
        if (!board.pr1) {
            playerRook1.current = 0
        }
        if (!board.pr2) {
            playerRook2.current = 0
        }
        if (!board.pqb1 && color === "black") {
            playerQueen1.current = 0
        }
        if (!board.pqw1 && color === "white") {
            playerQueen1.current = 0
        }
    }

    const playerBishop1 = useRef(0)
    const playerBishop2 = useRef(0)
    const playerKnight1 = useRef(0)
    const playerKnight2 = useRef(0)
    const playerRook1 = useRef(0)
    const playerRook2 = useRef(0)
    const playerQueen1 = useRef(0)
    
    let playerKing = board.pkw ? board.pkw[0] : board.pkb[0]
    const playerPawn1 = board.pp1 ? board.pp1[0] : null
    const playerPawn2 = board.pp2 ? board.pp2[0] : null
    const playerPawn3 = board.pp3 ? board.pp3[0] : null
    const playerPawn4 = board.pp4 ? board.pp4[0] : null
    const playerPawn5 = board.pp5 ? board.pp5[0] : null
    const playerPawn6 = board.pp6 ? board.pp6[0] : null
    const playerPawn7 = board.pp7 ? board.pp7[0] : null
    const playerPawn8 = board.pp8 ? board.pp8[0] : null

    const checkedByPlayerArr = useRef([[], [], [], [], [], [], [], [], [], []])
    const attackedByOpponentArr = useRef([])
    const checkedByOpponentArr = useRef([[], [], [], [], [], []])

    let playerKingSpiderSenseArr = useRef([])

    const playerKingSpiderSense = () => {
        let arr = [[], [], []]

        checkArrays(whiteBishopMoves, playerKing, arr[0], playerSquaresLive, enemySquaresLive, true)
        checkArrays(blackBishopMoves, playerKing, arr[1], playerSquaresLive, enemySquaresLive, true)
        checkArrays(rookMoves, playerKing, arr[2], playerSquaresLive, enemySquaresLive, true)

        playerKingSpiderSenseArr.current = arr
    }

    

    let enemyKingSpiderSenseArr = useRef([])

    const enemyKingSpiderSense = () => {
        let arr = [[], [], []]

        checkArrays(whiteBishopMoves, enemyKing, arr[0], enemySquaresLive, playerSquaresLive, true)
        checkArrays(blackBishopMoves, enemyKing, arr[1], enemySquaresLive, playerSquaresLive, true)
        checkArrays(rookMoves, enemyKing, arr[2], enemySquaresLive, playerSquaresLive, true)

        enemyKingSpiderSenseArr.current = arr
    }

    const attackedByOpponent = () => {
        let arr = []

        recordKnightMoves(enemyKnight1.current, arr, enemySquaresRender)
        recordKnightMoves(enemyKnight2.current, arr, enemySquaresRender)
        checkArrays(whiteBishopMoves, enemyBishop1.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(blackBishopMoves, enemyBishop2.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(rookMoves, enemyRook1.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(rookMoves, enemyRook2.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(whiteBishopMoves, enemyQueen1.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(blackBishopMoves, enemyQueen1.current, arr, enemySquaresRender, playerSquaresRender, true)
        checkArrays(rookMoves, enemyQueen1.current, arr, enemySquaresRender, playerSquaresRender, true)
        // recordOpponentKingMoves(enemyKing, arr)
        recordOpponentPawnMoves(enemyPawn1, arr)
        recordOpponentPawnMoves(enemyPawn2, arr)
        recordOpponentPawnMoves(enemyPawn3, arr)
        recordOpponentPawnMoves(enemyPawn4, arr)
        recordOpponentPawnMoves(enemyPawn5, arr)
        recordOpponentPawnMoves(enemyPawn6, arr)
        recordOpponentPawnMoves(enemyPawn7, arr)
        recordOpponentPawnMoves(enemyPawn8, arr)

        attackedByOpponentArr.current = arr
    }

    const renderBoard = () => {
        let arr1 = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        let arr5 = []
        let arr6 = []
        let arr7 = []
        let arr8 = []

        for(let i = 0; i < 8; i++) {
            arr1.push("1")
            arr2.push("1")
            arr3.push("1")
            arr4.push("1")
            arr5.push("1")
            arr6.push("1")
            arr7.push("1")
            arr8.push("1")
        }

        return (
            <div className="board">
                {arr1.map((a, i) => <div key={i + 1} className={`${i % 2 === 0 ? "white" : "black"} ${i + 1 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 1) && !enemySquaresRender.includes(i + 1) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 1) && enemySquaresRender.includes(i + 1) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 1 || lastMadeMove[1] === i + 1 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr2.map((a, i) => <div key={i + 9} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 9 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 9) && !enemySquaresRender.includes(i + 9) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 9) && enemySquaresRender.includes(i + 9) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 9 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr3.map((a, i) => <div key={i + 17} className={`${i % 2 === 0 ? "white" : "black"} ${i + 17 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 17) && !enemySquaresRender.includes(i + 17) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 17) && enemySquaresRender.includes(i + 17) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 17 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr4.map((a, i) => <div key={i + 25} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 25 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 25) && !enemySquaresRender.includes(i + 25) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 25) && enemySquaresRender.includes(i + 25) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 25 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr5.map((a, i) => <div key={i + 33} className={`${i % 2 === 0 ? "white" : "black"} ${i + 33 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 33) && !enemySquaresRender.includes(i + 33) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 33) && enemySquaresRender.includes(i + 33) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 33 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr6.map((a, i) => <div key={i + 41} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 41 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 41) && !enemySquaresRender.includes(i + 41) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 41) && enemySquaresRender.includes(i + 41) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 41 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr7.map((a, i) => <div key={i + 49} className={`${i % 2 === 0 ? "white" : "black"} ${i + 49 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 49) && !enemySquaresRender.includes(i + 49) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 49) && enemySquaresRender.includes(i + 49) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 49 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr8.map((a, i) => <div key={i + 57} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 57 === pieceSquare ? "highlight" : null}`} >
                    {moveSquares.includes(i + 57) && !enemySquaresRender.includes(i + 57) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 57) && enemySquaresRender.includes(i + 57) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 57 || lastMadeMove[1] === i + 57 ? <div className="lastMadeMove"></div> : null}
                </div>)}
            </div>
        )
    }

    const promotePawn = (pawn, pieceToPromoteToW, pieceToPromoteToB) => {
        const pieceToPromoteTo = color === "white" ? pieceToPromoteToW : pieceToPromoteToB

        store.dispatch({
            type: "pawnPromotion",
            payload: {pawn, pieceToPromoteTo}
        })

        setPawnPromotes(false)
    }

    const renderPieces = () => {
        const renderEachPiece = (a, src1, src2, alt1, alt2, piece) => {
            return (
                (color === "white"
                    ?
                    <img src={src1}
                        key={a}
                        alt={alt1}
                        className="piece"
                        style={activeStatePiece === `${piece}`
                            ?
                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                            :
                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                    </img>
                    : 
                    <img src={src2}
                        key={a}
                        alt={alt2}
                        className="piece"
                        style={activeStatePiece === `${piece}`
                            ?
                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                            :
                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                    </img>)
            )
        }

        const renderRoyals = (a, src, alt, piece) => {
            return (
                <img src={src}
                    key={a}
                    alt={alt}
                    className={`${(/^ok/.test(piece) && enemyKingAttacked) || (/^pk/.test(piece) && playerKingAttacked) ? "kingInCheck" : null} piece`}
                    style={activeStatePiece === `${piece}`
                        ?
                        {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                        :
                        {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                </img>
            )
        }

        const renderEntries = (a, i) => {
            switch (a) {
                case "or1": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook", "or1")
                case "or2":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook", "or2")
                case "oh1": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight", "oh1")
                case "oh2":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight", "oh2")
                case "ob1": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop", "ob1")
                case "ob2":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop", "ob2") 
                case "okw":
                    return renderRoyals(a, whiteKing, "White King", "okw") 
                case "okb":
                    return renderRoyals(a, blackKing, "Black King", "okb") 
                case "oqw1":
                    return renderRoyals(a, whiteQueen, "White Queen", "oqw1") 
                case "oqw2":
                    return renderRoyals(a, whiteQueen, "White Queen", "oqw2") 
                case "oqw3":
                    return renderRoyals(a, whiteQueen, "White Queen", "oqw3") 
                case "oqw4":
                    return renderRoyals(a, whiteQueen, "White Queen", "oqw4") 
                case "oqb1":
                    return renderRoyals(a, blackQueen, "Black Queen", "oqb1") 
                case "oqb2":
                    return renderRoyals(a, blackQueen, "Black Queen", "oqb2") 
                case "oqb3":
                    return renderRoyals(a, blackQueen, "Black Queen", "oqb3") 
                case "oqb4":
                    return renderRoyals(a, blackQueen, "Black Queen", "oqb4") 
                case "op1": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op1")
                case "op2": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op2")
                case "op3": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op3")
                case "op4": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op4")
                case "op5": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op5")
                case "op6": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op6")
                case "op7": 
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op7")
                case "op8":
                    return renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn", "op8")
                case "pr1": 
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook", "pr1")
                case "pr2":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook", "pr2")
                case "ph1":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "ph1")
                case "ph2":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "ph2")
                case "pb1": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb1")
                case "pb2":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb2")
                case "pkw":
                    return renderRoyals(a, whiteKing, "White King", "pkw")
                case "pkb":
                    return renderRoyals(a, blackKing, "Black King", "pkb")
                case "pqw1":
                    return renderRoyals(a, whiteQueen, "White Queen", "pqw1")
                case "pqw2":
                    return renderRoyals(a, whiteQueen, "White Queen", "pqw2")
                case "pqw3":
                    return renderRoyals(a, whiteQueen, "White Queen", "pqw3")
                case "pqw4":
                    return renderRoyals(a, whiteQueen, "White Queen", "pqw4")
                case "pqb1":
                    return renderRoyals(a, blackQueen, "Black Queen", "pqb1")
                case "pqb2":
                    return renderRoyals(a, blackQueen, "Black Queen", "pqb2")
                case "pqb3":
                    return renderRoyals(a, blackQueen, "Black Queen", "pqb3")
                case "pqb4":
                    return renderRoyals(a, blackQueen, "Black Queen", "pqb4")
                case "pp1":
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp1")
                case "pp2": 
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp2")
                case "pp3": 
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp3")
                case "pp4": 
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp4")
                case "pp5": 
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp5")
                case "pp6": 
                    return <div className="pawnContainer">
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp6")}
                            <div className="pawnPromotion" style={pawnPromotes ? {display: "block"} : {display: "none"}}>
                                <div className="promotionPiece">
                                    <img 
                                    src={color === "white" ? whiteQueen : blackQueen} 
                                    alt="Player Queen" 
                                    className="piece"
                                    onClick={() => promotePawn("pp6", "pqw2", "pqb2")}/>
                                </div>
                                <div className="promotionPiece">
                                    <img 
                                    src={color === "white" ? whiteRook : blackRook} 
                                    alt="Player Rook" 
                                    className="piece"
                                    onClick={() => promotePawn("pp6")}/>
                                </div>
                                <div className="promotionPiece">
                                    <img 
                                    src={color === "white" ? whiteBishop : blackBishop} 
                                    alt="Player Bishop" 
                                    className="piece"
                                    onClick={() => promotePawn("pp6")}/>
                                </div>
                                <div className="promotionPiece">
                                    <img 
                                    src={color === "white" ? whiteKnight : blackKnight} 
                                    alt="Player Knight" 
                                    className="piece"
                                    onClick={() => promotePawn("pp6")}/>
                                </div>
                            </div>
                        </div>
                case "pp7": 
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp7")
                case "pp8":
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp8")
                default:
                    return (
                        <div className="piece"></div>
                    )
            }
        }

        return (
            <div className="piecesGrid">
                {boardEntries.map((a, i) => renderEntries(a[0], i))}
            </div>
        )
    }

    const renderMovement = () => {
        let arr1 = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        let arr5 = []
        let arr6 = []
        let arr7 = []
        let arr8 = []

        for(let i = 0; i < 8; i++) {
            arr1.push("1")
            arr2.push("1")
            arr3.push("1")
            arr4.push("1")
            arr5.push("1")
            arr6.push("1")
            arr7.push("1")
            arr8.push("1")
        }

        return (
            <div className="movementGrid">
                <div className="pawnPromotionOverlay" style={pawnPromotes ? {display: "block"} : {display: "none"}}></div>

                {arr1.map((a, i) => <div key={i + 1} 
                                        onClick={() => onSquareClick(i + 1, boardEntries[i][0])}
                                        className="movementSquare">
                                            {numbers ? i + 1 : ""}
                                            {moveSquares.includes(i + 1) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}
                                    
                {arr2.map((a, i) => <div key={i + 9}
                                        onClick={() => onSquareClick(i + 9, boardEntries[i + 8][0])}
                                        className="movementSquare">
                                            {numbers ? i + 9 : ""}
                                            {moveSquares.includes(i + 9) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr3.map((a, i) => <div key={i + 17} 
                                        onClick={() => onSquareClick(i + 17, boardEntries[i + 16][0])}
                                        className="movementSquare">
                                            {numbers ? i + 17 : ""}
                                            {moveSquares.includes(i + 17) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr4.map((a, i) => <div key={i + 25}
                                        onClick={() => onSquareClick(i + 25, boardEntries[i + 24][0])}
                                        className="movementSquare">
                                            {numbers ? i + 25 : ""}
                                            {moveSquares.includes(i + 25) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr5.map((a, i) => <div key={i + 33} 
                                        onClick={() => onSquareClick(i + 33, boardEntries[i + 32][0])}
                                        className="movementSquare">
                                            {numbers ? i + 33 : ""}
                                            {moveSquares.includes(i + 33) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr6.map((a, i) => <div key={i + 41}
                                        onClick={() => onSquareClick(i + 41, boardEntries[i + 40][0])}
                                        className="movementSquare">
                                            {numbers ? i + 41 : ""}
                                            {moveSquares.includes(i + 41) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr7.map((a, i) => <div key={i + 49}
                                        onClick={() => onSquareClick(i + 49, boardEntries[i + 48][0])}
                                        className="movementSquare">
                                            {numbers ? i + 49 : ""}
                                            {moveSquares.includes(i + 49) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr8.map((a, i) => <div key={i + 57} 
                                        onClick={() => onSquareClick(i + 57, boardEntries[i + 56][0])}
                                        className="movementSquare">
                                            {numbers ? i + 57 : ""}
                                            {moveSquares.includes(i + 57) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}
            </div>
        )
    }

    function checkArrays(arrayChecked, i, arr, ownArr, oppArr, exclude) {
        for (const subArr of arrayChecked) {
            if (subArr.includes(i)) {
                for (let j = i + 1; j <= Math.max(...subArr); j++) {
                    if (subArr.includes(j)) {
                        if (ownArr.includes(j) && exclude) {
                            break
                        } else if (oppArr.includes(j) && j !== playerKing && j !== enemyKing && exclude) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                    }
                }
                for (let j = i - 1; j >= Math.min(...subArr); j--) {
                    if (subArr.includes(j)) {
                        if (ownArr.includes(j) && exclude) {
                            break
                        } else if (oppArr.includes(j) && j !== playerKing && j !== enemyKing && exclude) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                    }
                }
            }
        }
    }

    function recordKnightMoves(i, arrMoves, excArr) {    
        let arr = []
        if (knightLimits[0].includes(i)) {
            arr = [i - 15, i - 6, i + 10, i + 17]
        } else if (knightLimits[1].includes(i)) {
            arr = [i - 17, i - 15, i - 6, i + 10, i + 15, i + 17]
        } else if (knightLimits[2].includes(i)) {
            arr = [i - 17, i - 15, i - 10, i + 6, i + 15, i + 17]
        } else if (knightLimits[3].includes(i)) {
            arr = [i - 17, i - 10, i + 6, i + 15]
        }
        else {
            arr = [i - 17, i - 15, i - 10, i - 6, i + 6, i + 10, i + 15, i + 17]
        }
        for (const number of arr) {
            if (excArr.includes(number)) {
                arr = arr.filter(x => x !== number)
            }
        }
        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordPawnMoves = (i, piece, arrMoves) => {    
        let arr = []

        if (pawnsFirstMove[piece]) {
            arr = [i - 8, i - 16]
        } else {
            arr = [i - 8]
        }
        
        if (occupiedSquares.includes(i - 8)) {
            arr = []
        } else if (occupiedSquares.includes(i - 16)) {
            arr = [i - 8]
        }

        if (enemySquaresRender.includes(i - 9) && !knightLimits[0].includes(i)) {
            arr.push(i - 9)
        }

        if (enemySquaresRender.includes(i - 7) && !knightLimits[3].includes(i)) {
            arr.push(i - 7)
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    // function recordOpponentKingMoves(i, arrMoves) {
    //     let arr = []
                
    //     if (knightLimits[0].includes(i)) {
    //         arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
    //     } else if (knightLimits[3].includes(i)) {
    //         arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
    //     } else {
    //         arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
    //     }

    //     for (const number of arr) {
    //         arrMoves.push(number)
    //     }
    // }

    function recordOpponentPawnMoves(i, arrMoves) {
        let arr = []

        if (!knightLimits[0].includes(i)) {
            arr.push(i + 7)
        }

        if (!knightLimits[3].includes(i)) {
            arr.push(i + 9)
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    function onSquareClick(i, piece) {
        if (!moveSquares.includes(i) || (playerSquaresRender.includes(i) && activeStatePiece === piece)){
            setMoveSquares([])
            setActiveStatePiece("")
            setPieceSquare(null)
        }

        if 
        // (playerSquares.includes(i) && activeStatePiece !== piece) 
        ((((/^o/.test(activePiece) && !/^p/.test(piece)) || activeStatePiece === "") || ((/^p/.test(activePiece) && !/^o/.test(piece)) || activeStatePiece === "")) && (occupiedSquares.includes(i) && activeStatePiece !== piece) ) 
        {
            setMoveSquares([])
            setPieceSquare(i)
            setActiveStatePiece(piece)

            pieceSquareForEngine.current = i
            playerPiece.current = boardEntries.filter(([key, value]) => value[0] === pieceSquareForEngine.current).flat()[1][1]
            
            if (store.getState().activePiece !== piece) {
                store.dispatch({
                    type: "activePiece",
                    payload: piece
                })
            }

            if (store.getState().oldSquare !== i) {
                store.dispatch({
                    type: "oldSquare",
                    payload: i
                })
            }

            if (/^ph/.test(piece)) {   
                let arr = []
                recordKnightMoves(i, arr, playerSquaresRender)
                setMoveSquares(arr)
            }

            if (/^pp/.test(piece)) {
                let arr = []
                recordPawnMoves(i, piece, arr)
                setMoveSquares(arr)
            }

            if (/^pr/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                setMoveSquares(arr)
            }

            if (piece === "pb1") {
                let arr = []
                checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                setMoveSquares(arr)
            }

            if (piece === "pb2") {
                let arr = []
                checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                setMoveSquares(arr)
            }

            if (/^pqw/.test(piece) || /^pqb/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true)
                setMoveSquares(arr)
            }


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (/^oh/.test(piece)) {   
                let arr = []
                recordKnightMoves(i, arr, enemySquaresRender)
                setMoveSquares(arr)
            }

            if (/^op/.test(piece)) {
                let arr = [i + 8, i + 16]
                setMoveSquares(arr)
            }

            if (/^or/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                setMoveSquares(arr)
            }

            if (piece === "ob1") {
                let arr = []
                checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                setMoveSquares(arr)
            }

            if (piece === "ob2") {
                let arr = []
                checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                setMoveSquares(arr)
            }

            if (/^oqw/.test(piece) || /^oqb/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true)
                setMoveSquares(arr)
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (piece === "pkw" || piece === "pkb") {
                attackedByOpponent()

                // console.log(JSON.stringify(playerSquaresRender))
                // console.log(JSON.stringify(playerSquaresLive))

                let arr = []
                
                if (castlingPlayerMoved[piece.slice(0, 2)] && castlingPlayerMoved.pr2 && castlingPlayerMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2]
                } else if (castlingPlayerMoved[piece.slice(0, 2)] && castlingPlayerMoved.pr2) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2]
                } else if (castlingPlayerMoved[piece.slice(0, 2)] && castlingPlayerMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2]
                } else if (knightLimits[0].includes(i)) {
                    arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
                } else if (knightLimits[3].includes(i)) {
                    arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
                } else {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
                }

                for (const number of arr) {
                    if (playerSquaresRender.includes(number)) {
                        arr = arr.filter(x => x !== number)
                        if (!arr.includes(60) && i === 61) {
                            arr = arr.filter(x => x !== 59)
                        }
                        if (!arr.includes(62) && i === 61) {
                            arr = arr.filter(x => x !== 63)
                        }
                        arr = arr.filter(a => !attackedByOpponentArr.current.includes(a))
                        setMoveSquares(arr)
                    } else {
                        arr = arr.filter(a => !attackedByOpponentArr.current.includes(a))
                        setMoveSquares(arr)
                    }
                }
            }
        }

        if (activePiece === "ph1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            recordKnightMoves(i, checkedByPlayerArr.current[7], playerSquaresLive)
            playerKnight1.current = i
            moveKnight(i, activePiece)
        } 
        
        if (activePiece === "ph2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            recordKnightMoves(i, checkedByPlayerArr.current[8], playerSquaresLive)
            playerKnight2.current = i
            moveKnight(i, activePiece)
        }

        if (/^pp/.test(activePiece) && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            recordPawnMoves(i, activePiece, checkedByPlayerArr.current[9])
            movePawn(i, activePiece)
        } 


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if (activePiece === "oh1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            recordKnightMoves(i, checkedByOpponentArr.current[0], enemySquaresLive)
            enemyKnight1.current = i
            moveKnight(i, activePiece)
            checkedByOpponentArr.current[0] = []
        } 
        
        if (activePiece === "oh2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            recordKnightMoves(i, checkedByOpponentArr.current[1], enemySquaresLive)
            enemyKnight2.current = i
            moveKnight(i, activePiece)
            checkedByOpponentArr.current[1] = []
        }

        if (/^op/.test(activePiece) && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            movePawn(i, activePiece)
            
        } 
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (activePiece === "pb1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(blackBishopMoves, i, checkedByPlayerArr.current[5], playerSquaresLive, enemySquaresLive, true)
            
            playerBishop1.current = i
            moveBishop(i, activePiece)
        } 
        
        if (activePiece === "pb2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current[6], playerSquaresLive, enemySquaresLive, true)
            
            playerBishop2.current = i
            moveBishop(i, activePiece)
        }

        if (activePiece === "pr1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(rookMoves, i, checkedByPlayerArr.current[3], playerSquaresLive, enemySquaresLive, true)
            
            playerRook1.current = i
            moveRook(i, activePiece)
        }
        
        if (activePiece === "pr2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(rookMoves, i, checkedByPlayerArr.current[4], playerSquaresLive, enemySquaresLive, true)
            
            playerRook2.current = i
            moveRook(i, activePiece)
        }

        if (/^pq/.test(activePiece) && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            
            checkArrays(rookMoves, i, checkedByPlayerArr.current[0], playerSquaresLive, enemySquaresLive, true)
            checkArrays(blackBishopMoves, i, checkedByPlayerArr.current[0], playerSquaresLive, enemySquaresLive, true)
            checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current[0], playerSquaresLive, enemySquaresLive, true)

            if (activePiece === "pqw1" || activePiece === "pqb1") {
                playerQueen1.current = i
            }

            moveQueen(i, activePiece)
        } 

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (activePiece === "ob1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current[2], enemySquaresLive, playerSquaresLive, true)
            moveBishop(i, activePiece)
            
            enemyBishop1.current = i
            checkedByOpponentArr.current[2] = []
        } 
        
        if (activePiece === "ob2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current[3], enemySquaresLive, playerSquaresLive, true)
            moveBishop(i, activePiece)
            
            enemyBishop2.current = i
            checkedByOpponentArr.current[3] = []
        } 

        if (activePiece === "or1" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(rookMoves, i, checkedByOpponentArr.current[3], enemySquaresLive, playerSquaresLive, true)
            moveRook(i, activePiece)
            
            enemyRook1.current = i
            checkedByOpponentArr.current[3] = []
        }
        
        if (activePiece === "or2" && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)
            checkArrays(rookMoves, i, checkedByOpponentArr.current[4], enemySquaresLive, playerSquaresLive, true)
            moveRook(i, activePiece)
           
            enemyRook2.current = i
            checkedByOpponentArr.current[4] = []
        }

        if (/^oq/.test(activePiece) && moveSquares.includes(i)) {
            updateStateBoard(i, activePiece)

            checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)
            checkArrays(blackBishopMoves, i, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)
            checkArrays(rookMoves, i, checkedByOpponentArr.current[5], enemySquaresLive, playerSquaresLive, true)

            

            enemyQueen1.current = i

            moveQueen(i, activePiece)

            checkedByOpponentArr.current[5] = []
        } 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (activePiece === "pkw" && moveSquares.includes(i) && !attackedByOpponentArr.current.includes(i)) {
            updateStateBoard(i, activePiece)
            moveKing(i, "pkw")
            playerKing = i
            playerKingSpiderSense()
        } 
        
        if (activePiece === "pkb" && moveSquares.includes(i) && !attackedByOpponentArr.current.includes(i)) {
            updateStateBoard(i, activePiece)
            moveKing(i, "pkb")
            playerKing = i
            playerKingSpiderSense()
        }
    }

    function updateStateBoard(i, string) {
        if (/^pp/.test(string)) {
            store.dispatch({
                type: "pawnMoved",
                payload: string
            })
        }

        if (/^pr/.test(string) || /^pk/.test(string)) {
            store.dispatch({
                type: "castlingPlayerMoved",
                payload: string
            })
        } 
        
        if (/^or/.test(string) || /^ok/.test(string)){
            store.dispatch({
                type: "castlingEnemyMoved",
                payload: string
            })
        }

        store.dispatch({
            type: "newSquare",
            payload: i
        })

        if (/^o/.test(string)) {
            if (playerSquaresRender.includes(i)) {
                store.dispatch({
                    type: string,
                    payload: "takes"
                })
            } else {
                store.dispatch({
                    type: string,
                })
            }
        }

        if (/^p/.test(string)) {
            if (enemySquaresRender.includes(i)) {
                store.dispatch({
                    type: string,
                    payload: "takes"
                })
            } else {
                store.dispatch({
                    type: string,
                })
            }
        } 

        recordBoard()
    }

    const animatePiece = (i, string, num1, num2) => {        
        setMoveVar([num1, num2])

        if (/^o/.test(string)) {
            if (playerSquaresRender.includes(i)) {
                store.dispatch({
                    type: "halfMoveCounter/reset",
                })
                
                // if (i === store.getState().checkingPiece[1]) {
                //     captureSound.play()
                //     store.dispatch({
                //         type: "enemyKingAttacked",
                //         payload: false
                //     })
                // }
                
                if (checkedByOpponentArr.current.flat().includes(playerKing)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    store.dispatch({
                        type: "checkingPiece",
                        payload: [string, i]
                    })
                } 
                
                if (!checkedByOpponentArr.current.flat().includes(playerKing)) {
                    captureSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 

                if ((playerKingSpiderSenseArr.current[0].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[0].includes(enemyBishop2.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }

                if ((playerKingSpiderSenseArr.current[1].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[1].includes(enemyBishop1.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }

                if ((playerKingSpiderSenseArr.current[2].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[2].includes(enemyRook1.current) 
                    || playerKingSpiderSenseArr.current[2].includes(enemyRook2.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyBishop1.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyBishop2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }

                captureSound.play()
            } else {
                // console.log(checkedByOpponentArr.current.flat())
                // console.log(playerKingSpiderSenseArr.current)

                if (/^op/.test(string)) {
                    store.dispatch({
                        type: "halfMoveCounter/reset",
                    })
                } else {
                    store.dispatch({
                        type: "halfMoveCounter/increase",
                    })
                }
                
                if ((!checkedByPlayerArr.current.flat().includes(i) && /^ok/.test(string)) || checkedByPlayerArr.current.flat().includes(i)) {
                    moveSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 
                
                if (checkedByOpponentArr.current.flat().includes(playerKing)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    store.dispatch({
                        type: "checkingPiece",
                        payload: [string, i]
                    })
                } 
                
                if (!checkedByOpponentArr.current.flat().includes(playerKing)) {
                    moveSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 

                if ((playerKingSpiderSenseArr.current[0].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[0].includes(enemyBishop2.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    
                }

                if ((playerKingSpiderSenseArr.current[1].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[1].includes(enemyBishop1.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook1.current) 
                    && !playerKingSpiderSenseArr.current.includes(enemyRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    
                }

                if ((playerKingSpiderSenseArr.current[2].includes(enemyQueen1.current) 
                    || playerKingSpiderSenseArr.current[2].includes(enemyRook1.current) 
                    || playerKingSpiderSenseArr.current[2].includes(enemyRook2.current))
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight2.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyKnight1.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyBishop1.current)
                    && !playerKingSpiderSenseArr.current.includes(enemyBishop2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    console.log(playerKingSpiderSenseArr.current[2])
                    console.log(enemyQueen1.current)
                }
                
                moveSound.play()
            }

            if (color === "white") {
                setToMove("w")
            } else {
                setToMove("b")
            }
        }

        if (/^p/.test(string)) {
            if (enemySquaresRender.includes(i)) {
                store.dispatch({
                    type: "halfMoveCounter/reset",
                })

                // if (i === store.getState().checkingPiece[1]) {
                //     captureSound.play()
                //     store.dispatch({
                //         type: "playerKingAttacked",
                //         payload: false
                //     })
                // }

                if (/^pp/.test(string) && rookMoves[0].includes(i)) {
                    setPawnPromotes(true)
                }
                
                if (checkedByPlayerArr.current.flat().includes(enemyKing)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    store.dispatch({
                        type: "checkingPiece",
                        payload: [string, i]
                    })
                } 
                
                if (!checkedByPlayerArr.current.flat().includes(enemyKing)) {
                    captureSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 

                if ((enemyKingSpiderSenseArr.current[0].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[0].includes(playerBishop2.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                }

                if ((enemyKingSpiderSenseArr.current[1].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[1].includes(playerBishop1.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                }

                if ((enemyKingSpiderSenseArr.current[2].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[2].includes(playerRook1.current) 
                    || enemyKingSpiderSenseArr.current[2].includes(playerRook2.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerBishop1.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerBishop2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                }

                captureSound.play()
            } else {

                if (/^pp/.test(string) && rookMoves[0].includes(i)) {
                    setPawnPromotes(true)
                }

                if (/^pp/.test(string)) {
                    store.dispatch({
                        type: "halfMoveCounter/reset",
                    })
                } else {
                    store.dispatch({
                        type: "halfMoveCounter/increase",
                    })
                }
                
                if ((!checkedByOpponentArr.current.flat().includes(i) && /^pk/.test(string)) || checkedByOpponentArr.current.flat().includes(i)) {
                    moveSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 
                
                if (checkedByPlayerArr.current.flat().includes(enemyKing)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    store.dispatch({
                        type: "checkingPiece",
                        payload: [string, i]
                    })
                    
                } 
                
                if (!checkedByPlayerArr.current.flat().includes(enemyKing)) {
                    moveSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 

                if ((enemyKingSpiderSenseArr.current[0].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[0].includes(playerBishop2.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                if ((enemyKingSpiderSenseArr.current[1].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[1].includes(playerBishop1.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook1.current) 
                    && !enemyKingSpiderSenseArr.current.includes(playerRook2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                if ((enemyKingSpiderSenseArr.current[2].includes(playerQueen1.current) 
                    || enemyKingSpiderSenseArr.current[2].includes(playerRook1.current) 
                    || enemyKingSpiderSenseArr.current[2].includes(playerRook2.current))
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight2.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerKnight1.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerBishop1.current)
                    && !enemyKingSpiderSenseArr.current.includes(playerBishop2.current)) {
                    checkSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                moveSound.play()
            }

            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }

            checkedByPlayerArr.current[0] = []
            checkedByPlayerArr.current[1] = []
            checkedByPlayerArr.current[2] = []
            checkedByPlayerArr.current[3] = []
            checkedByPlayerArr.current[4] = []
            checkedByPlayerArr.current[6] = []
            checkedByPlayerArr.current[7] = []
            checkedByPlayerArr.current[8] = []
            checkedByPlayerArr.current[9] = []
        }

        if (color === "black" && toMove === "w") {
            store.dispatch({
                type: "moveCounter"
            })
        }

        setLastMadeMove([i, null])
        setMoveSquares([])
        setPieceSquare(null)
    }  

    const moveKnight = (i, string) => {
        switch (pieceSquareForEngine.current - i) {
            case -17:
                animatePiece(i, string, -80, -160)
                break;
            case -15:
                animatePiece(i, string, 80, -160)
                break;
            case -10:
                animatePiece(i, string, -160, -80)
                break;
            case -6:
                animatePiece(i, string, 160, -80)
                break;
            case 6:
                animatePiece(i, string, -160, 80)
                break;
            case 10:
                animatePiece(i, string, 160, 80)
                break;
            case 15:
                animatePiece(i, string, -80, 160)
                break;
            case 17:
                animatePiece(i, string, 80, 160)
                break;
            default:
                break;
        }   
    }

    function movePawn(i, string) {
        switch (pieceSquareForEngine.current - i) {
            case 7:
                animatePiece(i, string, -80, 80)
                break;
            case 8:
                animatePiece(i, string, 0, 80)
                break;
            case 9:
                animatePiece(i, string, 80, 80)
                break;
            case 16:
                enPassantSquare = i + 8
                animatePiece(i, string, 0, 160)
                break;
            case -16: 
                enPassantSquare = i - 8
                animatePiece(i, string, 0, -160)
                break;
            case -8: 
                animatePiece(i, string, 0, -80)
                break;
            case -7: 
                animatePiece(i, string, 80, -80)
                break;
            case -9: 
                animatePiece(i, string, -80, -80)
                break;
            default:
                break;
        }
    }

    const moveBishop = (i, string) => {
        switch (pieceSquareForEngine.current - i) {
            case 9:
                animatePiece(i, string, 80, 80)
                break;
            case 18:
                animatePiece(i, string, 160, 160)
                break;
            case 27:
                animatePiece(i, string, 240, 240)
                break;
            case 36:
                animatePiece(i, string, 320, 320)
                break;
            case 45:
                animatePiece(i, string, 400, 400)
                break;
            case 54:
                animatePiece(i, string, 480, 480)
                break;
            case 63:
                animatePiece(i, string, 560, 560)
                break;
            case -9: 
                animatePiece(i, string, -80, -80)
                break;
            case -18:
                animatePiece(i, string, -160, -160)
                break;
            case -27:
                animatePiece(i, string, -240, -240)
                break;
            case -36:
                animatePiece(i, string, -320, -320)
                break;
            case -45:
                animatePiece(i, string, -400, -400)
                break;
            case -54:
                animatePiece(i, string, -480, -480)
                break;
            case -63:
                animatePiece(i, string, -560, -560)
                break;
            case 7:
                animatePiece(i, string, -80, 80)
                break;
            case 14:
                animatePiece(i, string, -160, 160)
                break;
            case 21: 
                animatePiece(i, string, -240, 240)
                break;
            case 28: 
                animatePiece(i, string, -320, 320)
                break;
            case 35: 
                animatePiece(i, string, -400, 400)
                break;
            case 42: 
                animatePiece(i, string, -480, 480)
                break;
            case -7:
                animatePiece(i, string, 80, -80)
                break;
            case -14:
                animatePiece(i, string, 160, -160)
                break;
            case -21: 
                animatePiece(i, string, 240, -240)
                break;
            case -28: 
                animatePiece(i, string, 320, -320)
                break;
            case -35: 
                animatePiece(i, string, 400, -400)
                break;
            case -42: 
                animatePiece(i, string, 480, -480)
                break;
            default:
                break;
        }
    }

    const moveRook = (i, string) => {
        switch (pieceSquareForEngine.current - i) {
            case 8:
                animatePiece(i, string, 0, 80)
                break;
            case 16:
                animatePiece(i, string, 0, 160)
                break;
            case 24:
                animatePiece(i, string, 0, 240)
                break;
            case 32:
                animatePiece(i, string, 0, 320)
                break;
            case 40:
                animatePiece(i, string, 0, 400)
                break;
            case 48:
                animatePiece(i, string, 0, 480)
                break;
            case 56:
                animatePiece(i, string, 0, 560)
                break;
            case -8:
                animatePiece(i, string, 0, -80)
                break;
            case -16:
                animatePiece(i, string, 0, -160)
                break;
            case -24:
                animatePiece(i, string, 0, -240)
                break;
            case -32:
                animatePiece(i, string, 0, -320)
                break;
            case -40:
                animatePiece(i, string, 0, -400)
                break;
            case -48:
                animatePiece(i, string, 0, -480)
                break;
            case -56:
                animatePiece(i, string, 0, -560)
                break;
            case 1:
                animatePiece(i, string, 80, 0)
                break;
            case 2:
                animatePiece(i, string, 160, 0)
                break;
            case 3:
                animatePiece(i, string, 240, 0)
                break;
            case 4:
                animatePiece(i, string, 320, 0)
                break;
            case 5:
                animatePiece(i, string, 400, 0)
                break;
            case 6:
                animatePiece(i, string, 480, 0)
                break;
            case 7:
                animatePiece(i, string, 560, 0)
                break;
            case -1:
                animatePiece(i, string, -80, 0)
                break;
            case -2:
                animatePiece(i, string, -160, 0)
                break;
            case -3:
                animatePiece(i, string, -240, 0)
                break;
            case -4:
                animatePiece(i, string, -320, 0)
                break;
            case -5:
                animatePiece(i, string, -400, 0)
                break;
            case -6:
                animatePiece(i, string, -480, 0)
                break;
            case -7:
                animatePiece(i, string, -560, 0)
                break;

            default:
                break;
        }
    }

    const moveQueen = (i, string) => {
        if ((knightLimits[0].includes(pieceSquare) || knightLimits[3].includes(pieceSquare)) 
            && 
            (knightLimits[0].includes(i) || knightLimits[3].includes(i))) {
            switch (pieceSquareForEngine.current - i) {
                case -7:
                    animatePiece(i, string, -560, 0)
                    break;
                case 7:
                    animatePiece(i, string, 560, 0)
                    break;
                default:
                    break;
            }
        } else {
            switch (pieceSquareForEngine.current - i) {
                case -7:
                    animatePiece(i, string, 80, -80)
                    break;
                case 7:
                    animatePiece(i, string, -80, 80)
                    break;
                default:
                    break;
            }
        }
        switch (pieceSquareForEngine.current - i) {                                                   
            case 9:
                animatePiece(i, string, 80, 80)
                break;
            case 18:
                animatePiece(i, string, 160, 160)
                break;
            case 27:
                animatePiece(i, string, 240, 240)
                break;
            case 36:
                animatePiece(i, string, 320, 320)
                break;
            case 45:
                animatePiece(i, string, 400, 400)
                break;
            case 54:
                animatePiece(i, string, 480, 480)
                break;
            case 63:
                animatePiece(i, string, 560, 560)
                break;
            case -9: 
                animatePiece(i, string, -80, -80)
                break;
            case -18:
                animatePiece(i, string, -160, -160)
                break;
            case -27:
                animatePiece(i, string, -240, -240)
                break;
            case -36:
                animatePiece(i, string, -320, -320)
                break;
            case -45:
                animatePiece(i, string, -400, -400)
                break;
            case -54:
                animatePiece(i, string, -480, -480)
                break;
            case -63:
                animatePiece(i, string, -560, -560)
                break;
            case 14:
                animatePiece(i, string, -160, 160)
                break;
            case 21: 
                animatePiece(i, string, -240, 240)
                break;
            case 28: 
                animatePiece(i, string, -320, 320)
                break;
            case 35: 
                animatePiece(i, string, -400, 400)
                break;
            case 42: 
                animatePiece(i, string, -480, 480)
                break;
            case -14:
                animatePiece(i, string, 160, -160)
                break;
            case -21: 
                animatePiece(i, string, 240, -240)
                break;
            case -28: 
                animatePiece(i, string, 320, -320)
                break;
            case -35: 
                animatePiece(i, string, 400, -400)
                break;
            case -42: 
                animatePiece(i, string, 480, -480)
                break;
            case 8:
                animatePiece(i, string, 0, 80)
                break;
            case 16:
                animatePiece(i, string, 0, 160)
                break;
            case 24:
                animatePiece(i, string, 0, 240)
                break;
            case 32:
                animatePiece(i, string, 0, 320)
                break;
            case 40:
                animatePiece(i, string, 0, 400)
                break;
            case 48:
                animatePiece(i, string, 0, 480)
                break;
            case 56:
                animatePiece(i, string, 0, 560)
                break;
            case -8:
                animatePiece(i, string, 0, -80)
                break;
            case -16:
                animatePiece(i, string, 0, -160)
                break;
            case -24:
                animatePiece(i, string, 0, -240)
                break;
            case -32:
                animatePiece(i, string, 0, -320)
                break;
            case -40:
                animatePiece(i, string, 0, -400)
                break;
            case -48:
                animatePiece(i, string, 0, -480)
                break;
            case -56:
                animatePiece(i, string, 0, -560)
                break;
            case 1:
                animatePiece(i, string, 80, 0)
                break;
            case 2:
                animatePiece(i, string, 160, 0)
                break;
            case 3:
                animatePiece(i, string, 240, 0)
                break;
            case 4:
                animatePiece(i, string, 320, 0)
                break;
            case 5:
                animatePiece(i, string, 400, 0)
                break;
            case 6:
                animatePiece(i, string, 480, 0)
                break;
            case -1:
                animatePiece(i, string, -80, 0)
                break;
            case -2:
                animatePiece(i, string, -160, 0)
                break;
            case -3:
                animatePiece(i, string, -240, 0)
                break;
            case -4:
                animatePiece(i, string, -320, 0)
                break;
            case -5:
                animatePiece(i, string, -400, 0)
                break;
            case -6:
                animatePiece(i, string, -480, 0)
                break;
            default:
                break;
        }
    }

    const animateCastling = (coor1, coor2, newSqKing, rookOldSq, newSqRook, rookToMove) => {
        castlingSound.play()

        setMoveVar([coor1, coor2])

        store.dispatch({
            type: "oldSquare",
            payload: rookOldSq
        })

        store.dispatch({
            type: "newSquare",
            payload: newSqRook
        })

        store.dispatch({
            type: rookToMove
        })

        encode()

        setLastMadeMove([newSqKing, newSqRook])

        setMoveSquares([])

        setPieceSquare(null)

        if (color === "white") {
            if (/^pr/.test(rookToMove)) {
                setToMove("b")
            } else {
                setToMove("w")
            }
        } else {
            if (/^pr/.test(rookToMove)) {
                setToMove("w")
            } else {
                setToMove("b")
            }
        }
    }

    const moveKing = (i, string) => {
        if (/^pk/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case -2:
                    animateCastling(-160, 0, i, 64, 62, "pr2")
                    break;
                case 2:
                    animateCastling(160, 0, i, 57, 60, "pr1")
                    break;
                default:
                    break;
            }
        }
        if (/^ok/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case 2:
                    animateCastling(160, 0, i, 1, 4, "or2")
                    break;
                case -2:
                    animateCastling(-160, 0, i, 8, 6, "or1")
                    break;
                default:
                    break;
            }
        }
        switch (pieceSquareForEngine.current - i) {
            case 9:
                animatePiece(i, string, 80, 80)
                break;
            case 8:
                animatePiece(i, string, 0, 80)
                break;
            case 7:
                animatePiece(i, string, -80, 80)
                break;
            case 1:
                animatePiece(i, string, 80, 0)
                break;
            case -1:
                animatePiece(i, string, -80, 0)
                break;
            case -7:
                animatePiece(i, string, 80, -80)
                break;
            case -8:
                animatePiece(i, string, 0, -80)
                break;
            case -9:
                animatePiece(i, string, -80, -80)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            {renderBoard()}
            {renderPieces()}
            {renderMovement()}
        </div>
    )
}

export default Board