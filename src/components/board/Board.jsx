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
    const [toMove, setToMove] = useState("w") // 8

    const board = useSelector(state => state.board)
    const color = useSelector(state => state.color)
    const activePiece = useSelector(state => state.activePiece)
    const numbers = useSelector(state => state.numbers)
    const pawnsFirstMove = useSelector(state => state.pawnsFirstMove)
    const castlingPlayerMoved = useSelector(state => state.castlingPlayerMoved)
    const moveCounter = useSelector(state => state.moveCounter)
    const playerSquares = useSelector(state => state.playerSquares)
    const enemySquares = useSelector(state => state.enemySquares)
    const occupiedSquares = useSelector(state => state.occupiedSquares)
    const enemyKingAttacked = useSelector(state => state.enemyKingAttacked)
    const playerKingAttacked = useSelector(state => state.playerKingAttacked)

    let pieceSquareForEngine = useRef(null)
    let newSquareIDK

    const boardEntries = Object.entries(board)
    const notInitialRender = useRef(false)

    let engineOldSquare
    let engineNewSquare
    let enginePieceToMove
    let enginePieceSquare
    let engineWhereToMove

    const wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))

    const stockfish = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js')
    
    stockfish.addEventListener('message', function(e) {
        if (/^bestmove/.test(e.data)) {
            
            engineOldSquare = e.data.slice(9, 11)
            engineNewSquare = e.data.slice(11, 13)

            enginePieceToMove = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[0]
            enginePieceSquare = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[1][0]
            engineWhereToMove = boardEntries.filter(([key, value]) => value[1] === engineNewSquare).flat()[1][0]

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

            if (color === "white") {
                setToMove("w")
            } else {
                setToMove("b")
            }

            pieceSquareForEngine.current = enginePieceSquare      

            if (/^op/.test(enginePieceToMove)) {
                opponentChecks.current = []
                recordOpponentPawnMoves(engineWhereToMove, opponentChecks.current)
                movePawn(engineWhereToMove, enginePieceToMove)
            } 
            
            if (enginePieceToMove === "ob1") {
                opponentChecks.current = []
                checkArrays(whiteBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                moveBishop(engineWhereToMove, enginePieceToMove)
            } 
            
            if (enginePieceToMove === "ob2") {
                opponentChecks.current = []
                checkArrays(blackBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                moveBishop(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^oh/.test(enginePieceToMove)) {
                opponentChecks.current = []
                recordKnightMoves(engineWhereToMove, opponentChecks.current)
                moveKnight(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^or/.test(enginePieceToMove)) {
                opponentChecks.current = []
                checkArrays(rookMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                moveRook(engineWhereToMove, enginePieceToMove)
                store.dispatch({
                    type: "castlingEnemyMoved",
                    payload: enginePieceToMove
                })
            } 
            
            if (/^oq/.test(enginePieceToMove)) {
                opponentChecks.current = []
                if (board.oqw) {
                    checkArrays(whiteBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                    checkArrays(blackBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                    checkArrays(rookMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                } else {
                    checkArrays(whiteBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                    checkArrays(blackBishopMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                    checkArrays(rookMoves, engineWhereToMove, opponentChecks.current, enemySquares, playerSquares)
                }
                moveQueen(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^ok/.test(enginePieceToMove)) {
                moveKing(engineWhereToMove, enginePieceToMove)
                store.dispatch({
                    type: "castlingEnemyMoved",
                    payload: enginePieceToMove
                })
            }
        }
    });

    const opponentChecks = useRef([])

    let playerPiece = useRef(null)
    let playerNewSquareForEngine

    const engineTurn = () => {
        let string = `position fen ${stringToSend} moves ${playerPiece.current}${playerNewSquareForEngine}`

        // console.log(string)

        // stockfish.postMessage(string)
        // stockfish.postMessage('go movetime 2000')
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
                case "oqw": case "oqb":
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
        fenString += ` ${toMove}`
        if (((castlingPlayerMoved.pkw || castlingPlayerMoved.pkb) && castlingPlayerMoved.pr1) 
            && 
            ((castlingPlayerMoved.pkw || castlingPlayerMoved.pkb) && castlingPlayerMoved.pr2)) {
                if (color === "white") {
                    fenString += " KQ"
                } else {
                    fenString += " kq"
                }
        }
        if (((castlingPlayerMoved.pkw || castlingPlayerMoved.pkb) && castlingPlayerMoved.pr1) && !castlingPlayerMoved.pr2) {
            if (color === "white") {
                fenString += " Q"
            } else {
                fenString += " q"
            }
        }
        if (!castlingPlayerMoved.pr1 && ((castlingPlayerMoved.pkw || castlingPlayerMoved.pkb) && castlingPlayerMoved.pr2)) {
            if (color === "white") {
                fenString += " K"
            } else {
                fenString += " k"
            }
        }
        
        ////////////////////////////////////////////////
        if (color === "white") {
            fenString += "kq"
        } else {
            fenString += "KQ"
        }
        ////////////////////////////////////////

        ////////////////////////////////
        fenString += " - 0 "
        /////////////////////////////////

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

    let moveSound = new Audio(moveSoundFile)
    let captureSound = new Audio(captureSoundFile)
    let castlingSound = new Audio(castlingSoundFile)
    let checkSound = new Audio(checkSoundFile)

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

    const filteredEnemy = boardEntries.filter(([key, value]) => /^o/.test(key))
    const justEnemy = Object.fromEntries(filteredEnemy)

    let attackedByPlayerArr = [[], [], [], [], [], [], [], [], [], []]

    const enemyBishop1 = board.ob1? board.ob1[0] : null
    const enemyBishop2 = board.ob2? board.ob2[0] : null
    const enemyKnight1 = board.oh1? board.oh1[0] : null
    const enemyKnight2 = board.oh2? board.oh2[0] : null
    const enemyRook1 = board.or1 ? board.or1[0] : null
    const enemyRook2 = board.or2 ? board.or2[0] : null
    const enemyQueen = boardEntries.indexOf(boardEntries.filter(([key, value]) => /^oq/.test(key))[0]) + 1
    const enemyKing = boardEntries.indexOf(boardEntries.filter(([key, value]) => /^ok/.test(key))[0]) + 1
    const enemyPawn1 = board.op1 ? board.op1[0] : null
    const enemyPawn2 = board.op2 ? board.op2[0] : null
    const enemyPawn3 = board.op3 ? board.op3[0] : null
    const enemyPawn4 = board.op4 ? board.op4[0] : null
    const enemyPawn5 = board.op5 ? board.op5[0] : null
    const enemyPawn6 = board.op6 ? board.op6[0] : null
    const enemyPawn7 = board.op7 ? board.op7[0] : null
    const enemyPawn8 = board.op8 ? board.op8[0] : null

    const playerKing = color === "white" ? board.pkw[0] : board.pkb[0]

    let attackedByOpponentArr = []
        
    const attackedByOpponent = () => {
        let arr = []
        recordKnightMoves(enemyKnight1, arr)
        recordKnightMoves(enemyKnight2, arr)
        checkArrays(whiteBishopMoves, enemyBishop1, arr, enemySquares, playerSquares)
        checkArrays(blackBishopMoves, enemyBishop2, arr, enemySquares, playerSquares)
        checkArrays(rookMoves, enemyRook1, arr, enemySquares, playerSquares)
        checkArrays(rookMoves, enemyRook2, arr, enemySquares, playerSquares)
        if (justEnemy.oqw) {
            checkArrays(whiteBishopMoves, enemyQueen, arr, enemySquares, playerSquares)
            checkArrays(blackBishopMoves, enemyQueen, arr, enemySquares, playerSquares)
            checkArrays(rookMoves, enemyQueen, arr, enemySquares, playerSquares)
        } else {
            checkArrays(whiteBishopMoves, enemyQueen, arr, enemySquares, playerSquares)
            checkArrays(blackBishopMoves, enemyQueen, arr, enemySquares, playerSquares)
            checkArrays(rookMoves, enemyQueen, arr, enemySquares, playerSquares)
        }
        if (justEnemy.okw) {
            recordOpponentKingMoves(enemyKing, arr)
        } else {
            recordOpponentKingMoves(enemyKing, arr)
        }
        recordOpponentPawnMoves(enemyPawn1, arr)
        recordOpponentPawnMoves(enemyPawn2, arr)
        recordOpponentPawnMoves(enemyPawn3, arr)
        recordOpponentPawnMoves(enemyPawn4, arr)
        recordOpponentPawnMoves(enemyPawn5, arr)
        recordOpponentPawnMoves(enemyPawn6, arr)
        recordOpponentPawnMoves(enemyPawn7, arr)
        recordOpponentPawnMoves(enemyPawn8, arr)

        attackedByOpponentArr = arr
    }

    const recordBoard = () => {
        const filteredPlayer = boardEntries.filter(([key, value]) => /^p/.test(key))
        const justPlayer = Object.fromEntries(filteredPlayer)

        // const filteredEmpty = boardEntries.filter(([key, value]) => /empty/.test(key))
        const filteredOccupied = boardEntries.filter(([key, value]) => !/empty/.test(key))
        // const justEmpty = Object.fromEntries(filteredEmpty)
        const justOccupied = Object.fromEntries(filteredOccupied)

        store.dispatch({
            type: "enemySquares",
            payload: Object.values(justEnemy).map(a => a = a[0])
        })

        store.dispatch({
            type: "playerSquares",
            payload: Object.values(justPlayer).map(a => a = a[0])
        })

        store.dispatch({
            type: "occupiedSquares",
            payload: Object.values(justOccupied).map(a => a = a[0])
        })

        // setEnemySquares(Object.values(justEnemy).map(a => a = a[0]))
        // setPlayerSquares(Object.values(justPlayer).map(a => a = a[0]))
        // setEmptySquares(Object.values(justEmpty).map(a => a = a[0]))
        // setOccupiedSquares(Object.values(justOccupied).map(a => a = a[0]))

        attackedByOpponent()
    }

    useEffect(() => {
        stockfish.postMessage('uci')
        stockfish.postMessage('isready')
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
                    {moveSquares.includes(i + 1) && !enemySquares.includes(i + 1) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 1) && enemySquares.includes(i + 1) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 1 || lastMadeMove[1] === i + 1 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr2.map((a, i) => <div key={i + 9} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 9 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 9) && !enemySquares.includes(i + 9) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 9) && enemySquares.includes(i + 9) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 9 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr3.map((a, i) => <div key={i + 17} className={`${i % 2 === 0 ? "white" : "black"} ${i + 17 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 17) && !enemySquares.includes(i + 17) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 17) && enemySquares.includes(i + 17) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 17 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr4.map((a, i) => <div key={i + 25} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 25 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 25) && !enemySquares.includes(i + 25) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 25) && enemySquares.includes(i + 25) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 25 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr5.map((a, i) => <div key={i + 33} className={`${i % 2 === 0 ? "white" : "black"} ${i + 33 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 33) && !enemySquares.includes(i + 33) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 33) && enemySquares.includes(i + 33) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 33 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr6.map((a, i) => <div key={i + 41} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 41 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 41) && !enemySquares.includes(i + 41) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 41) && enemySquares.includes(i + 41) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 41 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr7.map((a, i) => <div key={i + 49} className={`${i % 2 === 0 ? "white" : "black"} ${i + 49 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 49) && !enemySquares.includes(i + 49) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 49) && enemySquares.includes(i + 49) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 49 ? <div className="lastMadeMove"></div> : null}
                </div>)}

                {arr8.map((a, i) => <div key={i + 57} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 57 === pieceSquare ? "highlight" : null}`} >
                    {moveSquares.includes(i + 57) && !enemySquares.includes(i + 57) ? <div className="activeSquare"></div> : null}
                    {moveSquares.includes(i + 57) && enemySquares.includes(i + 57) ? <div className="enemySquare"><div></div></div> : null}
                    {lastMadeMove[0] === i + 57 || lastMadeMove[1] === i + 57 ? <div className="lastMadeMove"></div> : null}
                </div>)}
            </div>
        )
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
                    return renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn", "pp6")
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

    function checkArrays(arrayChecked, i, arr, ownArr, oppArr) {
        for (const subArr of arrayChecked) {
            if (subArr.includes(i)) {
                for (let j = i + 1; j <= Math.max(...subArr); j++) {
                    if (subArr.includes(j)) {
                        if (ownArr.includes(j)) {
                            break
                        } else if (oppArr.includes(j)) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                    }
                }
                for (let j = i - 1; j >= Math.min(...subArr); j--) {
                    if (subArr.includes(j)) {
                        if (ownArr.includes(j)) {
                            break
                        } else if (oppArr.includes(j)) {
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

    function recordKnightMoves(i, arrMoves) {    
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
            if (playerSquares.includes(number)) {
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

        if (enemySquares.includes(i - 9) && !knightLimits[0].includes(i)) {
            arr.push(i - 9)
        }

        if (enemySquares.includes(i - 7) && !knightLimits[3].includes(i)) {
            arr.push(i - 7)
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    function recordOpponentKingMoves(i, arrMoves) {
        let arr = []
                
        if (knightLimits[0].includes(i)) {
            arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
        } else if (knightLimits[3].includes(i)) {
            arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
        } else {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

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
        if (!moveSquares.includes(i) || (playerSquares.includes(i) && activeStatePiece === piece)){
            setMoveSquares([])
            setActiveStatePiece("")
            setPieceSquare(null)
        }

        if (playerSquares.includes(i) && activeStatePiece !== piece) {
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
                recordKnightMoves(i, arr)
                setMoveSquares(arr)
            }

            if (/^pp/.test(piece)) {
                let arr = []
                recordPawnMoves(i, piece, arr)
                setMoveSquares(arr)
            }

            if (/^pr/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, playerSquares, enemySquares)
                setMoveSquares(arr)
            }

            if (piece === "pb1") {
                let arr = []
                checkArrays(blackBishopMoves, i, arr, playerSquares, enemySquares)
                setMoveSquares(arr)
            }

            if (piece === "pb2") {
                let arr = []
                checkArrays(whiteBishopMoves, i, arr, playerSquares, enemySquares)
                setMoveSquares(arr)
            }

            if (/^pqw/.test(piece) || /^pqb/.test(piece)) {
                let arr = []
                checkArrays(rookMoves, i, arr, playerSquares, enemySquares)
                checkArrays(blackBishopMoves, i, arr, playerSquares, enemySquares)
                checkArrays(whiteBishopMoves, i, arr, playerSquares, enemySquares)
                setMoveSquares(arr)
            }

            if (piece === "pkw" || piece === "pkb") {
                let arr = []
                
                if (castlingPlayerMoved[piece] && castlingPlayerMoved.pr2 && castlingPlayerMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2]
                } else if (castlingPlayerMoved[piece] && castlingPlayerMoved.pr2) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2]
                } else if (castlingPlayerMoved[piece] && castlingPlayerMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2]
                } else if (knightLimits[0].includes(i)) {
                    arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
                } else if (knightLimits[3].includes(i)) {
                    arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
                } else {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
                }

                for (const number of arr) {
                    if (occupiedSquares.includes(number)) {
                        arr = arr.filter(x => x !== number)
                        if (!arr.includes(60) && i === 61) {
                            arr = arr.filter(x => x !== 59)
                        }
                        if (!arr.includes(62) && i === 61) {
                            arr = arr.filter(x => x !== 63)
                        }
                        arr = arr.filter(a => !attackedByOpponentArr.includes(a))
                        setMoveSquares(arr)
                    } else {
                        arr = arr.filter(a => !attackedByOpponentArr.includes(a))
                        setMoveSquares(arr)
                    }
                }
            }
        }

        newSquareIDK = i
        playerNewSquareForEngine = boardEntries.filter(([key, value]) => value[0] === newSquareIDK).flat()[1][1]


        if (activePiece === "ph1" && moveSquares.includes(i)) {
            attackedByPlayerArr[7] = []
            recordKnightMoves(i, attackedByPlayerArr[7])
            moveKnight(i, "ph1")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "ph2" && moveSquares.includes(i)) {
            attackedByPlayerArr[8] = []
            recordKnightMoves(i, attackedByPlayerArr[8])
            moveKnight(i, "ph2")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        }

        if (activePiece === "pp1" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp1", attackedByPlayerArr[9])
            movePawn(i, "pp1")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp2" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp2", attackedByPlayerArr[9])
            movePawn(i, "pp2")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp3" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp3", attackedByPlayerArr[9])
            movePawn(i, "pp3")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp4" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp4", attackedByPlayerArr[9])
            movePawn(i, "pp4")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp5" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp5", attackedByPlayerArr[9])
            movePawn(i, "pp5")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp6" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp6", attackedByPlayerArr[9])
            movePawn(i, "pp6")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp7" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp7", attackedByPlayerArr[9])
            movePawn(i, "pp7")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pp8" && moveSquares.includes(i)) {
            attackedByPlayerArr[9] = []
            recordPawnMoves(i, "pp8", attackedByPlayerArr[9])
            movePawn(i, "pp8")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        }

        if (activePiece === "pb1" && moveSquares.includes(i)) {
            attackedByPlayerArr[5] = []
            checkArrays(blackBishopMoves, i, attackedByPlayerArr[5], playerSquares, enemySquares)
            moveBishop(i, "pb1")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        } 
        
        if (activePiece === "pb2" && moveSquares.includes(i)) {
            attackedByPlayerArr[6] = []
            checkArrays(whiteBishopMoves, i, attackedByPlayerArr[6], playerSquares, enemySquares)
            moveBishop(i, "pb2")
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        }

        if (activePiece === "pr1" && moveSquares.includes(i)) {
            attackedByPlayerArr[3] = []
            checkArrays(rookMoves, i, attackedByPlayerArr[3], playerSquares, enemySquares)
            moveRook(i, activePiece)
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        }
        
        if (activePiece === "pr2" && moveSquares.includes(i)) {
            attackedByPlayerArr[4] = []
            checkArrays(rookMoves, i, attackedByPlayerArr[4], playerSquares, enemySquares)
            moveRook(i, activePiece)
            if (color === "white") {
                setToMove("b")
            } else {
                setToMove("w")
            }
            engineTurn()
        }

        if (/^pqw/.test(activePiece) && moveSquares.includes(i)) {
            attackedByPlayerArr[0] = []
            attackedByPlayerArr[1] = []
            attackedByPlayerArr[2] = []
            checkArrays(rookMoves, i, attackedByPlayerArr[0], playerSquares, enemySquares)
            checkArrays(blackBishopMoves, i, attackedByPlayerArr[1], playerSquares, enemySquares)
            checkArrays(whiteBishopMoves, i, attackedByPlayerArr[2], playerSquares, enemySquares)
            moveQueen(i, activePiece)
            setToMove("b")
            engineTurn()
        } 
        
        if (/^pqb/.test(activePiece) && moveSquares.includes(i)) {
            attackedByPlayerArr[0] = []
            attackedByPlayerArr[1] = []
            attackedByPlayerArr[2] = []
            checkArrays(rookMoves, i, attackedByPlayerArr[0], playerSquares, enemySquares)
            checkArrays(blackBishopMoves, i, attackedByPlayerArr[1], playerSquares, enemySquares)
            checkArrays(whiteBishopMoves, i, attackedByPlayerArr[2], playerSquares, enemySquares)
            moveQueen(i, activePiece)
            setToMove("w")
            engineTurn()
        }

        if (activePiece === "pkw" && moveSquares.includes(i) && !attackedByOpponentArr.includes(i)) {
            moveKing(i, "pkw")
            setToMove("b")
            engineTurn()
        } 
        
        if (activePiece === "pkb" && moveSquares.includes(i) && !attackedByOpponentArr.includes(i)) {
            moveKing(i, "pkb")
            setToMove("w")
            engineTurn()
        }
    }

    const animatePiece = (i, string, num1, num2) => {        
        if (/^pp/.test(string)) {
            store.dispatch({
                type: "pawnMoved",
                payload: string
            })
        }

        if (/^pr/.test(string) || string === "pkw" || string === "pkb") {
            store.dispatch({
                type: "castlingPlayerMoved",
                payload: string
            })
        }

        setMoveVar([num1, num2])

        store.dispatch({
            type: "newSquare",
            payload: i
        })

        if (/^o/.test(string)) {
            if (store.getState().playerSquares.includes(i)) {
                if (i === store.getState().checkingPiece[1]) {
                    captureSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }
                
                if (opponentChecks.current.includes(playerKing)) {
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
                
                if (!opponentChecks.current.includes(playerKing)) {
                    captureSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 

                captureSound.play()

                store.dispatch({
                    type: string,
                    payload: "takes"
                })
            } else {
                if (attackedByPlayerArr.flat().includes(i)) {
                    moveSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 
                
                if (opponentChecks.current.includes(playerKing)) {
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
                
                if (!opponentChecks.current.includes(playerKing)) {
                    moveSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 
                
                moveSound.play()
                
                store.dispatch({
                    type: string,
                })
            }
        }

        if (/^p/.test(string)) {
            if (enemySquares.includes(i)) {
                if (i === store.getState().checkingPiece[1]) {
                    captureSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }
                
                if (attackedByPlayerArr.flat().includes(enemyKing)) {
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
                
                if (!attackedByPlayerArr.flat().includes(enemyKing)) {
                    captureSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 

                captureSound.play()
                
                store.dispatch({
                    type: string,
                    payload: "takes"
                })
            } else {
                if (opponentChecks.current.includes(i)) {
                    moveSound.play()
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                    opponentChecks.current = []
                } 
                
                if (attackedByPlayerArr.flat().includes(enemyKing)) {
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
                
                if (!attackedByPlayerArr.flat().includes(enemyKing)) {
                    moveSound.play()
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 
                
                moveSound.play()
                
                store.dispatch({
                    type: string,
                })
            }
        }

        if (color === "black" && toMove === "w") {
            store.dispatch({
                type: "moveCounter"
            })
        }

        encode()

        // recordBoard()

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
                animatePiece(i, string, 0, 160)
                break;
            case -16: 
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
        if ((knightLimits[0].includes(pieceSquare) || knightLimits[3].includes(pieceSquare)) && (knightLimits[0].includes(i) || knightLimits[3].includes(i))) {
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

    const animateCastling = (coor1, coor2, newSqKing, newSqRook, oldSq, piece) => {
        castlingSound.play()
        setMoveVar([coor1, coor2])
        store.dispatch({
            type: "newSquare",
            payload: newSqKing
        })
        store.dispatch({
            type: "pkw",
        })
        store.dispatch({
            type: "castlingPlayerMoved",
            payload: "pkw"
        })
        store.dispatch({
            type: "oldSquare",
            payload: oldSq
        })
        store.dispatch({
            type: "newSquare",
            payload: newSqRook
        })
        store.dispatch({
            type: piece,
        })
        encode()
        setLastMadeMove([newSqKing, oldSq])
        setMoveSquares([])
        setPieceSquare(null)
    }

    const moveKing = (i, string) => {
        if (/^pk/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case -2:
                    animateCastling(-160, 0, 63, 64, 62, "pr2")
                    break;
                case 2:
                    animateCastling(160, 0, 59, 57, 60, "pr1")
                    break;
                default:
                    break;
            }
        }
        if (/^ok/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case -2:
                    animateCastling(-160, 0, 7, 8, 6, "or2")
                    break;
                case 2:
                    animateCastling(160, 0, 3, 1, 4, "or1")
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