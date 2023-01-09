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

import store from "../redux/store"

import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"

import "./board.sass"

const Board = () => {
    const [activeStatePiece, setActiveStatePiece] = useState("")
    const [moveSquares, setMoveSquares] = useState([])
    const [pieceSquare, setPieceSquare] = useState(null)
    const [occupiedSquares, setOccupiedSquares] = useState([])
    const [emptySquares, setEmptySquares] = useState([])
    const [playerSquares, setPlayerSquares] = useState([])
    const [enemySquares, setEnemySquares] = useState([])
    const [moveVar, setMoveVar] = useState([0, 0])

    const board = useSelector(state => state.board)
    const color = useSelector(state => state.color)
    const activePiece = useSelector(state => state.activePiece)
    const numbers = useSelector(state => state.numbers)
    const pawnsFirstMove = useSelector(state => state.pawnsFirstMove)

    const boardEntries = Object.entries(board)
    const notInitialRender = useRef(false)
    let animationSpeed = 0

    if (store.getState().animations === "fast") {
        animationSpeed = .2
    } else if (store.getState().animations === "average") {
        animationSpeed = .5
    } else if (store.getState().animations === "slow") {
        animationSpeed = .7
    }

    let moveSound = new Audio(moveSoundFile)

    const recordBoard = () => {
        const filteredEnemy = boardEntries.filter(([key, value]) => /^o/.test(key))
        const justEnemy = Object.fromEntries(filteredEnemy)

        const filteredPlayer = boardEntries.filter(([key, value]) => /^p/.test(key))
        const justPlayer = Object.fromEntries(filteredPlayer)

        const filteredEmpty = boardEntries.filter(([key, value]) => /empty/.test(key))
        const filteredOccupied = boardEntries.filter(([key, value]) => !/empty/.test(key))
        const justEmpty = Object.fromEntries(filteredEmpty)
        const justOccupied = Object.fromEntries(filteredOccupied)

        setEnemySquares(Object.values(justEnemy))
        setPlayerSquares(Object.values(justPlayer))
        setEmptySquares(Object.values(justEmpty))
        setOccupiedSquares(Object.values(justOccupied))
    }

    const knightLimits = [
        [], [], [], []
    ]

    for (let i = 1; i < 64; i += 8) {
        knightLimits[0].push(i)
        knightLimits[1].push(i + 1)
        knightLimits[2].push(i + 6)
        knightLimits[3].push(i + 7)
    }

    const whiteBishopLimits = [
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

    const blackBishopLimits = [
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

    const rookLimits = [
        [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    ]

    for (let i = 1; i < 9; i++) {
        rookLimits[0].push(i)
        rookLimits[1].push(i + 8)
        rookLimits[2].push(i + 16)
        rookLimits[3].push(i + 24)
        rookLimits[4].push(i + 32)
        rookLimits[5].push(i + 40)
        rookLimits[6].push(i + 48)
        rookLimits[7].push(i + 56)
    }

    for (let i = 1; i < 65; i += 8) {
        rookLimits[8].push(i)
        rookLimits[9].push(i + 1)
        rookLimits[10].push(i + 2)
        rookLimits[11].push(i + 3)
        rookLimits[12].push(i + 4)
        rookLimits[13].push(i + 5)
        rookLimits[14].push(i + 6)
        rookLimits[15].push(i + 7)
    }
    
    useEffect(() => {
        recordBoard()
    }, [])

    useEffect(() => {
        recordBoard()
    }, [pieceSquare])

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
                    type: "newSquare",
                    payload: null
                })
                store.dispatch({
                    type: "oldSquare",
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
                    {moveSquares.includes(i + 1) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr2.map((a, i) => <div key={i + 9} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 9 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 9) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr3.map((a, i) => <div key={i + 17} className={`${i % 2 === 0 ? "white" : "black"} ${i + 17 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 17) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr4.map((a, i) => <div key={i + 25} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 25 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 25) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr5.map((a, i) => <div key={i + 33} className={`${i % 2 === 0 ? "white" : "black"} ${i + 33 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 33) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr6.map((a, i) => <div key={i + 41} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 41 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 41) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr7.map((a, i) => <div key={i + 49} className={`${i % 2 === 0 ? "white" : "black"} ${i + 49 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 49) ? <div className="activeSquare"></div> : null}
                </div>)}

                {arr8.map((a, i) => <div key={i + 57} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 57 === pieceSquare ? "highlight" : null}`} >
                    {moveSquares.includes(i + 57) ? <div className="activeSquare"></div> : null}
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

        const renderEntries = (a) => {
            switch (a) {
                case "or1": case "or2":
                    return (color === "white" 
                                    ?
                                        <img src={blackRook}
                                            key={a}
                                            alt="Black Rook" 
                                            className="piece">
                                        </img>
                                    :
                                        <img src={whiteRook}
                                            key={a}
                                            alt="White Rook" 
                                            className="piece">
                                        </img>)
                case "ok1": case "ok2":
                    return (color === "white" 
                                    ?
                                        <img src={blackKnight}
                                            key={a}
                                            alt="Black Knight" 
                                            className="piece">
                                        </img>
                                    :
                                        <img src={whiteKnight}
                                            key={a}
                                            alt="White Knight" 
                                            className="piece">
                                        </img>)
                case "ob1": case "ob2":
                    return (color === "white" 
                                    ?
                                        <img src={blackBishop}
                                            key={a}
                                            alt="Black Bishop" 
                                            className="piece">
                                        </img>
                                    :
                                        <img src={whiteBishop}
                                            key={a}
                                            alt="White Bishop" 
                                            className="piece">
                                        </img>)
                case "okw":
                    return (
                                <img src={whiteKing}
                                    key={a}
                                    alt="White King" 
                                    className="piece">
                                </img>
                            )
                case "okb":
                    return (
                                <img src={blackKing}
                                    key={a}
                                    alt="Black King" 
                                    className="piece">
                                </img>
                            )
                case "oqw":
                    return (
                                <img src={whiteQueen}
                                    key={a}
                                    alt="White Queen" 
                                    className="piece">
                                </img>
                            )
                case "oqb":
                    return (
                                <img src={blackQueen}
                                    key={a}
                                    alt="Black Queen" 
                                    className="piece">
                                </img>
                            )
                case "op1": case "op2": case "op3": case "op4": case "op5": case "op6": case "op7": case "op8":
                    return (color === "white" 
                                    ?
                                        <img src={blackPawn}
                                            key={a}
                                            alt="Black Pawn" 
                                            className="piece">
                                        </img>
                                    :
                                        <img src={whitePawn}
                                            key={a}
                                            alt="White Pawn" 
                                            className="piece">
                                        </img>)
                case "pr1": 
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook", "pr1")
                case "pr2":
                    return renderEachPiece(a, whiteRook, blackRook, "White Rook", "Black Rook", "pr2")
                case "pk1":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "pk1")
                case "pk2":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "pk2")
                case "pb1": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb1")
                case "pb2":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb2")
                case "pkw":
                    return (
                                <img src={whiteKing}
                                    key={a}
                                    alt="White King" 
                                    className="piece">
                                </img>
                            )
                case "pkb":
                    return (
                                <img src={blackKing}
                                    key={a}
                                    alt="Black King" 
                                    className="piece">
                                </img>
                            )
                case "pqw":
                    return (
                                <img src={whiteQueen}
                                    key={a}
                                    alt="White Queen" 
                                    className="piece">
                                </img>
                            )
                case "pqb":
                    return (
                                <img src={blackQueen}
                                    key={a}
                                    alt="Black Queen" 
                                    className="piece">
                                </img>
                            )
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
                                    </div>)}
                                    
                {arr2.map((a, i) => <div key={i + 9}
                                        onClick={() => onSquareClick(i + 9, boardEntries[i + 8][0])}
                                        className="movementSquare">
                                            {numbers ? i + 9 : ""}
                                    </div>)}

                {arr3.map((a, i) => <div key={i + 17} 
                                        onClick={() => onSquareClick(i + 17, boardEntries[i + 16][0])}
                                        className="movementSquare">
                                            {numbers ? i + 17 : ""}
                                    </div>)}

                {arr4.map((a, i) => <div key={i + 25}
                                        onClick={() => onSquareClick(i + 25, boardEntries[i + 24][0])}
                                        className="movementSquare">
                                            {numbers ? i + 25 : ""}
                                    </div>)}

                {arr5.map((a, i) => <div key={i + 33} 
                                        onClick={() => onSquareClick(i + 33, boardEntries[i + 32][0])}
                                        className="movementSquare">
                                            {numbers ? i + 33 : ""}
                                    </div>)}

                {arr6.map((a, i) => <div key={i + 41}
                                        onClick={() => onSquareClick(i + 41, boardEntries[i + 40][0])}
                                        className="movementSquare">
                                            {numbers ? i + 41 : ""}
                                    </div>)}

                {arr7.map((a, i) => <div key={i + 49}
                                        onClick={() => onSquareClick(i + 49, boardEntries[i + 48][0])}
                                        className="movementSquare">
                                            {numbers ? i + 49 : ""}
                                    </div>)}

                {arr8.map((a, i) => <div key={i + 57} 
                                        onClick={() => onSquareClick(i + 57, boardEntries[i + 56][0])}
                                        className="movementSquare">
                                            {numbers ? i + 57 : ""}
                                    </div>)}
            </div>
        )
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

            if (/^pk/.test(piece)) {   
                let arr = []     
                if (knightLimits[0].includes(i)) {
                    arr = [i - 15, i - 6, i + 10, i + 17].filter(a => a < 65)
                } else if (knightLimits[1].includes(i)) {
                    arr = [i - 17, i - 15, i - 6, i + 10, i + 15, i + 17].filter(a => a < 65)
                } else if (knightLimits[2].includes(i)) {
                    arr = [i - 17, i - 15, i - 10, i + 6, i + 15, i + 17].filter(a => a < 65)
                } else if (knightLimits[3].includes(i)) {
                    arr = [i - 17, i - 10, i + 6, i + 15].filter(a => a < 65)
                }
                else {
                    arr = [i - 17, i - 15, i - 10, i - 6, i + 6, i + 10, i + 15, i + 17]
                }
                for (const number of arr) {
                    if (occupiedSquares.includes(number)) {
                        arr = arr.filter(x => x !== number)
                        setMoveSquares(arr)
                    } else {
                        setMoveSquares(arr)
                    }
                }
            }

            if (/^pp/.test(piece)) {
                let arr = []
                
                if (pawnsFirstMove[piece]) {
                    arr = [i - 8, i - 16]
                } else {
                    arr = [i - 8]
                }
                
                if (occupiedSquares.includes(i - 8)) {
                    arr = []
                    setMoveSquares(arr)
                } else if (occupiedSquares.includes(i - 16)) {
                    arr = [i - 8]
                    setMoveSquares(arr)
                } else {
                    setMoveSquares(arr)
                }
            }

            const checkBishop = (string, array) => {
                if (piece === string) {
                    let arr = []
    
                    for (const subArr of array) {
                        if (subArr.includes(i)) {
                            for (let j = i + 1; j <= Math.max(...subArr); j++) {
                                if (subArr.includes(j)) {
                                    if (occupiedSquares.includes(j)) {
                                        break
                                    } else {
                                        arr.push(j)
                                    }
                                }
                            }
                            for (let j = i - 1; j >= Math.min(...subArr); j--) {
                                if (subArr.includes(j)) {
                                    if (occupiedSquares.includes(j)) {
                                        break
                                    } else {
                                        arr.push(j)
                                    }
                                }
                            }

                            setMoveSquares(arr)
                        }
                    }
                }
            }

            checkBishop("pb1", blackBishopLimits)
            checkBishop("pb2", whiteBishopLimits)

            if (/^pr/.test(piece)) {

            }
        }

        if (activePiece === "pk1" && moveSquares.includes(i)) {
            moveKnight(i, "pk1")
        } else if (activePiece === "pk2" && moveSquares.includes(i)) {
            moveKnight(i, "pk2")
        }

        if (activePiece === "pp1" && moveSquares.includes(i)) {
            movePawn(i, "pp1")
        } else if (activePiece === "pp2" && moveSquares.includes(i)) {
            movePawn(i, "pp2")
        } else if (activePiece === "pp3" && moveSquares.includes(i)) {
            movePawn(i, "pp3")
        } else if (activePiece === "pp4" && moveSquares.includes(i)) {
            movePawn(i, "pp4")
        } else if (activePiece === "pp5" && moveSquares.includes(i)) {
            movePawn(i, "pp5")
        } else if (activePiece === "pp6" && moveSquares.includes(i)) {
            movePawn(i, "pp6")
        } else if (activePiece === "pp7" && moveSquares.includes(i)) {
            movePawn(i, "pp7")
        } else if (activePiece === "pp8" && moveSquares.includes(i)) {
            movePawn(i, "pp8")
        }

        if (activePiece === "pb1" && moveSquares.includes(i)) {
            moveBishop(i, "pb1")
        } else if (activePiece === "pb2" && moveSquares.includes(i)) {
            moveBishop(i, "pb2")
        }

        if (activePiece === "pr1" && moveSquares.includes(i)) {
            moveBishop(i, "pr1")
        } else if (activePiece === "pr2" && moveSquares.includes(i)) {
            moveBishop(i, "pr2")
        }
    }

    const animateKnight = (i, string, num1, num2) => {
        moveSound.play()
        setMoveVar([num1, num2])
        store.dispatch({
            type: "newSquare",
            payload: i
        })
        store.dispatch({
            type: string,
        })
        recordBoard()
        setMoveSquares([])
        setPieceSquare(null)
    }    

    const moveKnight = (i, string) => {
        switch (pieceSquare - i) {
            case -17:
                animateKnight(i, string, -80, -160)
                break;
            case -15:
                animateKnight(i, string, 80, -160)
                break;
            case -10:
                animateKnight(i, string, -160, -80)
                break;
            case -6:
                animateKnight(i, string, 160, -80)
                break;
            case 6:
                animateKnight(i, string, -160, 80)
                break;
            case 10:
                animateKnight(i, string, 160, 80)
                break;
            case 15:
                animateKnight(i, string, -80, 160)
                break;
            case 17:
                animateKnight(i, string, 80, 160)
                break;
            default:
                break;
        }   
    }

    const animatePawn = (i, string, num1, num2) => {
        moveSound.play()
        setMoveVar([num1, num2])
        store.dispatch({
            type: "newSquare",
            payload: i
        })
        store.dispatch({
            type: string,
        })
        store.dispatch({
            type: "pawnMoved",
            payload: {string: false}
        })
        recordBoard()
        setMoveSquares([])
        setPieceSquare(null)
    }

    const movePawn = (i, string) => {
        switch (pieceSquare - i) {
            case 8:
                animatePawn(i, string, 0, 80)
                break;
            case 16:
                animatePawn(i, string, 0, 160)
                break;
            default:
                break;
        }
    }

    const animateBishop = (i, string, num1, num2) => {
        moveSound.play()
        setMoveVar([num1, num2])
        store.dispatch({
            type: "newSquare",
            payload: i
        })
        store.dispatch({
            type: string,
        })
        recordBoard()
        setMoveSquares([])
        setPieceSquare(null)
    }

    const moveBishop = (i, string) => {
        switch (pieceSquare - i) {
            case 9:
                animateBishop(i, string, 80, 80)
                break;
            case 18:
                animateBishop(i, string, 160, 160)
                break;
            case 27:
                animateBishop(i, string, 240, 240)
                break;
            case 36:
                animateBishop(i, string, 320, 320)
                break;
            case 45:
                animateBishop(i, string, 400, 400)
                break;
            case 54:
                animateBishop(i, string, 480, 480)
                break;
            case 63:
                animateBishop(i, string, 560, 560)
                break;
            case -9: 
                animateBishop(i, string, -80, -80)
                break;
            case -18:
                animateBishop(i, string, -160, -160)
                break;
            case -27:
                animateBishop(i, string, -240, -240)
                break;
            case -36:
                animateBishop(i, string, -320, -320)
                break;
            case -45:
                animateBishop(i, string, -400, -400)
                break;
            case -54:
                animateBishop(i, string, -480, -480)
                break;
            case -63:
                animateBishop(i, string, -560, -560)
                break;
            case 7:
                animateBishop(i, string, -80, 80)
                break;
            case 14:
                animateBishop(i, string, -160, 160)
                break;
            case 21: 
                animateBishop(i, string, -240, 240)
                break;
            case 28: 
                animateBishop(i, string, -320, 320)
                break;
            case 35: 
                animateBishop(i, string, -400, 400)
                break;
            case 42: 
                animateBishop(i, string, -480, 480)
                break;
            case -7:
                animateBishop(i, string, 80, -80)
                break;
            case -14:
                animateBishop(i, string, 160, -160)
                break;
            case -21: 
                animateBishop(i, string, 240, -240)
                break;
            case -28: 
                animateBishop(i, string, 320, -320)
                break;
            case -35: 
                animateBishop(i, string, 400, -400)
                break;
            case -42: 
                animateBishop(i, string, 480, -480)
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