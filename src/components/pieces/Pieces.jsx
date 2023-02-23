/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
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
import gameEndSoundFile from "../../sounds/gameEnd.ogg"

import store from "../redux/store"

import { useSelector } from "react-redux"
import { useState, useEffect, useRef, useMemo } from "react"

import "./pieces.sass"

const Pieces = () => {
    const [pawnPromotes, setPawnPromotes] = useState("")

    const board = useSelector(state => state.board)
    const color = useSelector(state => state.color)
    const activePiece = useSelector(state => state.activePiece)
    const numbers = useSelector(state => state.numbers)
    const pawnsFirstMove = useSelector(state => state.pawnsFirstMove)
    const castlingPlayerMoved = useSelector(state => state.castlingPlayerMoved)
    const castlingEnemyMoved = useSelector(state => state.castlingEnemyMoved)
    const moveCounter = useSelector(state => state.moveCounter)
    const enemyKingAttacked = useSelector(state => state.enemyKingAttacked)
    const playerKingAttacked = useSelector(state => state.playerKingAttacked)
    const halfMoveCounter = useSelector(state => state.halfMoveCounter)
    const sandbox = useSelector(state => state.sandbox)
    const moves = useSelector(state => state.moves)
    const currentMove = useSelector(state => state.currentMove)
    const toMove = useSelector(state => state.toMove)
    const sounds = useSelector(state => state.sounds)
    const moveSquares = useSelector(state => state.moveSquares)
    const pieceSquare = useSelector(state => state.pieceSquare)
    const moveVar = useSelector(state => state.moveVar)

    const animations = useSelector(state => state.animations)

    let boardEntries = Object.entries(board)

    let filteredEnemyRender = boardEntries.filter(([key, value]) => /^o/.test(key))
    let filteredEnemyLive = Object.entries(store.getState().board).filter(([key, value]) => /^o/.test(key))
    let justEnemyRender = Object.fromEntries(filteredEnemyRender)
    let justEnemyLive = Object.fromEntries(filteredEnemyLive)
    
    let filteredPlayerRender = boardEntries.filter(([key, value]) => /^p/.test(key))
    let filteredPlayerLive = Object.entries(store.getState().board).filter(([key, value]) => /^p/.test(key))
    let justPlayerRender = Object.fromEntries(filteredPlayerRender)
    let justPlayerLive = Object.fromEntries(filteredPlayerLive)

    let filteredOccupiedRender = boardEntries.filter(([key, value]) => !/empty/.test(key))
    let filteredOccupiedLive = Object.entries(store.getState().board).filter(([key, value]) => !/empty/.test(key))
    let justOccupiedRender = Object.fromEntries(filteredOccupiedRender)
    let justOccupiedLive = Object.fromEntries(filteredOccupiedLive)

    let enemySquaresRender = Object.values(justEnemyRender).map(a => a = a[0])
    let playerSquaresRender =  Object.values(justPlayerRender).map(a => a = a[0])
    let occupiedSquaresRender =  Object.values(justOccupiedRender).map(a => a = a[0])

    let enemySquaresLive = Object.values(justEnemyLive).map(a => a = a[0])
    let playerSquaresLive =  Object.values(justPlayerLive).map(a => a = a[0])
    let occupiedSquaresLive = Object.values(justOccupiedLive).map(a => a = a[0])

    const recordBoard = () => {
        filteredEnemyRender = boardEntries.filter(([key, value]) => /^o/.test(key))
        filteredEnemyLive = Object.entries(store.getState().board).filter(([key, value]) => /^o/.test(key))
        justEnemyRender = Object.fromEntries(filteredEnemyRender)
        justEnemyLive = Object.fromEntries(filteredEnemyLive)

        filteredPlayerRender = boardEntries.filter(([key, value]) => /^p/.test(key))
        filteredPlayerLive = Object.entries(store.getState().board).filter(([key, value]) => /^p/.test(key))        
        justPlayerRender = Object.fromEntries(filteredPlayerRender)
        justPlayerLive = Object.fromEntries(filteredPlayerLive)

        filteredOccupiedRender = boardEntries.filter(([key, value]) => !/empty/.test(key))
        filteredOccupiedLive = Object.entries(store.getState().board).filter(([key, value]) => !/empty/.test(key))
        justOccupiedRender = Object.fromEntries(filteredOccupiedRender)
        justOccupiedLive = Object.fromEntries(filteredOccupiedLive)

        enemySquaresRender = Object.values(justEnemyRender).map(a => a = a[0])
        playerSquaresRender =  Object.values(justPlayerRender).map(a => a = a[0])
        occupiedSquaresRender = Object.values(justOccupiedRender).map(a => a = a[0])

        enemySquaresLive = Object.values(justEnemyLive).map(a => a = a[0])
        playerSquaresLive =  Object.values(justPlayerLive).map(a => a = a[0])
        occupiedSquaresLive = Object.values(justOccupiedLive).map(a => a = a[0])


        encode()

        playerKingSpiderSense()
        enemyKingSpiderSense()

        protectedByPlayer()
        protectedByOpponent()

        playerKing8Star(playerKing)
        enemyKing8Star(enemyKing)

        playerKing8StarXray(playerKing)
        enemyKing8StarXray(enemyKing)
       

        if (playerKingAttacked) {
            for (let i = 0; i < 4; i++) {
                if (enemyQueens.some(a => playerKing8StarArr.current[i].includes(a))
                || enemyRooks.some(a => playerKing8StarArr.current[i].includes(a))) {
                    checkingPiece.current = playerKing8StarArr.current[i].filter(a => enemySquaresRender.includes(a))[0]
                }
            }
            for (let i = 4; i < 8; i++) {
                if (enemyQueens.some(a => playerKing8StarArr.current[i].includes(a))
                || enemyBishops.some(a => playerKing8StarArr.current[i].includes(a))) {
                    checkingPiece.current = playerKing8StarArr.current[i].filter(a => enemySquaresRender.includes(a))[0]
                }
            }
        }

        if (enemyKingAttacked) {
            for (let i = 0; i < 4; i++) {
                if (playerQueens.some(a => enemyKing8StarArr.current[i].includes(a))
                || playerRooks.some(a => enemyKing8StarArr.current[i].includes(a))) {
                    checkingPiece.current = enemyKing8StarArr.current[i].filter(a => playerSquaresRender.includes(a))[0]
                }
            }
            for (let i = 4; i < 8; i++) {
                if (playerQueens.some(a => enemyKing8StarArr.current[i].includes(a))
                || playerBishops.some(a => enemyKing8StarArr.current[i].includes(a))) {
                    checkingPiece.current =enemyKing8StarArr.current[i].filter(a => playerSquaresRender.includes(a))[0]
                }
            }
        }

        playerHorseSafety()
        enemyHorseSafety()
    }

    useEffect(() => {
        recordBoard()
        store.dispatch({
            type: "recordMoves",
            payload: JSON.stringify(board)
        })
        stockfish.postMessage('uci')
        stockfish.postMessage('isready')
        stockfish.postMessage('ucinewgame')
        
        // stockfish.postMessage('setoption name Skill Level value -10/20')        
    }, [])

    useEffect(() => {
        recordBoard()
        checkGameEnd()
    }, [board])

    useEffect(() => {
        if (notInitialRender.current) {
            const movePiece = setTimeout(() => {
                store.dispatch({
                    type: "activePiece",
                    payload: ""
                })
                store.dispatch({
                    type: "setMoveVar",
                    payload: [0, 0]
                })
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
            }, 150)

            return () => {
                clearTimeout(movePiece)
                clearTimeout(resetPiece)
            }
        } else {
            notInitialRender.current = true
        }
    }, [JSON.stringify(board)])

    useEffect(() => {
        if (((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) && !sandbox) {
            engineTurn()
        }
    }, [toMove])

    const enPassantSquare = useRef([0, ""])

    const pieceSquareForEngine = useRef(1)
    const pieceNewSquare = useRef(1)

    const notInitialRender = useRef(false)

    const checkingPiece = useRef(null)

    const wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))

    const stockfish = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js')
    
    stockfish.addEventListener('message', function(e) {
        
        if (/^bestmove/.test(e.data)) {
            // console.log(e.data.split(" "))
            const engineOldSquare = e.data.slice(9, 11)
            const engineNewSquare = e.data.slice(11, 13)

            const enginePieceToMove = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[0]
            const enginePieceSquare = boardEntries.filter(([key, value]) => value[1] === engineOldSquare).flat()[1][0]
            const engineWhereToMove = boardEntries.filter(([key, value]) => value[1] === engineNewSquare).flat()[1][0]

            store.dispatch({
                type: "activePiece",
                payload: enginePieceToMove
            })

            store.dispatch({
                type: "oldSquare",
                payload: enginePieceSquare
            })
            
            // console.log(engineOldSquare)
            // console.log(engineNewSquare)
            // console.log(enginePieceToMove)
            // console.log(enginePieceSquare)
            // console.log(engineWhereToMove)

            pieceSquareForEngine.current = enginePieceSquare      

            if (/^op/.test(enginePieceToMove)) {
                
                
                recordOpponentPawnAttacks(engineWhereToMove, checkedByOpponentArr.current)

                switch (enginePieceToMove) {
                    case "op1":
                        enemyPawn1 = engineWhereToMove
                        break;
                    case "op2":
                        enemyPawn2 = engineWhereToMove
                        break;
                    case "op3":
                        enemyPawn3 = engineWhereToMove
                        break;
                    case "op4":
                        enemyPawn4 = engineWhereToMove
                        break;
                    case "op5":
                        enemyPawn5 = engineWhereToMove
                        break;
                    case "op6":
                        enemyPawn6 = engineWhereToMove
                        break;
                    case "op7":
                        enemyPawn7 = engineWhereToMove
                        break;
                    case "op8":
                        enemyPawn8 = engineWhereToMove
                        break;
                    default:
                        break;
                }

                updateStateBoard(engineWhereToMove, enginePieceToMove)

                enemyPawns = [enemyPawn1, enemyPawn2, enemyPawn3, enemyPawn4, enemyPawn5, enemyPawn6, enemyPawn7, enemyPawn8]

                movePawn(engineWhereToMove, enginePieceToMove)

                if (e.data.split(" ")[1].length === 5) {
                    if (e.data.split(" ")[1].slice(4) === "q") {
                        promotePawn(enginePieceToMove, "oq", engineWhereToMove)
                    }
                    if (e.data.split(" ")[1].slice(4) === "r") {
                        promotePawn(enginePieceToMove, "or", engineWhereToMove)
                    }
                    if (e.data.split(" ")[1].slice(4) === "b") {
                        promotePawn(enginePieceToMove, "ob", engineWhereToMove)
                    }
                    if (e.data.split(" ")[1].slice(4) === "k") {
                        promotePawn(enginePieceToMove, "oh", engineWhereToMove)
                    }
                }
            } 
            
            if (/^ob/.test(enginePieceToMove)) {
                
                checkArrays(whiteBishopMoves, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
                checkArrays(blackBishopMoves, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
                
                switch (enginePieceToMove) {
                    case "ob1":
                        enemyBishop1 = engineWhereToMove
                        break;
                    case "ob2":
                        enemyBishop2 = engineWhereToMove
                        break;
                    case "ob3":
                        enemyBishop3 = engineWhereToMove
                        break;
                    case "ob4":
                        enemyBishop4 = engineWhereToMove
                        break;
                    case "ob5":
                        enemyBishop5 = engineWhereToMove
                        break;
                    case "ob6":
                        enemyBishop6 = engineWhereToMove
                        break;
                    case "ob7":
                        enemyBishop7 = engineWhereToMove
                        break;
                    case "ob8":
                        enemyBishop8 = engineWhereToMove
                        break;
                    case "ob9":
                        enemyBishop9 = engineWhereToMove
                        break;
                    case "ob01":
                        enemyBishop01 = engineWhereToMove
                        break;
                    default:
                        break;
                }

                updateStateBoard(engineWhereToMove, enginePieceToMove)

                enemyBishops = [enemyBishop1, enemyBishop2, enemyBishop3, enemyBishop4, enemyBishop5, enemyBishop6, enemyBishop7, enemyBishop8, enemyBishop9, enemyBishop01]

                moveBishop(engineWhereToMove, enginePieceToMove)

            } 
            
            if (/^oh/.test(enginePieceToMove)) {
                
                
                recordKnightMoves(engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive)

                switch (enginePieceToMove) {
                    case "oh1":
                        enemyKnight1 = engineWhereToMove
                        break;
                    case "oh2":
                        enemyKnight2 = engineWhereToMove
                        break;
                    case "oh3":
                        enemyKnight3 = engineWhereToMove
                        break;
                    case "oh4":
                        enemyKnight4 = engineWhereToMove
                        break;
                    case "oh5":
                        enemyKnight5 = engineWhereToMove
                        break;
                    case "oh6":
                        enemyKnight6 = engineWhereToMove
                        break;
                    case "oh7":
                        enemyKnight7 = engineWhereToMove
                        break;
                    case "oh8":
                        enemyKnight8 = engineWhereToMove
                        break;
                    case "oh9":
                        enemyKnight9 = engineWhereToMove
                        break;
                    case "oh01":
                        enemyKnight01 = engineWhereToMove
                        break;
                    default:
                        break;
                }

                updateStateBoard(engineWhereToMove, enginePieceToMove)

                enemyKnights = [enemyKnight1, enemyKnight2, enemyKnight3, enemyKnight4, enemyKnight5, enemyKnight6, enemyKnight7, enemyKnight8, enemyKnight9, enemyKnight01]

                moveKnight(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^or/.test(enginePieceToMove)) {
                
                checkArrays(rookMoves.current, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)

                switch (enginePieceToMove) {
                    case "or1":
                        enemyRook1 = engineWhereToMove
                        break;
                    case "or2":
                        enemyRook2 = engineWhereToMove
                        break;
                    case "or3":
                        enemyRook3 = engineWhereToMove
                        break;
                    case "or4":
                        enemyRook4 = engineWhereToMove
                        break;
                    case "or5":
                        enemyRook5 = engineWhereToMove
                        break;
                    case "or6":
                        enemyRook6 = engineWhereToMove
                        break;
                    case "or7":
                        enemyRook7 = engineWhereToMove
                        break;
                    case "or8":
                        enemyRook8 = engineWhereToMove
                        break;
                    case "or9":
                        enemyRook9 = engineWhereToMove
                        break;
                    case "or01":
                        enemyRook01 = engineWhereToMove
                        break;
                    default:
                        break;
                }

                updateStateBoard(engineWhereToMove, enginePieceToMove)
                

                enemyRooks = [enemyRook1, enemyRook2, enemyRook3, enemyRook4, enemyRook5, enemyRook6, enemyRook7, enemyRook8, enemyRook9, enemyRook01]

                moveRook(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^oq/.test(enginePieceToMove)) {
               
                
                checkArrays(whiteBishopMoves, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
                checkArrays(blackBishopMoves, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
                checkArrays(rookMoves.current, engineWhereToMove, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)

                switch (enginePieceToMove) {
                    case "oqw1": case "oqb1":
                        enemyQueen1 = engineWhereToMove
                        break;
                    case "oqw2": case "oqb2":
                        enemyQueen2 = engineWhereToMove
                        break;
                    case "oqw3": case "oqb3":
                        enemyQueen3 = engineWhereToMove
                        break;
                    case "oqw4": case "oqb4":
                        enemyQueen4 = engineWhereToMove
                        break;
                    case "oqw5": case "oqb5":
                        enemyQueen5 = engineWhereToMove
                        break;
                    case "oqw6": case "oqb6":
                        enemyQueen6 = engineWhereToMove
                        break;
                    case "oqw7": case "oqb7":
                        enemyQueen7 = engineWhereToMove
                        break;
                    case "oqw8": case "oqb8":
                        enemyQueen8 = engineWhereToMove
                        break;
                    case "oqw9": case "oqb9":
                        enemyQueen9 = engineWhereToMove
                        break;
                    default:
                        break;
                }


                updateStateBoard(engineWhereToMove, enginePieceToMove)
                enemyQueens = [enemyQueen1, enemyQueen2, enemyQueen3, enemyQueen4, enemyQueen5, enemyQueen6, enemyQueen7, enemyQueen8, enemyQueen9]

                moveQueen(engineWhereToMove, enginePieceToMove)
            } 
            
            if (/^ok/.test(enginePieceToMove)) {
                updateStateBoard(engineWhereToMove, enginePieceToMove)
                moveKing(engineWhereToMove, enginePieceToMove)
                
                enemyKingSpiderSense()
            }

            if (color === "white") {
                store.dispatch({
                    type: "moveCounter"
                })
            }
        }
    });

    let playerPiece = useRef(null)
    let playerNewSquareForEngine = useRef(null)

    const engineTurn = () => {
        

        let string = `position fen ${stringToSend} moves ${playerPiece.current}${playerNewSquareForEngine.current}`

        console.log(string)
        stockfish.postMessage(string)
        // setTimeout(() => {
            stockfish.postMessage('go movetime 1000')
        // }, 1000);
    }

    let stringToSend

    const encode = () => {
        const fenEncode = (arr) => {
            switch (arr[0]) {
                case "or1": case "or2": case "or3": case "or4": case "or5": case "or6": case "or7": case "or8": case "or9": 
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

        if (enPassantSquare.current[0]) {
            fenString += boardEntries.filter(([key, value]) => value[0] === enPassantSquare.current[0]).flat()[1][1]
        } else {
            fenString += "-"
        }
        
        fenString += ` ${halfMoveCounter} `

        fenString += moveCounter
        stringToSend = fenString
        // console.log(fenString)
    }

    const animationSpeed = useRef()

    useMemo(() => {
        if (animations === "fast") {
            animationSpeed.current = .2
        } else if (animations === "average") {
            animationSpeed.current = .5
        } else if (animations === "slow") {
            animationSpeed.current = .7
        }
    }, [animations])

    const moveSound = new Audio(moveSoundFile)
    const captureSound = new Audio(captureSoundFile)
    const castlingSound = new Audio(castlingSoundFile)
    const checkSound = new Audio(checkSoundFile)
    const gameEndSound = new Audio(gameEndSoundFile)

    const knightLimits = useRef([[], [], [], []])

    useMemo(() => {
        for (let i = 1; i < 64; i += 8) {
            knightLimits.current[0].push(i)
            knightLimits.current[1].push(i + 1)
            knightLimits.current[2].push(i + 6)
            knightLimits.current[3].push(i + 7)
        }
    }, [])

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

    const rookMoves = useRef([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []])

    useMemo(() => {
        for (let i = 1; i < 9; i++) {
            rookMoves.current[0].push(i)
            rookMoves.current[1].push(i + 8)
            rookMoves.current[2].push(i + 16)
            rookMoves.current[3].push(i + 24)
            rookMoves.current[4].push(i + 32)
            rookMoves.current[5].push(i + 40)
            rookMoves.current[6].push(i + 48)
            rookMoves.current[7].push(i + 56)
        }
    }, [])

    useMemo(() => {
        for (let i = 1; i < 65; i += 8) {
            rookMoves.current[8].push(i)
            rookMoves.current[9].push(i + 1)
            rookMoves.current[10].push(i + 2)
            rookMoves.current[11].push(i + 3)
            rookMoves.current[12].push(i + 4)
            rookMoves.current[13].push(i + 5)
            rookMoves.current[14].push(i + 6)
            rookMoves.current[15].push(i + 7)
        }
    }, [])


    let enemyBishop1 = board.ob1 ? board.ob1[0] : null
    let enemyBishop2 = board.ob2 ? board.ob2[0] : null
    let enemyBishop3 = board.ob3 ? board.ob3[0] : null
    let enemyBishop4 = board.ob4 ? board.ob4[0] : null
    let enemyBishop5 = board.ob5 ? board.ob5[0] : null
    let enemyBishop6 = board.ob6 ? board.ob6[0] : null
    let enemyBishop7 = board.ob7 ? board.ob7[0] : null
    let enemyBishop8 = board.ob8 ? board.ob8[0] : null
    let enemyBishop9 = board.ob9 ? board.ob9[0] : null
    let enemyBishop01 = board.ob01 ? board.ob01[0] : null

    let enemyKnight1 = board.oh1 ? board.oh1[0] : null
    let enemyKnight2 = board.oh2 ? board.oh2[0] : null
    let enemyKnight3 = board.oh3 ? board.oh3[0] : null
    let enemyKnight4 = board.oh4 ? board.oh4[0] : null
    let enemyKnight5 = board.oh5 ? board.oh5[0] : null
    let enemyKnight6 = board.oh6 ? board.oh6[0] : null
    let enemyKnight7 = board.oh7 ? board.oh7[0] : null
    let enemyKnight8 = board.oh8 ? board.oh8[0] : null
    let enemyKnight9 = board.oh9 ? board.oh9[0] : null
    let enemyKnight01 = board.oh01 ? board.oh01[0] : null

    let enemyRook1 = board.or1 ? board.or1[0] : null
    let enemyRook2 = board.or2 ? board.or2[0] : null
    let enemyRook3 = board.or3 ? board.or3[0] : null
    let enemyRook4 = board.or4 ? board.or4[0] : null
    let enemyRook5 = board.or5 ? board.or5[0] : null
    let enemyRook6 = board.or6 ? board.or6[0] : null
    let enemyRook7 = board.or7 ? board.or7[0] : null
    let enemyRook8 = board.or8 ? board.or8[0] : null
    let enemyRook9 = board.or9 ? board.or9[0] : null
    let enemyRook01 = board.or01 ? board.or01[0] : null

    let enemyQueen1
    color === "white" ? (enemyQueen1 = board.oqb1 ? board.oqb1[0] : null) : (enemyQueen1 = board.oqw1 ? board.oqw1[0] : null)
    let enemyQueen2
    color === "white" ? (enemyQueen2 = board.oqb2 ? board.oqb2[0] : null) : (enemyQueen2 = board.oqw2 ? board.oqw2[0] : null)
    let enemyQueen3
    color === "white" ? (enemyQueen3 = board.oqb3 ? board.oqb3[0] : null) : (enemyQueen3 = board.oqw3 ? board.oqw3[0] : null)
    let enemyQueen4
    color === "white" ? (enemyQueen4 = board.oqb4 ? board.oqb4[0] : null) : (enemyQueen4 = board.oqw4 ? board.oqw4[0] : null)
    let enemyQueen5
    color === "white" ? (enemyQueen5 = board.oqb5 ? board.oqb5[0] : null) : (enemyQueen5 = board.oqw5 ? board.oqw5[0] : null)
    let enemyQueen6
    color === "white" ? (enemyQueen6 = board.oqb6 ? board.oqb6[0] : null) : (enemyQueen6 = board.oqw6 ? board.oqw6[0] : null)
    let enemyQueen7
    color === "white" ? (enemyQueen7 = board.oqb7 ? board.oqb7[0] : null) : (enemyQueen7 = board.oqw7 ? board.oqw7[0] : null)
    let enemyQueen8
    color === "white" ? (enemyQueen8 = board.oqb8 ? board.oqb8[0] : null) : (enemyQueen8 = board.oqw8 ? board.oqw8[0] : null)
    let enemyQueen9
    color === "white" ? (enemyQueen9 = board.oqb9 ? board.oqb9[0] : null) : (enemyQueen9 = board.oqw9 ? board.oqw9[0] : null)

    let enemyKing = board.okw ? board.okw[0] : board.okb[0]

    let enemyPawn1 = board.op1 ? board.op1[0] : null
    let enemyPawn2 = board.op2 ? board.op2[0] : null
    let enemyPawn3 = board.op3 ? board.op3[0] : null
    let enemyPawn4 = board.op4 ? board.op4[0] : null
    let enemyPawn5 = board.op5 ? board.op5[0] : null
    let enemyPawn6 = board.op6 ? board.op6[0] : null
    let enemyPawn7 = board.op7 ? board.op7[0] : null
    let enemyPawn8 = board.op8 ? board.op8[0] : null

    let playerBishop1 = board.pb1 ? board.pb1[0] : null
    let playerBishop2 = board.pb2 ? board.pb2[0] : null
    let playerBishop3 = board.pb3 ? board.pb3[0] : null
    let playerBishop4 = board.pb4 ? board.pb4[0] : null
    let playerBishop5 = board.pb5 ? board.pb5[0] : null
    let playerBishop6 = board.pb6 ? board.pb6[0] : null
    let playerBishop7 = board.pb7 ? board.pb7[0] : null
    let playerBishop8 = board.pb8 ? board.pb8[0] : null
    let playerBishop9 = board.pb9 ? board.pb9[0] : null
    let playerBishop01 = board.pb01 ? board.pb01[0] : null

    let playerKnight1 = board.ph1 ? board.ph1[0] : null
    let playerKnight2 = board.ph2 ? board.ph2[0] : null
    let playerKnight3 = board.ph3 ? board.ph3[0] : null
    let playerKnight4 = board.ph4 ? board.ph4[0] : null
    let playerKnight5 = board.ph5 ? board.ph5[0] : null
    let playerKnight6 = board.ph6 ? board.ph6[0] : null
    let playerKnight7 = board.ph7 ? board.ph7[0] : null
    let playerKnight8 = board.ph8 ? board.ph8[0] : null
    let playerKnight9 = board.ph9 ? board.ph9[0] : null
    let playerKnight01 = board.ph01 ? board.ph01[0] : null

    let playerRook1 = board.pr1 ? board.pr1[0] : null
    let playerRook2 = board.pr2 ? board.pr2[0] : null
    let playerRook3 = board.pr3 ? board.pr3[0] : null
    let playerRook4 = board.pr4 ? board.pr4[0] : null
    let playerRook5 = board.pr5 ? board.pr5[0] : null
    let playerRook6 = board.pr6 ? board.pr6[0] : null
    let playerRook7 = board.pr7 ? board.pr7[0] : null
    let playerRook8 = board.pr8 ? board.pr8[0] : null
    let playerRook9 = board.pr9 ? board.pr9[0] : null
    let playerRook01 = board.pr01 ? board.pr01[0] : null

    let playerQueen1
    color === "white" ? (playerQueen1 = board.pqw1 ? board.pqw1[0] : null) : (playerQueen1 = board.pqb1 ? board.pqb1[0] : null)
    let playerQueen2
    color === "white" ? (playerQueen2 = board.pqw2 ? board.pqw2[0] : null) : (playerQueen2 = board.pqb2 ? board.pqb2[0] : null)
    let playerQueen3
    color === "white" ? (playerQueen3 = board.pqw3 ? board.pqw3[0] : null) : (playerQueen3 = board.pqb3 ? board.pqb3[0] : null)
    let playerQueen4
    color === "white" ? (playerQueen4 = board.pqw4 ? board.pqw4[0] : null) : (playerQueen4 = board.pqb4 ? board.pqb4[0] : null)
    let playerQueen5
    color === "white" ? (playerQueen5 = board.pqw5 ? board.pqw5[0] : null) : (playerQueen5 = board.pqb5 ? board.pqb5[0] : null)
    let playerQueen6
    color === "white" ? (playerQueen6 = board.pqw6 ? board.pqw6[0] : null) : (playerQueen6 = board.pqb6 ? board.pqb6[0] : null)
    let playerQueen7
    color === "white" ? (playerQueen7 = board.pqw7 ? board.pqw7[0] : null) : (playerQueen7 = board.pqb7 ? board.pqb7[0] : null)
    let playerQueen8
    color === "white" ? (playerQueen8 = board.pqw8 ? board.pqw8[0] : null) : (playerQueen8 = board.pqb8 ? board.pqb8[0] : null)
    let playerQueen9
    color === "white" ? (playerQueen9 = board.pqw9 ? board.pqw9[0] : null) : (playerQueen9 = board.pqb9 ? board.pqb9[0] : null)

    let playerKing = board.pkw ? board.pkw[0] : board.pkb[0]

    let playerPawn1 = board.pp1 ? board.pp1[0] : null
    let playerPawn2 = board.pp2 ? board.pp2[0] : null
    let playerPawn3 = board.pp3 ? board.pp3[0] : null
    let playerPawn4 = board.pp4 ? board.pp4[0] : null
    let playerPawn5 = board.pp5 ? board.pp5[0] : null
    let playerPawn6 = board.pp6 ? board.pp6[0] : null
    let playerPawn7 = board.pp7 ? board.pp7[0] : null
    let playerPawn8 = board.pp8 ? board.pp8[0] : null

    const checkedByPlayerArr = useRef([])
    const attackedByPlayerArr = useRef([])
    const attackedByOpponentArr = useRef([])
    const checkedByOpponentArr = useRef([])

    const combThroughSubArrayPlus = (index, subArr, arrResult, ownArr, oppArr, exclude) => {
        if (subArr.includes(index)) {
            for (let j = index + 1; j <= Math.max(...subArr); j++) {
                if (subArr.includes(j)) {
                    if (ownArr.includes(j) && exclude) {
                        break
                    } else if (oppArr.includes(j)) {
                        arrResult.push(j)
                        break
                    } else {
                        arrResult.push(j)
                    }
                } 
            }
        }
    }

    const combThroughSubArrayMinus = (i, subArr, arrResult, ownArr, oppArr, exclude) => {
        if (subArr.includes(i)) {
            for (let j = i - 1; j >= Math.min(...subArr); j--) {
                if (subArr.includes(j)) {
                    if (ownArr.includes(j) && exclude) {
                        break
                    } else if (oppArr.includes(j)) {
                        arrResult.push(j)
                        break
                    } else {
                        arrResult.push(j)
                    }
                } 
            }
        }
    }

    const playerHorseSafetyArr = useRef([])

    const playerHorseSafety = () => {
        let arr = []
        
        recordKnightMoves(playerKing, arr, playerSquaresRender)

        playerHorseSafetyArr.current = arr
    }

    const enemyHorseSafetyArr = useRef([])

    const enemyHorseSafety = () => {
        let arr = []

        recordKnightMoves(enemyKing, arr, enemySquaresRender)

        enemyHorseSafetyArr.current = arr
    }

    const playerKing8StarArr = useRef([])

    const playerKing8Star = (index) => {
        let arr = [[], [], [], [], [], [], [], []]

        for (let i = 0; i < 8; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[0], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[1], playerSquaresRender, enemySquaresRender, true)
        }

        for (let i = 8; i < 16; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[2], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[3], playerSquaresRender, enemySquaresRender, true)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[4], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[5], playerSquaresRender, enemySquaresRender, true)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[4], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[5], playerSquaresRender, enemySquaresRender, true)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[6], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[7], playerSquaresRender, enemySquaresRender, true)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[6], playerSquaresRender, enemySquaresRender, true)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[7], playerSquaresRender, enemySquaresRender, true)
        }

        playerKing8StarArr.current = arr
    }

    const enemyKing8StarArr = useRef([])

    const enemyKing8Star = (index) => {
        let arr = [[], [], [], [], [], [], [], []]

        for (let i = 0; i < 8; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[0], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[1], enemySquaresRender, playerSquaresRender)
        }

        for (let i = 8; i < 16; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[2], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[3], enemySquaresRender, playerSquaresRender)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[4], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[5], enemySquaresRender, playerSquaresRender)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[4], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[5], enemySquaresRender, playerSquaresRender)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[6], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[7], enemySquaresRender, playerSquaresRender)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[6], enemySquaresRender, playerSquaresRender)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[7], enemySquaresRender, playerSquaresRender)
        }

        enemyKing8StarArr.current = arr
    }

    const protectedByPlayerArr = useRef([])

    const protectedByPlayer = () => {
        let arr = []

        playerRooks.forEach(a => checkArrays(rookMoves.current, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        playerKnights.forEach(a => recordKnightMoves(a, arr, enemySquaresRender))

        playerBishops.forEach(a => checkArrays(whiteBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        playerBishops.forEach(a => checkArrays(blackBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        playerQueens.forEach(a => checkArrays(whiteBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(blackBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(rookMoves.current, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        playerPawns.forEach(a => recordPlayerPawnAttacks(a, arr))

        protectedByPlayerArr.current = arr.filter(a => occupiedSquaresRender.includes(a))
    }

    const protectedByOpponentArr = useRef([])

    const protectedByOpponent = () => {
        let arr = []

        enemyRooks.forEach(a => checkArrays(rookMoves.current, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        enemyKnights.forEach(a => recordKnightMoves(a, arr, playerSquaresRender))

        enemyBishops.forEach(a => checkArrays(whiteBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        enemyBishops.forEach(a => checkArrays(blackBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        enemyQueens.forEach(a => checkArrays(whiteBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(blackBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(rookMoves.current, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        enemyPawns.forEach(a => recordOpponentPawnAttacks(a, arr))

        protectedByOpponentArr.current = arr.filter(a => occupiedSquaresRender.includes(a))
    }

    let playerKingXrayArr = useRef([])

    const playerKingXray = () => {
        let arr = [[], [], []]

        checkArrays(whiteBishopMoves, playerKing, arr[0], playerSquaresLive, enemySquaresLive, false, false)
        checkArrays(blackBishopMoves, playerKing, arr[1], playerSquaresLive, enemySquaresLive, false, false)
        checkArrays(rookMoves.current, playerKing, arr[2], playerSquaresLive, enemySquaresLive, false, false)

        playerKingXrayArr.current = arr
    }

    let enemyKingXrayArr = useRef([])

    const enemyKingXray = () => {
        let arr = [[], [], []]

        checkArrays(whiteBishopMoves, enemyKing, arr[0], enemySquaresLive, playerSquaresLive, false, false)
        checkArrays(blackBishopMoves, enemyKing, arr[1], enemySquaresLive, playerSquaresLive, false, false)
        checkArrays(rookMoves.current, enemyKing, arr[2], enemySquaresLive, playerSquaresLive, false, false)

        enemyKingXrayArr.current = arr
    }

    const playerKing8StarXrayArr = useRef([[], [], [], [], [], [], [], []])

    const playerKing8StarXray = (index) => {
        let arr = [[], [], [], [], [], [], [], []]

        for (let i = 0; i < 8; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[0], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[1], playerSquaresRender, enemySquaresRender, false)
        }

        for (let i = 8; i < 16; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[2], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[3], playerSquaresRender, enemySquaresRender, false)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[4], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[5], playerSquaresRender, enemySquaresRender, false)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[4], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[5], playerSquaresRender, enemySquaresRender, false)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[6], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[7], playerSquaresRender, enemySquaresRender, false)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[6], playerSquaresRender, enemySquaresRender, false)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[7], playerSquaresRender, enemySquaresRender, false)
        }

        playerKing8StarXrayArr.current = arr
    }

    const enemyKing8StarXrayArr = useRef([[], [], [], [], [], [], [], []])

    const enemyKing8StarXray = (index) => {
        let arr = [[], [], [], [], [], [], [], []]

        for (let i = 0; i < 8; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[0], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[1], enemySquaresRender, playerSquaresRender, false)
        }

        for (let i = 8; i < 16; i++) {
            combThroughSubArrayPlus(index, rookMoves.current[i], arr[2], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, rookMoves.current[i], arr[3], enemySquaresRender, playerSquaresRender, false)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[4], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[5], enemySquaresRender, playerSquaresRender, false)
        }

        for (let i = 0; i < 7; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[4], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[5], enemySquaresRender, playerSquaresRender, false)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, blackBishopMoves[i], arr[6], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, blackBishopMoves[i], arr[7], enemySquaresRender, playerSquaresRender, false)
        }

        for (let i = 7; i < 13; i++) {
            combThroughSubArrayPlus(index, whiteBishopMoves[i], arr[6], enemySquaresRender, playerSquaresRender, false)
            combThroughSubArrayMinus(index, whiteBishopMoves[i], arr[7], enemySquaresRender, playerSquaresRender, false)
        }

        enemyKing8StarXrayArr.current = arr
    }

    let playerKingSpiderSenseArr = useRef([])
    
    const playerKingSpiderSense = () => {
        let arr = [[], []]

        checkArrays(whiteBishopMoves, playerKing, arr[0], playerSquaresLive, enemySquaresLive, true, true)
        checkArrays(blackBishopMoves, playerKing, arr[0], playerSquaresLive, enemySquaresLive, true, true)
        checkArrays(rookMoves.current, playerKing, arr[1], playerSquaresLive, enemySquaresLive, true, true)

        playerKingSpiderSenseArr.current = arr
    }
    
    let enemyKingSpiderSenseArr = useRef([])

    const enemyKingSpiderSense = () => {
        let arr = [[], []]

        checkArrays(whiteBishopMoves, enemyKing, arr[0], enemySquaresLive, playerSquaresLive, true, true)
        checkArrays(blackBishopMoves, enemyKing, arr[0], enemySquaresLive, playerSquaresLive, true, true)
        checkArrays(rookMoves.current, enemyKing, arr[1], enemySquaresLive, playerSquaresLive, true, true)

        enemyKingSpiderSenseArr.current = arr
    }

    let playerRooks = [playerRook1, playerRook2, playerRook3, playerRook4, playerRook5, playerRook6, playerRook7, playerRook8, playerRook9, playerRook01]
    let playerKnights = [playerKnight1, playerKnight2, playerKnight3, playerKnight4, playerKnight5, playerKnight6, playerKnight7, playerKnight8, playerKnight9, playerKnight01]
    let playerBishops = [playerBishop1, playerBishop2, playerBishop3, playerBishop4, playerBishop5, playerBishop6, playerBishop7, playerBishop8, playerBishop9, playerBishop01]
    let playerQueens = [playerQueen1, playerQueen2, playerQueen3, playerQueen4, playerQueen5, playerQueen6, playerQueen7, playerQueen8, playerQueen9]
    let playerPawns = [playerPawn1, playerPawn2, playerPawn3, playerPawn4, playerPawn5, playerPawn6, playerPawn7, playerPawn8]

    let enemyRooks = [enemyRook1, enemyRook2, enemyRook3, enemyRook4, enemyRook5, enemyRook6, enemyRook7, enemyRook8, enemyRook9, enemyRook01]
    let enemyKnights = [enemyKnight1, enemyKnight2, enemyKnight3, enemyKnight4, enemyKnight5, enemyKnight6, enemyKnight7, enemyKnight8, enemyKnight9, enemyKnight01]
    let enemyBishops = [enemyBishop1, enemyBishop2, enemyBishop3, enemyBishop4, enemyBishop5, enemyBishop6, enemyBishop7, enemyBishop8, enemyBishop9, enemyBishop01]
    let enemyQueens = [enemyQueen1, enemyQueen2, enemyQueen3, enemyQueen4, enemyQueen5, enemyQueen6, enemyQueen7, enemyQueen8, enemyQueen9]
    let enemyPawns = [enemyPawn1, enemyPawn2, enemyPawn3, enemyPawn4, enemyPawn5, enemyPawn6, enemyPawn7, enemyPawn8]

    const attackedByOpponent = () => {
        let arr = []

        enemyRooks.forEach(a => checkArrays(rookMoves.current, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        enemyKnights.forEach(a => recordKnightMoves(a, arr, enemySquaresRender))

        enemyBishops.forEach(a => checkArrays(whiteBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        enemyBishops.forEach(a => checkArrays(blackBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        enemyQueens.forEach(a => checkArrays(whiteBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(blackBishopMoves, a, arr, enemySquaresRender, playerSquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(rookMoves.current, a, arr, enemySquaresRender, playerSquaresRender, true, true))

        enemyPawns.forEach(a => recordOpponentPawnAttacks(a, arr))

        attackedByOpponentArr.current = arr
    }

    const attackedByPlayer = () => {
        let arr = []

        playerRooks.forEach(a => checkArrays(rookMoves.current, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        playerKnights.forEach(a => recordKnightMoves(a, arr, playerSquaresRender))

        playerBishops.forEach(a => checkArrays(whiteBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        playerBishops.forEach(a => checkArrays(blackBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        playerQueens.forEach(a => checkArrays(whiteBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(blackBishopMoves, a, arr, playerSquaresRender, enemySquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(rookMoves.current, a, arr, playerSquaresRender, enemySquaresRender, true, true))

        playerPawns.forEach(a => recordPlayerPawnAttacks(a, arr))

        attackedByPlayerArr.current = arr
    }

    const promotePawn = (pawn, pieceToPromoteTo, i) => {
        if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "white") {
            pieceToPromoteTo = pieceToPromoteTo + "w"
        }

        if (/^pp/.test(pawn) && /^pq/.test(pieceToPromoteTo) && color === "black") {
            pieceToPromoteTo = pieceToPromoteTo + "b"
        }

        if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "white") {
            pieceToPromoteTo = pieceToPromoteTo + "b"
        }

        if (/^op/.test(pawn) && /^oq/.test(pieceToPromoteTo) && color === "black") {
            pieceToPromoteTo = pieceToPromoteTo + "w"
        }

        store.dispatch({
            type: "pawnPromotion",
            payload: {pawn, pieceToPromoteTo}
        })

        if (/^ph/.test(pieceToPromoteTo)) {
            recordKnightMoves(i + 1, checkedByPlayerArr.current, playerSquaresLive)
            if (checkedByPlayerArr.current.includes(enemyKing)) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        }

        if (/^oh/.test(pieceToPromoteTo)) {
            recordKnightMoves(i + 1, checkedByPlayerArr.current, enemySquaresRender)
            if (checkedByPlayerArr.current.includes(playerKing)) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        if (/^pr/.test(pieceToPromoteTo)) {
            checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            
            if (checkedByPlayerArr.current.includes(enemyKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        }

        if (/^or/.test(pieceToPromoteTo)) {
            checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            
            if (checkedByPlayerArr.current.includes(playerKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        if (/^pb/.test(pieceToPromoteTo)) {
            checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)

            if (checkedByPlayerArr.current.includes(enemyKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        }

        if (/^ob/.test(pieceToPromoteTo)) {
            checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            
            if (checkedByPlayerArr.current.includes(playerKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        if (/^pq/.test(pieceToPromoteTo)) {
            checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            
            if (checkedByPlayerArr.current.includes(enemyKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        }

        if (/^oq/.test(pieceToPromoteTo)) {
            checkArrays(whiteBishopMoves, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            checkArrays(blackBishopMoves, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            checkArrays(rookMoves.current, i + 1, checkedByPlayerArr.current, enemySquaresRender, playerSquaresRender, true, true)
            if (checkedByPlayerArr.current.includes(playerKing)) {
                checkingPiece.current = i + 1
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        setPawnPromotes("")
    }

    const renderPieces = () => {
        const renderEachPiece = (a, src1, src2, alt1, alt2) => {
            return (
                (color === "white"
                    ?
                    <img src={src1}
                        key={a}
                        alt={alt1}
                        className="piece"
                        style={activePiece === `${a}`
                            ?
                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                            :
                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed.current}s`}}>
                    </img>
                    : 
                    <img src={src2}
                        key={a}
                        alt={alt2}
                        className="piece"
                        style={activePiece === `${a}`
                            ?
                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                            :
                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed.current}s`}}>
                    </img>)
            )
        }

        const renderRoyals = (a, src, alt) => {
            return (
                <img src={src}
                    key={a}
                    alt={alt}
                    className={`${(/^ok/.test(a) && enemyKingAttacked) || (/^pk/.test(a) && playerKingAttacked) ? "kingInCheck" : null} piece ${a}`}
                    style={activePiece === `${a}`
                        ?
                        {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                        :
                        {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed.current}s`}}>
                </img>
            )
        }

        const renderPlayerPromotion = (pawn, i) => {
            return (
                <div className="pawnPromotionPlayer" style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? whiteQueen : blackQueen} 
                        alt="Player Queen" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "pq", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? whiteRook : blackRook} 
                        alt="Player Rook" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "pr", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? whiteBishop : blackBishop} 
                        alt="Player Bishop" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "pb", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? whiteKnight : blackKnight} 
                        alt="Player Knight" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "ph", i)}/>
                    </div>
                </div>
            )
        }
    
        const renderOpponentPromotion = (pawn, i) => {
            return (
                <div className="pawnPromotionOpponent" style={pawnPromotes === pawn ? {display: "block"} : {display: "none"}}>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? blackKnight : whiteKnight} 
                        alt="Opponent Knight" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "oh", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? blackBishop : whiteBishop} 
                        alt="Opponent Bishop" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "ob", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? blackRook : whiteRook} 
                        alt="Opponent Rook" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "or", i)}/>
                    </div>
                    <div className="promotionPiece">
                        <img 
                        src={color === "white" ? blackQueen : whiteQueen} 
                        alt="Opponent Queen" 
                        className="piece"
                        onClick={() => promotePawn(pawn, "oq", i)}/>
                    </div>  
                </div>
            )
        }

        const renderEntries = (a, i) => {
            switch (a) {
                case "or1": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or2":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or3": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or4":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or5": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or6":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or7": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or8":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or9":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "or01":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook")
                case "oh1": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh2":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh3": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh4":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh5": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh6":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh7": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh8":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh9":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "oh01":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight")
                case "ob1": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop")
                case "ob2":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "ob3": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop")
                case "ob4":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "ob5": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop")
                case "ob6":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "ob7": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop")
                case "ob8":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "ob9":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "ob01":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop") 
                case "okw":
                    return renderRoyals(a, whiteKing, "White King") 
                case "okb":
                    return renderRoyals(a, blackKing, "Black King") 
                case "oqw1":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw2":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw3":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw4":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw5":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw6":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw7":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw8":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqw9":
                    return renderRoyals(a, whiteQueen, "White Queen") 
                case "oqb1":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb2":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb3":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb4":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb5":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb6":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb7":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb8":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "oqb9":
                    return renderRoyals(a, blackQueen, "Black Queen") 
                case "op1": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op1", i)}
                    </div>
                case "op2": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op2", i)}
                    </div>
                case "op3": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op3", i)}
                    </div>
                case "op4": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op4", i)}
                    </div>
                case "op5": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op5", i)}
                    </div>
                case "op6": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op6", i)}
                    </div>
                case "op7": 
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op7", i)}
                    </div>
                case "op8":
                    return <div className="pawnContainer" key={i * 90}>
                        {renderEachPiece(a, blackPawn, whitePawn, "Black Pawn", "White Pawn")}
                        {renderOpponentPromotion("op8", i)}
                    </div>
                case "pr1": 
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr2":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr3":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr4":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr5": 
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr6":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr7":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr8":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr9":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "pr01":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook")
                case "ph1":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph2":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph3":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph4":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph5":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph6":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph7":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph8":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph9":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "ph01":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight")
                case "pb1": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb2":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb3": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb4":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb5": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb6":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb7": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb8":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb9":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pb01":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop")
                case "pkw":
                    return renderRoyals(a, whiteKing, "White King")
                case "pkb":
                    return renderRoyals(a, blackKing, "Black King")
                case "pqw1":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw2":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw3":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw4":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw5":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw6":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw7":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw8":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqw9":
                    return renderRoyals(a, whiteQueen, "White Queen")
                case "pqb1":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb2":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb3":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb4":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb5":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb6":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb7":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb8":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pqb9":
                    return renderRoyals(a, blackQueen, "Black Queen")
                case "pp1":
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp1", i)}
                    </div>
                case "pp2": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp2", i)}
                    </div>
                case "pp3": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp3", i)}
                    </div>
                case "pp4": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp4", i)}
                    </div>
                case "pp5": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp5", i)}
                    </div>
                case "pp6": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp6", i)}
                    </div>
                case "pp7": 
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp7", i)}
                    </div>
                case "pp8":
                    return <div className="pawnContainer" key={i * 80}>
                        {renderEachPiece(a, whitePawn, blackPawn, "White Pawn", "Black Pawn")}
                        {renderPlayerPromotion("pp8", i)}
                    </div>
                default:
                    return (
                        <div className="piece" key={i}></div>
                    )
            }
        }

        return (
            <div className="piecesGrid">
                {currentMove === null 
                    ? 
                    boardEntries.map((a, i) => renderEntries(a[0], i))
                    : 
                    Object.entries(JSON.parse(moves[currentMove])).map((a, i) => renderEntries(a[0], i))}
            </div>
        )
    }

    const renderMovement = () => {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0]

        return (
            <div className="movementGrid">
                <div className="pawnPromotionOverlay" style={pawnPromotes ? {display: "block"} : {display: "none"}}></div>

                {arr.map((a, i) => <div key={i + 1 * 100} 
                                        onClick={() => onSquareClick(i + 1, boardEntries[i][0])}
                                        className="movementSquare">
                                            {numbers ? i + 1 : ""}
                                            {moveSquares.includes(i + 1) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}
                                    
                {arr.map((a, i) => <div key={i + 9 * 100}
                                        onClick={() => onSquareClick(i + 9, boardEntries[i + 8][0])}
                                        className="movementSquare">
                                            {numbers ? i + 9 : ""}
                                            {moveSquares.includes(i + 9) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 17 * 100} 
                                        onClick={() => onSquareClick(i + 17, boardEntries[i + 16][0])}
                                        className="movementSquare">
                                            {numbers ? i + 17 : ""}
                                            {moveSquares.includes(i + 17) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 25 * 100}
                                        onClick={() => onSquareClick(i + 25, boardEntries[i + 24][0])}
                                        className="movementSquare">
                                            {numbers ? i + 25 : ""}
                                            {moveSquares.includes(i + 25) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 33 * 100} 
                                        onClick={() => onSquareClick(i + 33, boardEntries[i + 32][0])}
                                        className="movementSquare">
                                            {numbers ? i + 33 : ""}
                                            {moveSquares.includes(i + 33) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 41 * 100}
                                        onClick={() => onSquareClick(i + 41, boardEntries[i + 40][0])}
                                        className="movementSquare">
                                            {numbers ? i + 41 : ""}
                                            {moveSquares.includes(i + 41) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 49 * 100}
                                        onClick={() => onSquareClick(i + 49, boardEntries[i + 48][0])}
                                        className="movementSquare">
                                            {numbers ? i + 49 : ""}
                                            {moveSquares.includes(i + 49) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}

                {arr.map((a, i) => <div key={i + 57 * 100} 
                                        onClick={() => onSquareClick(i + 57, boardEntries[i + 56][0])}
                                        className="movementSquare">
                                            {numbers ? i + 57 : ""}
                                            {moveSquares.includes(i + 57) ? <div className="highlightSquare"><div></div></div> : null}
                                    </div>)}
            </div>
        )
    }

    function checkArrays(arrayChecked, i, arr, ownArr, oppArr, exclude1, exclude2) {
        let arr2 = []
        if (i !== playerKing && i !== enemyKing) {
            if (playerSquaresRender.includes(i)) {
                for (let k = 0; k < 4; k++) {
                    if (playerKing8StarXrayArr.current[k].includes(i)
                        && (enemyRooks.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                        || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))
                        && playerKing8StarXrayArr.current[k].filter(a => playerSquaresRender.includes(a)).length === 1) {
                        arr2 = playerKing8StarXrayArr.current[k]
                    }
                }
                for (let k = 4; k < 8; k++) {
                    if (playerKing8StarXrayArr.current[k].includes(i)
                        && (enemyBishops.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                        || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))
                        && playerKing8StarXrayArr.current[k].filter(a => playerSquaresRender.includes(a)).length === 1) {
                        arr2 = playerKing8StarXrayArr.current[k]
                    }
                }
            }
            if (enemySquaresRender.includes(i)) {
                for (let k = 0; k < 4; k++) {
                    if (enemyKing8StarXrayArr.current[k].includes(i)
                        && (playerRooks.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                        || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))
                        && enemyKing8StarXrayArr.current[k].filter(a => enemySquaresRender.includes(a)).length === 1) {
                        arr2 = enemyKing8StarXrayArr.current[k]
                    }
                }
                for (let k = 4; k < 8; k++) {
                    if (enemyKing8StarXrayArr.current[k].includes(i)
                        && (playerBishops.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                        || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))
                        && enemyKing8StarXrayArr.current[k].filter(a => enemySquaresRender.includes(a)).length === 1) {
                        arr2 = enemyKing8StarXrayArr.current[k]
                    }
                }
            }
        }

        for (const subArr of arrayChecked) {
            if (subArr.includes(i)) {
                for (let j = i + 1; j <= Math.max(...subArr); j++) {
                    if (subArr.includes(j) && arr2.length === 0) {
                        if (ownArr.includes(j) && exclude1) {
                            break
                        } else if (oppArr.includes(j) && j !== playerKing && j !== enemyKing && exclude2) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                    } else if (subArr.includes(j) && arr2.includes(j) && !ownArr.includes(j)) {
                        arr.push(j)
                    }
                }
                for (let j = i - 1; j >= Math.min(...subArr); j--) {
                    if (subArr.includes(j) && arr2.length === 0) {
                        if (ownArr.includes(j) && exclude1) {
                            break
                        } else if (oppArr.includes(j) && j !== playerKing && j !== enemyKing && exclude2) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                        
                    } else if (subArr.includes(j) && arr2.includes(j) && !ownArr.includes(j)) {
                        arr.push(j)
                    }
                }
            }
        }
    }

    function recordKnightMoves(i, arrMoves, excArr) {  
        let arr = []
        let arr2 = []
        if (playerSquaresRender.includes(i)) {
            for (let k = 0; k < 4; k++) {
                if (playerKing8StarXrayArr.current[k].includes(i)
                    && (enemyRooks.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                    || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))
                    && playerKing8StarXrayArr.current[k].filter(a => playerSquaresRender.includes(a)).length === 1) {
                    arr2 = playerKing8StarXrayArr.current[k]
                }
            }
            for (let k = 4; k < 8; k++) {
                if (playerKing8StarXrayArr.current[k].includes(i)
                    && (enemyBishops.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                    || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))
                    && playerKing8StarXrayArr.current[k].filter(a => playerSquaresRender.includes(a)).length === 1) {
                    arr2 = playerKing8StarXrayArr.current[k]
                }
            }
        }
        if (enemySquaresRender.includes(i)) {
            for (let k = 0; k < 4; k++) {
                if (enemyKing8StarXrayArr.current[k].includes(i)
                    && (playerRooks.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                    || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))
                    && enemyKing8StarXrayArr.current[k].filter(a => enemySquaresRender.includes(a)).length === 1) {
                    arr2 = enemyKing8StarXrayArr.current[k]
                }
            }
            for (let k = 4; k < 8; k++) {
                if (enemyKing8StarXrayArr.current[k].includes(i)
                    && (playerBishops.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                    || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))
                    && enemyKing8StarXrayArr.current[k].filter(a => enemySquaresRender.includes(a)).length === 1) {
                    arr2 = enemyKing8StarXrayArr.current[k]
                }
            }
        }
        if (i) {
            if (knightLimits.current[0].includes(i)) {
                arr = [i - 15, i - 6, i + 10, i + 17]
            } else if (knightLimits.current[1].includes(i)) {
                arr = [i - 17, i - 15, i - 6, i + 10, i + 15, i + 17]
            } else if (knightLimits.current[2].includes(i)) {
                arr = [i - 17, i - 15, i - 10, i + 6, i + 15, i + 17]
            } else if (knightLimits.current[3].includes(i)) {
                arr = [i - 17, i - 10, i + 6, i + 15]
            } else {
                arr = [i - 17, i - 15, i - 10, i - 6, i + 6, i + 10, i + 15, i + 17]
            }
            for (const number of arr) {
                if (excArr.includes(number)) {
                    arr = arr.filter(a => a !== number)
                }
                if (arr2.length > 0) {
                    arr = arr.filter(a => arr2.includes(a))
                }
            }
            if (playerKingAttacked && playerSquaresRender.includes(i) && i !== playerKing && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                let arrTech = playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                arr = arr.filter(a => arrTech.includes(a))
            } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                arr = arr.filter(a => playerHorseSafetyArr.current.includes(a))
                
            }
            if (enemyKingAttacked && enemySquaresRender.includes(i) && i !== enemyKing && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                let arrTech = enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                arr = arr.filter(a => arrTech.includes(a))
            } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                arr = arr.filter(a => enemyHorseSafetyArr.current.includes(a))
                
            }
            for (const number of arr) {
                arrMoves.push(number)
            }
        }
    }

    const recordPlayerPawnMoves = (i, piece, arrMoves) => {    
        let arr = []
        let arr2 = []
        for (let k = 0; k < 4; k++) {
            if (playerKing8StarXrayArr.current[k].includes(i)
                && (enemyRooks.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))) {
                arr2 = playerKing8StarXrayArr.current[k]
            }
        }
        for (let k = 4; k < 8; k++) {
            if (playerKing8StarXrayArr.current[k].includes(i)
                && (enemyBishops.some(a => playerKing8StarXrayArr.current[k].includes(a)) 
                || enemyQueens.some(a => playerKing8StarXrayArr.current[k].includes(a)))) {
                arr2 = playerKing8StarXrayArr.current[k]
            }
        }

        if (pawnsFirstMove[piece]) {
            arr = [i - 8, i - 16]
        } else {
            arr = [i - 8]
        }
        
        if (occupiedSquaresRender.includes(i - 8)) {
            arr = []
        } else if (occupiedSquaresRender.includes(i - 16)) {
            arr = [i - 8]
        }

        if ((enemySquaresRender.includes(i - 9) || (rookMoves.current[3].includes(i) && i - 9 === enPassantSquare.current[0])) && !knightLimits.current[0].includes(i)) {
            arr.push(i - 9)
        }

        if ((enemySquaresRender.includes(i - 7) || (rookMoves.current[3].includes(i) && i - 7 === enPassantSquare.current[0])) && !knightLimits.current[3].includes(i)) {
            arr.push(i - 7)
        }

        if (arr2.filter(a => playerSquaresRender.includes(a)).length === 1) {
            arr = arr.filter(a => arr2.includes(a))
        } 

        if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            
            let arrTech = playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
            
            arr = arr.filter(a => arrTech.includes(a))
        } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter(a => playerHorseSafetyArr.current.includes(a))
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordOpponentPawnMoves = (i, piece, arrMoves) => {    
        let arr = []
        let arr2 = []
        
        for (let k = 0; k < 4; k++) {
            if (enemyKing8StarXrayArr.current[k].includes(i)
                && (playerRooks.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))) {
                arr2 = enemyKing8StarXrayArr.current[k]
            }
        }
        for (let k = 4; k < 8; k++) {
            if (enemyKing8StarXrayArr.current[k].includes(i)
                && (playerBishops.some(a => enemyKing8StarXrayArr.current[k].includes(a)) 
                || playerQueens.some(a => enemyKing8StarXrayArr.current[k].includes(a)))) {
                arr2 = enemyKing8StarXrayArr.current[k]
            }
        }

        if (pawnsFirstMove[piece]) {
            arr = [i + 8, i + 16]
        } else {
            arr = [i + 8]
        }
        
        if (occupiedSquaresRender.includes(i + 8)) {
            arr = []
        } else if (occupiedSquaresRender.includes(i + 16)) {
            arr = [i + 8]
        }

        if ((playerSquaresRender.includes(i + 7) || (rookMoves.current[4].includes(i) && i + 7 === enPassantSquare.current[0])) && !knightLimits.current[0].includes(i)) {
            arr.push(i + 7)
        }

        if ((playerSquaresRender.includes(i + 9) || (rookMoves.current[4].includes(i) && i + 9 === enPassantSquare.current[0])) && !knightLimits.current[3].includes(i)) {
            arr.push(i + 9)
        }

        if (arr2.filter(a => enemySquaresRender.includes(a)).length === 1) {
            arr = arr.filter(a => arr2.includes(a))
            
        } 

        if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            let arrTech = enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
            arr = arr.filter(a => arrTech.includes(a))
            
        } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
            arr = arr.filter(a => enemyHorseSafetyArr.current.includes(a))
            
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    function recordOpponentPawnAttacks(i, arrMoves) {
        let arr = []

        if (!knightLimits.current[0].includes(i)) {
            arr.push(i + 7)
        }

        if (!knightLimits.current[3].includes(i)) {
            arr.push(i + 9)
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    function recordPlayerPawnAttacks(i, arrMoves) {
        let arr = []

        if (!knightLimits.current[0].includes(i)) {
            arr.push(i - 9)
        }

        if (!knightLimits.current[3].includes(i)) {
            arr.push(i - 7)
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordPlayerKingMoves = (i, arrMoves) => {
        let arr = []
        let arr2 = []

        recordEnemyKingAttacks(enemyKing, arr2)

        if (castlingPlayerMoved.pk && castlingPlayerMoved.pr2 && castlingPlayerMoved.pr1) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2]
        } else if (castlingPlayerMoved.pk && castlingPlayerMoved.pr2) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2]
        } else if (castlingPlayerMoved.pk && castlingPlayerMoved.pr1) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2]
        } else if (knightLimits.current[0].includes(i)) {
            arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
        } else if (knightLimits.current[3].includes(i)) {
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
                        .filter(a => !protectedByOpponentArr.current.includes(a))
                        .filter(a => !arr2.includes(a))
                        .filter(a => a > 0 && a < 65)
            } else {
                arr = arr.filter(a => !attackedByOpponentArr.current.includes(a))
                        .filter(a => !protectedByOpponentArr.current.includes(a))
                        .filter(a => !arr2.includes(a))
                        .filter(a => a > 0 && a < 65)
            }
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordPlayerKingAttacks = (i, arrMoves) => {
        let arr = []

        if (knightLimits.current[0].includes(i)) {
            arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
        } else if (knightLimits.current[3].includes(i)) {
            arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
        } else {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordEnemyKingMoves = (i, arrMoves) => {
        let arr = []              
        let arr2 = []

        recordPlayerKingAttacks(playerKing, arr2)

        if (castlingEnemyMoved.ok && castlingEnemyMoved.or2 && castlingEnemyMoved.or1) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2]
        } else if (castlingEnemyMoved.ok && castlingEnemyMoved.or2) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2]
        } else if (castlingEnemyMoved.ok && castlingEnemyMoved.or1) {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2]
        } else if (knightLimits.current[0].includes(i)) {
            arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
        } else if (knightLimits.current[3].includes(i)) {
            arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
        } else {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
        }

        for (const number of arr) {
            if (enemySquaresRender.includes(number)) {

                arr = arr.filter(x => x !== number)

                if (!arr.includes(4) && i === 5) {
                    arr = arr.filter(x => x !== 3)
                }

                if (!arr.includes(6) && i === 5) {
                    arr = arr.filter(x => x !== 7)
                }

                arr = arr.filter(a => !attackedByPlayerArr.current.includes(a))
                        .filter(a => !protectedByPlayerArr.current.includes(a))
                        .filter(a => !arr2.includes(a))
                        .filter(a => a > 0 && a < 65)
            } else {
                arr = arr.filter(a => !attackedByPlayerArr.current.includes(a))
                        .filter(a => !protectedByPlayerArr.current.includes(a))
                        .filter(a => !arr2.includes(a))
                        .filter(a => a > 0 && a < 65)
            }
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    const recordEnemyKingAttacks = (i, arrMoves) => {
        let arr = []              
        
        if (knightLimits.current[0].includes(i)) {
            arr = [i - 8, i - 7, i + 1, i + 8, i + 9]
        } else if (knightLimits.current[3].includes(i)) {
            arr = [i - 9, i - 8, i - 1, i + 7, i + 8]
        } else {
            arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9]
        }

        for (const number of arr) {
            arrMoves.push(number)
        }
    }

    function onSquareClick(i, piece) {      
        checkGameEnd()  
        if (((!moveSquares.includes(i) && moveSquares.length > 0) || activePiece === piece) && 
            ((((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) && !playerSquaresRender.includes(i)) ||
            (((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) && !enemySquaresRender.includes(i)))){
            store.dispatch({
                type:"moveSquares",
                payload: []
            })
            store.dispatch({
                type: "activePiece",
                payload: ""
            })
            store.dispatch({
                type: "pieceSquare",
                payload: null
            })
        }
        
        if (occupiedSquaresRender.includes(i) && activePiece !== piece && !currentMove) {
            if (((color === "white" && toMove === "w") || (color === "black" && toMove === "b")) && playerSquaresRender.includes(i)) {
                store.dispatch({
                    type:"moveSquares",
                    payload: []
                })

                // if (store.getState().activePiece !== piece) {
                //     store.dispatch({
                //         type: "activePiece",
                //         payload: piece
                //     })
                // }
    
                if (store.getState().oldSquare !== i) {
                    store.dispatch({
                        type: "oldSquare",
                        payload: i
                    })
                }

                store.dispatch({
                    type: "activePiece",
                    payload: piece
                })

                pieceSquareForEngine.current = i
                playerPiece.current = boardEntries.filter(([key, value]) => value[0] === pieceSquareForEngine.current).flat()[1][1]
                store.dispatch({
                    type: "pieceSquare",
                    payload: i
                })

                if (/^ph/.test(piece)) {   
                    let arr = []
                    recordKnightMoves(i, arr, playerSquaresRender)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^pp/.test(piece)) {
                    let arr = []
                    recordPlayerPawnMoves(i, piece, arr)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^pr/.test(piece)) {
                    let arr = []
                    checkArrays(rookMoves.current, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^pb/.test(piece)) {
                    let arr = []
                    checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^pq/.test(piece)) {
                    let arr = []
                    checkArrays(rookMoves.current, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    checkArrays(blackBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    checkArrays(whiteBishopMoves, i, arr, playerSquaresRender, enemySquaresRender, true, true)
                    if (playerKingAttacked && playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (playerKingAttacked && !playerKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^pk/.test(piece)) {
                    attackedByOpponent()
                    let arr = []
                    recordPlayerKingMoves(i, arr)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
            } else if (((color === "white" && toMove === "b") || (color === "black" && toMove === "w")) && sandbox && enemySquaresRender.includes(i)) {
                store.dispatch({
                    type:"moveSquares",
                    payload: []
                })
                // if (store.getState().activePiece !== piece) {
                //     store.dispatch({
                //         type: "activePiece",
                //         payload: piece
                //     })
                // }
    
                if (store.getState().oldSquare !== i) {
                    store.dispatch({
                        type: "oldSquare",
                        payload: i
                    })
                }
                store.dispatch({
                    type: "activePiece",
                    payload: piece
                })
                store.dispatch({
                    type: "pieceSquare",
                    payload: i
                })
                pieceSquareForEngine.current = i
                playerPiece.current = boardEntries.filter(([key, value]) => value[0] === pieceSquareForEngine.current).flat()[1][1]

                if (/^oh/.test(piece)) {   
                    let arr = []
                    recordKnightMoves(i, arr, enemySquaresRender)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^op/.test(piece)) {
                    let arr = []
                    recordOpponentPawnMoves(i, piece, arr)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^or/.test(piece)) {
                    let arr = []
                    checkArrays(rookMoves.current, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^ob/.test(piece)) {
                    let arr = []
                    checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^oq/.test(piece)) {
                    let arr = []
    
                    checkArrays(rookMoves.current, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    checkArrays(blackBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    checkArrays(whiteBishopMoves, i, arr, enemySquaresRender, playerSquaresRender, true, true)
                    if (enemyKingAttacked && enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        let arrTech = enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat()
                        arr = arr.filter(a => arrTech.includes(a))
                    } else if (enemyKingAttacked && !enemyKing8StarArr.current.flat().includes(checkingPiece.current)) {
                        arr = arr.filter(a => a === checkingPiece.current)
                    }
    
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
    
                if (/^ok/.test(piece)) {
                    attackedByPlayer()  
                    let arr = []
                    recordEnemyKingMoves(i, arr)
                    store.dispatch({
                        type:"moveSquares",
                        payload: arr
                    })
                }
            }

            
        }

        if (/^ph/.test(activePiece) && moveSquares.includes(i)) {
            recordKnightMoves(i, checkedByPlayerArr.current, playerSquaresLive)

            switch (activePiece) {
                case "ph1":
                    playerKnight1 = i
                    break;
                case "ph2":
                    playerKnight2 = i
                    break;
                case "ph3":
                    playerKnight3 = i
                    break;
                case "ph4":
                    playerKnight4 = i
                    break;
                case "ph5":
                    playerKnight5 = i
                    break;
                case "ph6":
                    playerKnight6 = i
                    break;
                case "ph7":
                    playerKnight7 = i
                    break;
                case "ph8":
                    playerKnight8 = i
                    break;
                case "ph9":
                    playerKnight9 = i
                    break;
                case "ph01":
                    playerKnight01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            playerKnights = [playerKnight1, playerKnight2, playerKnight3, playerKnight4, playerKnight5, playerKnight6, playerKnight7, playerKnight8, playerKnight9, playerKnight01]

            moveKnight(i, activePiece)
        } 

        if (/^pp/.test(activePiece) && moveSquares.includes(i)) {
            
            
            recordPlayerPawnMoves(i, activePiece, checkedByPlayerArr.current)
            switch (activePiece) {
                case "pp1":
                    playerPawn1 = i
                    break;
                case "pp2":
                    playerPawn2 = i
                    break;
                case "pp3":
                    playerPawn3 = i
                    break;
                case "pp4":
                    playerPawn4 = i
                    break;
                case "pp5":
                    playerPawn5 = i
                    break;
                case "pp6":
                    playerPawn6 = i
                    break;
                case "pp7":
                    playerPawn7 = i
                    break;
                case "pp8":
                    playerPawn8 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)
            playerPawns = [playerPawn1, playerPawn2, playerPawn3, playerPawn4, playerPawn5, playerPawn6, playerPawn7, playerPawn8]
           
            movePawn(i, activePiece)
        } 

        if (/^pb/.test(activePiece) && moveSquares.includes(i)) {
            

            checkArrays(blackBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            
            switch (activePiece) {
                case "pb1":
                    playerBishop1 = i
                    break;
                case "pb2":
                    playerBishop2 = i
                    break;
                case "pb3":
                    playerBishop3 = i
                    break;
                case "pb4":
                    playerBishop4 = i
                    break;
                case "pb5":
                    playerBishop5 = i
                    break;
                case "pb6":
                    playerBishop6 = i
                    break;
                case "pb7":
                    playerBishop7 = i
                    break;
                case "pb8":
                    playerBishop8 = i
                    break;
                case "pb9":
                    playerBishop9 = i
                    break;
                case "pb01":
                    playerBishop01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            playerBishops = [playerBishop1, playerBishop2, playerBishop3, playerBishop4, playerBishop5, playerBishop6, playerBishop7, playerBishop8, playerBishop9, playerBishop01]

            moveBishop(i, activePiece)
        } 

        if (/^pr/.test(activePiece) && moveSquares.includes(i)) {
            checkArrays(rookMoves.current, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            
            switch (activePiece) {
                case "pr1":
                    playerRook1 = i
                    break;
                case "pr2":
                    playerRook2 = i
                    break;
                case "pr3":
                    playerRook3 = i
                    break;
                case "pr4":
                    playerRook4 = i
                    break;
                case "pr5":
                    playerRook5 = i
                    break;
                case "pr6":
                    playerRook6 = i
                    break;
                case "pr7":
                    playerRook7 = i
                    break;
                case "pr8":
                    playerRook8 = i
                    break;
                case "pr9":
                    playerRook9 = i
                    break;
                case "pr01":
                    playerRook01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            playerRooks = [playerRook1, playerRook2, playerRook3, playerRook4, playerRook5, playerRook6, playerRook7, playerRook8, playerRook9, playerRook01]

            moveRook(i, activePiece)
        }

        if (/^pq/.test(activePiece) && moveSquares.includes(i)) {
            
            checkArrays(rookMoves.current, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(blackBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)
            checkArrays(whiteBishopMoves, i, checkedByPlayerArr.current, playerSquaresLive, enemySquaresLive, true, true)

            switch (activePiece) {
                case "pqw1": case "pqb1":
                    playerQueen1 = i
                    break;
                case "pqw2": case "pqb2":
                    playerQueen2 = i
                    break;
                case "pqw3": case "pqb3":
                    playerQueen3 = i
                    break;
                case "pqw4": case "pqb4":
                    playerQueen4 = i
                    break;
                case "pqw5": case "pqb5":
                    playerQueen5 = i
                    break;
                case "pqw6": case "pqb6":
                    playerQueen6 = i
                    break;
                case "pqw7": case "pqb7":
                    playerQueen7 = i
                    break;
                case "pqw8": case "pqb8":
                    playerQueen8 = i
                    break;
                case "pqw9": case "pqb9":
                    playerQueen9 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            playerQueens = [playerQueen1, playerQueen2, playerQueen3, playerQueen4, playerQueen5, playerQueen6, playerQueen7, playerQueen8, playerQueen9]

            moveQueen(i, activePiece)
        } 

        if (/^pk/.test(activePiece) && moveSquares.includes(i) && !attackedByOpponentArr.current.includes(i)) {
            
            
            playerKing = i
            updateStateBoard(i, activePiece)
            moveKing(i, activePiece)
            playerKingSpiderSense()
            playerKingXray()
        } 
                
        if (/^oh/.test(activePiece) && moveSquares.includes(i)) {
            
            recordKnightMoves(i, checkedByOpponentArr.current, enemySquaresLive)
            
            switch (activePiece) {
                case "oh1":
                    enemyKnight1 = i
                    break;
                case "oh2":
                    enemyKnight2 = i
                    break;
                case "oh3":
                    enemyKnight3 = i
                    break;
                case "oh4":
                    enemyKnight4 = i
                    break;
                case "oh5":
                    enemyKnight5 = i
                    break;
                case "oh6":
                    enemyKnight6 = i
                    break;
                case "oh7":
                    enemyKnight7 = i
                    break;
                case "oh8":
                    enemyKnight8 = i
                    break;
                case "oh9":
                    enemyKnight9 = i
                    break;
                case "oh01":
                    enemyKnight01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            enemyKnights = [enemyKnight1, enemyKnight2, enemyKnight3, enemyKnight4, enemyKnight5, enemyKnight6, enemyKnight7, enemyKnight8, enemyKnight9, enemyKnight01]
            
            moveKnight(i, activePiece)
            
        } 
        
        if (/^op/.test(activePiece) && moveSquares.includes(i)) {
            recordOpponentPawnMoves(i, activePiece, checkedByOpponentArr.current)
            switch (activePiece) {
                case "op1":
                    enemyPawn1 = i
                    break;
                case "op2":
                    enemyPawn2 = i
                    break;
                case "op3":
                    enemyPawn3 = i
                    break;
                case "op4":
                    enemyPawn4 = i
                    break;
                case "op5":
                    enemyPawn5 = i
                    break;
                case "op6":
                    enemyPawn6 = i
                    break;
                case "op7":
                    enemyPawn7 = i
                    break;
                case "op8":
                    enemyPawn8 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)
            enemyPawns = [enemyPawn1, enemyPawn2, enemyPawn3, enemyPawn4, enemyPawn5, enemyPawn6, enemyPawn7, enemyPawn8]
            movePawn(i, activePiece)
        } 

        if (/^ob/.test(activePiece) && moveSquares.includes(i)) {
            
            checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
            checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
            
            
            switch (activePiece) {
                case "ob1":
                    enemyBishop1 = i
                    break;
                case "ob2":
                    enemyBishop2 = i
                    break;
                case "ob3":
                    enemyBishop3 = i
                    break;
                case "ob4":
                    enemyBishop4 = i
                    break;
                case "ob5":
                    enemyBishop5 = i
                    break;
                case "ob6":
                    enemyBishop6 = i
                    break;
                case "ob7":
                    enemyBishop7 = i
                    break;
                case "ob8":
                    enemyBishop8 = i
                    break;
                case "ob9":
                    enemyBishop9 = i
                    break;
                case "ob01":
                    enemyBishop01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)

            enemyBishops = [enemyBishop1, enemyBishop2, enemyBishop3, enemyBishop4, enemyBishop5, enemyBishop6, enemyBishop7, enemyBishop8, enemyBishop9, enemyBishop01]

            moveBishop(i, activePiece)
            
        } 

        if (/^or/.test(activePiece) && moveSquares.includes(i)) {
            
            checkArrays(rookMoves.current, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
            
            
            switch (activePiece) {
                case "or1":
                    enemyRook1 = i
                    break;
                case "or2":
                    enemyRook2 = i
                    break;
                case "or3":
                    enemyRook3 = i
                    break;
                case "or4":
                    enemyRook4 = i
                    break;
                case "or5":
                    enemyRook5 = i
                    break;
                case "or6":
                    enemyRook6 = i
                    break;
                case "or7":
                    enemyRook7 = i
                    break;
                case "or8":
                    enemyRook8 = i
                    break;
                case "or9":
                    enemyRook9 = i
                    break;
                case "or01":
                    enemyRook01 = i
                    break;
                default:
                    break;
            }
            updateStateBoard(i, activePiece)
            enemyRooks = [enemyRook1, enemyRook2, enemyRook3, enemyRook4, enemyRook5, enemyRook6, enemyRook7, enemyRook8, enemyRook9, enemyRook01]
            moveRook(i, activePiece)

        
        }

        if (/^oq/.test(activePiece) && moveSquares.includes(i)) {
            checkArrays(whiteBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
            checkArrays(blackBishopMoves, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)
            checkArrays(rookMoves.current, i, checkedByOpponentArr.current, enemySquaresLive, playerSquaresLive, true, true)

            switch (activePiece) {
                case "oqw1": case "oqb1":
                    enemyQueen1 = i
                    break;
                case "oqw2": case "oqb2":
                    enemyQueen2 = i
                    break;
                case "oqw3": case "oqb3":
                    enemyQueen3 = i
                    break;
                case "oqw4": case "oqb4":
                    enemyQueen4 = i
                    break;
                case "oqw5": case "oqb5":
                    enemyQueen5 = i
                    break;
                case "oqw6": case "oqb6":
                    enemyQueen6 = i
                    break;
                case "oqw7": case "oqb7":
                    enemyQueen7 = i
                    break;
                case "oqw8": case "oqb8":
                    enemyQueen8 = i
                    break;
                case "oqw9": case "oqb9":
                    enemyQueen9 = i
                    break;
                default:
                    break;
            }

            updateStateBoard(i, activePiece)

            enemyQueens = [enemyQueen1, enemyQueen2, enemyQueen3, enemyQueen4, enemyQueen5, enemyQueen6, enemyQueen7, enemyQueen8, enemyQueen9]

            moveQueen(i, activePiece)

        
        } 

        if (/^ok/.test(activePiece) && moveSquares.includes(i) && !attackedByPlayerArr.current.includes(i)) {
            
            enemyKing = i
            updateStateBoard(i, activePiece)
            moveKing(i, activePiece)
            enemyKingSpiderSense()
        } 
    }

    function updateStateBoard(i, string) {
        if (/^pp/.test(string) || /^op/.test(string)) {
            store.dispatch({
                type: "pawnMoved",
                payload: string
            })
        }

        if (/(pr1)|(pr2)/.test(string) || /^pk/.test(string)) {
            store.dispatch({
                type: "castlingPlayerMoved",
                payload: string
            })
        } 
        
        if (/(or1)|(or2)/.test(string) || /^ok/.test(string)){
            store.dispatch({
                type: "castlingEnemyMoved",
                payload: string
            })
        }

        store.dispatch({
            type: "newSquare",
            payload: i
        })

        pieceNewSquare.current = i
        playerNewSquareForEngine.current = boardEntries.filter(([key, value]) => value[0] === pieceNewSquare.current).flat()[1][1]

        store.dispatch({
            type: "highlightMove",
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
                    type: string
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
                    type: string
                })
            }
        } 

        // checkGameEnd()
        recordBoard()
    
    }

    const checkGameEnd = () => {
        attackedByOpponent()
        attackedByPlayer()

        let arrPlayerCheckmate = []
        let arrEnemyCheckmate = []
        let arrPlayerStalemate = []
        let arrEnemyStalemate = []
        
        recordPlayerKingMoves(playerKing, arrPlayerCheckmate)
        recordEnemyKingMoves(enemyKing, arrEnemyCheckmate)

        if ((playerKingAttacked && !attackedByPlayerArr.current.includes(checkingPiece.current) && arrPlayerCheckmate.length === 0 &&
            !playerKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat().some(a => attackedByPlayerArr.current.includes(a))) ||
            (enemyKingAttacked && !attackedByOpponentArr.current.includes(checkingPiece.current) && arrEnemyCheckmate.length === 0 &&
            !enemyKing8StarArr.current.filter(a => a.includes(checkingPiece.current)).flat().some(a => attackedByOpponentArr.current.includes(a)))) {
            
            if (sounds) {
                gameEndSound.play()
            }

            store.dispatch({
                type: "gameEnd"
            })
            
        }

        playerRooks.forEach(a => checkArrays(rookMoves.current, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerKnights.forEach(a => recordKnightMoves(a, arrPlayerStalemate, playerSquaresRender))
        playerBishops.forEach(a => checkArrays(whiteBishopMoves, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerBishops.forEach(a => checkArrays(blackBishopMoves, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(whiteBishopMoves, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(blackBishopMoves, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerQueens.forEach(a => checkArrays(rookMoves.current, a, arrPlayerStalemate, playerSquaresRender, enemySquaresRender, true, true))
        playerPawns.forEach(a => recordPlayerPawnMoves(a, null, arrPlayerStalemate))
        recordPlayerKingMoves(playerKing, arrPlayerStalemate)

        enemyRooks.forEach(a => checkArrays(rookMoves.current, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyKnights.forEach(a => recordKnightMoves(a, arrEnemyStalemate, enemySquaresRender))
        enemyBishops.forEach(a => checkArrays(whiteBishopMoves, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyBishops.forEach(a => checkArrays(blackBishopMoves, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(whiteBishopMoves, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(blackBishopMoves, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyQueens.forEach(a => checkArrays(rookMoves.current, a, arrEnemyStalemate, enemySquaresRender, playerSquaresRender, true, true))
        enemyPawns.forEach(a => recordOpponentPawnMoves(a, null, arrEnemyStalemate))
        recordEnemyKingMoves(enemyKing, arrEnemyStalemate)

        arrPlayerStalemate = arrPlayerStalemate.filter(a => a > 0 && a < 65)
        arrEnemyStalemate = arrEnemyStalemate.filter(a => a > 0 && a < 65)

        if (arrPlayerStalemate.length === 0 || arrEnemyStalemate.length === 0 || occupiedSquaresRender.length === 2 || halfMoveCounter === 50) {
 
            if (sounds) {
                gameEndSound.play()
            }
            store.dispatch({
                type: "gameEnd"
            })
        }

        for (let i = 0; i < moves.length; i++) {
            if (JSON.stringify(store.getState().moves[i]) === JSON.stringify(store.getState().moves[i + 4]) && 
                JSON.stringify(store.getState().moves[i]) === JSON.stringify(store.getState().moves[i + 8])) {
                    if (sounds) {
                        gameEndSound.play()
                    }
                    store.dispatch({
                        type: "gameEnd"
                    })
            }
        }
    }
    
    const animatePiece = (i, string, num1, num2) => {    
        store.dispatch({
            type: "setMoveVar",
            payload: [num1, num2]
        })

        if (/^o/.test(string)) {
            
            if (playerSquaresRender.includes(i)){
                if (playerPawns.includes(i)) {
                    store.dispatch({
                        type: "pieceGainOpponent",
                        payload: "♙"
                    })  
                }

                if (playerKnights.includes(i)) {
                    store.dispatch({
                        type: "pieceGainOpponent",
                        payload: "♘"
                    })  
                }

                if (playerBishops.includes(i)) {
                    store.dispatch({
                        type: "pieceGainOpponent",
                        payload: "♗"
                    })  
                }

                if (playerRooks.includes(i)) {
                    store.dispatch({
                        type: "pieceGainOpponent",
                        payload: "♖"
                    })  
                }

                if (playerQueens.includes(i)) {
                    store.dispatch({
                        type: "pieceGainOpponent",
                        payload: "♕"
                    })  
                }

                store.dispatch({
                    type: "halfMoveCounter/reset",
                })

                if (/^op/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `${board[string][1].slice(0, 1)}x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^oh/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♘x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ob/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♗x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^or/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♖x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^oq/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♕x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ok/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♔x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^op/.test(string) && rookMoves.current[7].includes(i) && sandbox) {
                    setPawnPromotes(string)
                }
                
                if (enemyKingAttacked) {
                    
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }

                if (/^ok/.test(string) && enemyKingAttacked) {
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }

                // if (checkedByOpponentArr.current.flat().includes(playerKing)) {
                //     checkSound.play()
                //     store.dispatch({
                //         type: "playerKingAttacked",
                //         payload: true
                //     })
                //     checkingPiece.current = i
                // } 
                
                if (!checkedByOpponentArr.current.flat().includes(playerKing)) {
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 

                if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[0].includes(a))
                    || enemyBishops.some(a => playerKingSpiderSenseArr.current[0].includes(a)))
                    && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                            .every(a => !playerKingSpiderSenseArr.current[0].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }

                if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[1].includes(a))
                    || enemyRooks.some(a => playerKingSpiderSenseArr.current[1].includes(a)))
                    && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                            .every(a => !playerKingSpiderSenseArr.current[1].includes(a))) {
                                                if (sounds) {
                                                    checkSound.play()
                                                }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }

                if (sounds) {
                    captureSound.play()
                }
            } else {
                if (/^op/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: playerNewSquareForEngine.current
                    })
                }

                if (/^oh/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♘${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ob/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♗${playerNewSquareForEngine.current}`
                    })
                }

                if (/^or/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♖${playerNewSquareForEngine.current}`
                    })
                }

                if (/^oq/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♕${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ok/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♔${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ok/.test(string) && enemyKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }

                if (enemyKing8StarArr.current.flat().includes(i) && enemyKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }
                
                if (checkedByPlayerArr.current.includes(i) && enemyKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                }

                if (/^op/.test(string) && rookMoves.current[7].includes(i) && sandbox) {
                    setPawnPromotes(string)
                }

                if (/^op/.test(string)) {
                    store.dispatch({
                        type: "halfMoveCounter/reset",
                    })
                } else {
                    store.dispatch({
                        type: "halfMoveCounter/increase",
                    })
                }
                
                if (checkedByOpponentArr.current.flat().includes(playerKing)) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    checkingPiece.current = i
                } 
                
                if (!checkedByOpponentArr.current.flat().includes(playerKing)) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                } 

                if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[0].includes(a))
                    || enemyBishops.some(a => playerKingSpiderSenseArr.current[0].includes(a)))
                    && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                            .every(a => !playerKingSpiderSenseArr.current[0].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                    
                }

                if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[1].includes(a))
                    || enemyRooks.some(a => playerKingSpiderSenseArr.current[1].includes(a)))
                    && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                            .every(a => !playerKingSpiderSenseArr.current[1].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: true
                    })
                }
                
                if (sounds) {
                    moveSound.play()
                }
            }

            if (color === "white" && toMove === "b" && sandbox) {
                store.dispatch({
                    type: "moveCounter"
                })
            }

            if (color === "white") {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            }

            if (/^pp/.test(enPassantSquare.current[1])) {
                enPassantSquare.current = [0, ""]
            }

            
        }

        if (/^p/.test(string)) {
            store.dispatch({
                type: "moveNumbers"
            })
            
            if (enemySquaresRender.includes(i)) {
                store.dispatch({
                    type: "halfMoveCounter/reset",
                })

                if (enemyPawns.includes(i)) {
                    store.dispatch({
                        type: "pieceGainPlayer",
                        payload: "♙"
                    })  
                }

                if (enemyKnights.includes(i)) {
                    store.dispatch({
                        type: "pieceGainPlayer",
                        payload: "♘"
                    })  
                }

                if (enemyBishops.includes(i)) {
                    store.dispatch({
                        type: "pieceGainPlayer",
                        payload: "♗"
                    })  
                }

                if (enemyRooks.includes(i)) {
                    store.dispatch({
                        type: "pieceGainPlayer",
                        payload: "♖"
                    })  
                }

                if (enemyQueens.includes(i)) {
                    store.dispatch({
                        type: "pieceGainPlayer",
                        payload: "♕"
                    })  
                }

                if (/^pp/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `${board[string][1].slice(0, 1)}x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^ph/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♘x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pb/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♗x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pr/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♖x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pq/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♕x${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pk/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♔x${playerNewSquareForEngine.current}`
                    })
                }

                if (playerKingAttacked) {
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }

                if (/^pp/.test(string) && rookMoves.current[0].includes(i)) {
                    setPawnPromotes(string)
                }
                
                // if (checkedByPlayerArr.current.flat().includes(enemyKing)) {
                //     checkSound.play()
                //     store.dispatch({
                //         type: "enemyKingAttacked",
                //         payload: true
                //     })
                //     checkingPiece.current = i
                // } 

                if (/^pk/.test(string) && playerKingAttacked) {
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }
                
                if (!checkedByPlayerArr.current.flat().includes(enemyKing) && enemyKingAttacked) {
                    if (sounds) {
                        captureSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 

                if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[0].includes(a)) 
                    || playerBishops.some(a => enemyKingSpiderSenseArr.current[0].includes(a)))
                    && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                            .every(a => !enemyKingSpiderSenseArr.current[0].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[1].includes(a)) 
                    || playerRooks.some(a => enemyKingSpiderSenseArr.current[1].includes(a)))
                    && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                            .every(a => !enemyKingSpiderSenseArr.current[1].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                if (sounds) {
                    captureSound.play()
                }
            } else {
                if (/^pp/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: playerNewSquareForEngine.current
                    })
                }

                if (/^ph/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♘${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pb/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♗${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pr/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♖${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pq/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♕${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pk/.test(string)) {
                    store.dispatch({
                        type: "notationArr",
                        payload: `♔${playerNewSquareForEngine.current}`
                    })
                }

                if (/^pp/.test(string) && rookMoves.current[0].includes(i)) {
                    setPawnPromotes(string)
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

                if (checkedByOpponentArr.current.includes(i) && playerKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }

                if (playerKing8StarArr.current.flat().includes(i) && playerKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }

                if (/^pk/.test(string) && playerKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "playerKingAttacked",
                        payload: false
                    })
                }
                
                if (checkedByPlayerArr.current.flat().includes(enemyKing)) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    checkingPiece.current = i
                } 
                
                if (!checkedByPlayerArr.current.flat().includes(enemyKing) && enemyKingAttacked) {
                    if (sounds) {
                        moveSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: false
                    })
                } 

                if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[0].includes(a)) 
                    || playerBishops.some(a => enemyKingSpiderSenseArr.current[0].includes(a)))
                    && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                            .every(a => !enemyKingSpiderSenseArr.current[0].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                    
                }

                if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[1].includes(a)) 
                    || playerRooks.some(a => enemyKingSpiderSenseArr.current[1].includes(a)))
                    && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                            .every(a => !enemyKingSpiderSenseArr.current[1].includes(a))) {
                    if (sounds) {
                        checkSound.play()
                    }
                    store.dispatch({
                        type: "enemyKingAttacked",
                        payload: true
                    })
                }

                if (sounds) {
                    moveSound.play()
                }
            }

            if (color === "white") {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            }

            

            if (color === "black" && toMove === "w") {
                store.dispatch({
                    type: "moveCounter"
                })
            }

            if (/^op/.test(enPassantSquare.current[1])) {
                enPassantSquare.current = [0, ""]
            }
        }

        checkedByOpponentArr.current = []
        checkedByPlayerArr.current = []

        store.dispatch({
            type:"moveSquares",
            payload: []
        })
        store.dispatch({
            type: "pieceSquare",
            payload: null
        })

        playerKingXray()
        enemyKingXray()

        store.dispatch({
            type: "recordMoves",
            payload: JSON.stringify(store.getState().board)
        })
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
        if (i === enPassantSquare.current[0]) {
            switch (pieceSquareForEngine.current - i) {
                case -9:
                    animateEnPassant(-80, -80, string, i)
                    break;
                case -7:
                    animateEnPassant(80, -80, string, i)
                    break;
                case 7:
                    animateEnPassant(-80, 80, string, i)
                    break;
                case 9:
                    animateEnPassant(80, 80, string, i)
                    break;
                default:
                    break;
            }
        } else {
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
                    enPassantSquare.current = [i + 8, string]
                    animatePiece(i, string, 0, 160)
                    break;
                case -16: 
                    enPassantSquare.current = [i - 8, string]
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
        if ((knightLimits.current[0].includes(pieceSquare) || knightLimits.current[3].includes(pieceSquare)) 
            && 
            (knightLimits.current[0].includes(i) || knightLimits.current[3].includes(i))) {
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

    const animateCastling = (coor1, coor2, rookOldSq, newSqRook, rookToMove) => {
        if (sounds) {
           castlingSound.play()
        }

        store.dispatch({
            type: "setMoveVar",
            payload: [coor1, coor2]
        })

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

        if (rookToMove === "pr1") {
            playerRook1 = newSqRook
        }
        if (rookToMove === "pr2") {
            playerRook2 = newSqRook
        }
        if (rookToMove === "or1") {
            enemyRook1 = newSqRook
        }
        if (rookToMove === "or2") {
            enemyRook2 = newSqRook
        }



        playerRooks = [playerRook1, playerRook2, playerRook3, playerRook4, playerRook5, playerRook6, playerRook7, playerRook8, playerRook9, playerRook01]
        enemyRooks = [enemyRook1, enemyRook2, enemyRook3, enemyRook4, enemyRook5, enemyRook6, enemyRook7, enemyRook8, enemyRook9, enemyRook01]

        recordBoard()

        if (/^pr/.test(rookToMove)) {
            store.dispatch({
                type: "moveNumbers"
            })
            if ((playerRooks.some(a => enemyKingSpiderSenseArr.current[1].includes(a)))
                && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                        .every(a => !enemyKingSpiderSenseArr.current[1].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        } else {

            if ((enemyRooks.some(a => playerKingSpiderSenseArr.current[1].includes(a)))
                && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                        .every(a => !playerKingSpiderSenseArr.current[1].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        // encode()

        // setLastMadeMove([newSqKing, newSqRook])

        store.dispatch({
            type:"moveSquares",
            payload: []
        })

        store.dispatch({
            type: "pieceSquare",
            payload: null
        })

        if (color === "white") {
            if (/^pr/.test(rookToMove)) {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            }
        } else {
            if (/^or/.test(rookToMove)) {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            }
        }

        store.dispatch({
            type: "recordMoves",
            payload: JSON.stringify(store.getState().board)
        })
        playerKingXray()
        enemyKingXray()
    }

    const animateEnPassant = (coor1, coor2, string, i) => {
        store.dispatch({
            type: "setMoveVar",
            payload: [coor1, coor2]
        })

        let capturedPawn = i

        if (/^pp/.test(string)) {
            capturedPawn += 8
        } else {
            capturedPawn -= 8
        }

        store.dispatch({
            type: "oldSquare",
            payload: i
        })

        store.dispatch({
            type: "newSquare",
            payload: capturedPawn
        })

        store.dispatch({
            type: string,
            payload: "takes"
        })

        store.dispatch({
            type: "oldSquare",
            payload: capturedPawn
        })

        store.dispatch({
            type: "newSquare",
            payload: i
        })

        store.dispatch({
            type: string
        })

        recordBoard()

        if (/^pp/.test(string)) {
            store.dispatch({
                type: "moveNumbers"
            })

            store.dispatch({
                type: "notationArr",
                payload: `${board[string][1].slice(0, 1)}x${playerNewSquareForEngine.current}`
            })
            
            if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[0].includes(a)) 
                || playerBishops.some(a => enemyKingSpiderSenseArr.current[0].includes(a)))
                && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                        .every(a => !enemyKingSpiderSenseArr.current[0].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }

            if ((playerQueens.some(a => enemyKingSpiderSenseArr.current[1].includes(a)) 
                || playerRooks.some(a => enemyKingSpiderSenseArr.current[1].includes(a)))
                && occupiedSquaresLive.filter(a => !playerSquaresLive.includes(a))
                                        .every(a => !enemyKingSpiderSenseArr.current[1].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "enemyKingAttacked",
                    payload: true
                })
            }
        } else {
            if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[0].includes(a))
                || enemyBishops.some(a => playerKingSpiderSenseArr.current[0].includes(a)))
                && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                        .every(a => !playerKingSpiderSenseArr.current[0].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }

            if ((enemyQueens.some(a => playerKingSpiderSenseArr.current[1].includes(a))
                || enemyRooks.some(a => playerKingSpiderSenseArr.current[1].includes(a)))
                && occupiedSquaresLive.filter(a => !enemySquaresLive.includes(a))
                                        .every(a => !playerKingSpiderSenseArr.current[1].includes(a))) {
                if (sounds) {
                    checkSound.play()
                }
                store.dispatch({
                    type: "playerKingAttacked",
                    payload: true
                })
            }
        }

        if (sounds) {
            captureSound.play()
        }
        // encode()


        store.dispatch({
            type:"moveSquares",
            payload: []
        })

        store.dispatch({
            type: "pieceSquare",
            payload: null
        })


        if (color === "white") {
            if (/^pp/.test(string)) {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            }
        } else {
            if (/^op/.test(string)) {
                store.dispatch({
                    type: "toMove",
                    payload: "w"
                })
            } else {
                store.dispatch({
                    type: "toMove",
                    payload: "b"
                })
            }
        }
        store.dispatch({
            type: "recordMoves",
            payload: JSON.stringify(store.getState().board)
        })
    }

    const moveKing = (i, string) => {
        if (/^pk/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case -2:
                    animateCastling(-160, 0, 64, 62, "pr2")
                    store.dispatch({
                        type: "notationArr",
                        payload: "O-O"
                    })
                    break
                case 2:
                    animateCastling(160, 0, 57, 60, "pr1")
                    store.dispatch({
                        type: "notationArr",
                        payload: "O-O-O"
                    })
                    break
                default:
                    break
            }
        }
        if (/^ok/.test(string)) {
            switch (pieceSquareForEngine.current - i) {
                case 2:
                    animateCastling(160, 0, 1, 4, "or2")
                    store.dispatch({
                        type: "notationArr",
                        payload: "O-O-O"
                    })
                    break
                case -2:
                    animateCastling(-160, 0, 8, 6, "or1")
                    store.dispatch({
                        type: "notationArr",
                        payload: "O-O"
                    })
                    break
                default:
                    break
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
        <div>
            {renderPieces()}
            {renderMovement()}
        </div>
    )
}

export default Pieces