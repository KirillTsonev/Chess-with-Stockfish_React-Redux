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
    const castlingMoved = useSelector(state => state.castlingMoved)

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

        const renderRoyals = (a, src, alt, piece) => {
            return (
                <img src={src}
                    key={a}
                    alt={alt}
                    className="piece"
                    style={activeStatePiece === `${piece}`
                        ?
                        {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                        :
                        {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                </img>
            )
        }

        const renderEntries = (a) => {
            switch (a) {
                case "or1": 
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook", "or1")
                case "or2":
                    return renderEachPiece(a, blackRook, whiteRook, "Black Rook", "White Rook", "or2")
                case "ok1": 
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight", "ok1")
                case "ok2":
                    return renderEachPiece(a, blackKnight, whiteKnight, "Black Knight", "White Knight", "ok2")
                case "ob1": 
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop", "ob1")
                case "ob2":
                    return renderEachPiece(a, blackBishop, whiteBishop, "Black Bishop", "White Bishop", "ob2") 
                case "okw":
                    return renderRoyals(a, whiteKing, "White King", "okw") 
                case "okb":
                    return renderRoyals(a, blackKing, "Black King", "okb") 
                case "oqw":
                    return renderRoyals(a, whiteQueen, "White Queen", "oqw") 
                case "oqb":
                    return renderRoyals(a, blackQueen, "Black Queen", "oqb") 
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
                case "pk1":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "pk1")
                case "pk2":
                    return renderEachPiece(a, whiteKnight, blackKnight, "White Knight", "Black Knight", "pk2")
                case "pb1": 
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb1")
                case "pb2":
                    return renderEachPiece(a, whiteBishop, blackBishop, "White Bishop", "Black Bishop", "pb2")
                case "pkw":
                    return renderRoyals(a, whiteKing, "White King", "pkw")
                case "pkb":
                    return renderRoyals(a, blackKing, "Black King", "pkb")
                case "pqw":
                    return renderRoyals(a, whiteQueen, "White Queen", "pqw")
                case "pqb":
                    return renderRoyals(a, blackQueen, "Black Queen", "pqb")
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

            const checkArrays = (array) => {
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

            if (piece === "pk1" || piece === "pk2") {   
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

            if (/^pr/.test(piece)) {
                checkArrays(rookMoves)
            }

            if (piece === "pb1") {
                checkArrays(blackBishopMoves)
            }

            if (piece === "pb2") {
                checkArrays(whiteBishopMoves)
            }

            if (piece === "pqw" || piece === "pqb") {
                let arr = []
    
                    for (const subArr of rookMoves) {
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
                        }
                    }

                    for (const subArr of blackBishopMoves) {
                        if (subArr.includes(i)) {
                            for (const subArr of blackBishopMoves) {
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
                                }
                            }
                        }
                    }
                    
                    for (const subArr of whiteBishopMoves) {
                        if (subArr.includes(i)) {
                            for (const subArr of whiteBishopMoves) {
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
                                }
                            }
                        }
                    }

                setMoveSquares(arr)
            }

            if (piece === "pkw" || piece === "pkb") {
                let arr = []
                
                if (castlingMoved[piece]) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2].filter(a => a < 65)
                } else {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9].filter(a => a < 65)
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
            moveRook(i, "pr1")
        } else if (activePiece === "pr2" && moveSquares.includes(i)) {
            moveRook(i, "pr2")
        }

        if (activePiece === "pqw" && moveSquares.includes(i)) {
            moveQueen(i, "pqw")
        } else if (activePiece === "pqb" && moveSquares.includes(i)) {
            moveQueen(i, "pqb")
        }

        if (activePiece === "pkw" && moveSquares.includes(i)) {
            moveKing(i, "pkw")
        } else if (activePiece === "pkb" && moveSquares.includes(i)) {
            moveKing(i, "pkb")
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
            payload: string
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

    const animateRook = (i, string, num1, num2) => {
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
            type: "castlingMoved",
            payload: string
        })
        recordBoard()
        setMoveSquares([])
        setPieceSquare(null)
    }

    const moveRook = (i, string) => {
        switch (pieceSquare - i) {
            case 8:
                animateRook(i, string, 0, 80)
                break;
            case 16:
                animateRook(i, string, 0, 160)
                break;
            case 24:
                animateRook(i, string, 0, 240)
                break;
            case 32:
                animateRook(i, string, 0, 320)
                break;
            case 40:
                animateRook(i, string, 0, 400)
                break;
            case 48:
                animateRook(i, string, 0, 480)
                break;
            case 56:
                animateRook(i, string, 0, 560)
                break;
            case -8:
                animateRook(i, string, 0, -80)
                break;
            case -16:
                animateRook(i, string, 0, -160)
                break;
            case -24:
                animateRook(i, string, 0, -240)
                break;
            case -32:
                animateRook(i, string, 0, -320)
                break;
            case -40:
                animateRook(i, string, 0, -400)
                break;
            case -48:
                animateRook(i, string, 0, -480)
                break;
            case -56:
                animateRook(i, string, 0, -560)
                break;
            case 1:
                animateRook(i, string, 80, 0)
                break;
            case 2:
                animateRook(i, string, 160, 0)
                break;
            case 3:
                animateRook(i, string, 240, 0)
                break;
            case 4:
                animateRook(i, string, 320, 0)
                break;
            case 5:
                animateRook(i, string, 400, 0)
                break;
            case 6:
                animateRook(i, string, 480, 0)
                break;
            case 7:
                animateRook(i, string, 560, 0)
                break;
            case -1:
                animateRook(i, string, -80, 0)
                break;
            case -2:
                animateRook(i, string, -160, 0)
                break;
            case -3:
                animateRook(i, string, -240, 0)
                break;
            case -4:
                animateRook(i, string, -320, 0)
                break;
            case -5:
                animateRook(i, string, -400, 0)
                break;
            case -6:
                animateRook(i, string, -480, 0)
                break;
            case -7:
                animateRook(i, string, -560, 0)
                break;

            default:
                break;
        }
    }

    const animateQueen = (i, string, num1, num2) => {
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

    const moveQueen = (i, string) => {
        if ((knightLimits[0].includes(pieceSquare) || knightLimits[3].includes(pieceSquare)) && (knightLimits[0].includes(i) || knightLimits[3].includes(i))) {
            switch (pieceSquare - i) {
                case -7:
                    animateQueen(i, string, -560, 0)
                    break;
                case 7:
                    animateQueen(i, string, 560, 0)
                    break;
                default:
                    break;
            }
        } else {
            switch (pieceSquare - i) {
                case -7:
                    animateQueen(i, string, 80, -80)
                    break;
                case 7:
                    animateQueen(i, string, -80, 80)
                    break;
                default:
                    break;
            }
        }
        switch (pieceSquare - i) {                                                   
            case 9:
                animateQueen(i, string, 80, 80)
                break;
            case 18:
                animateQueen(i, string, 160, 160)
                break;
            case 27:
                animateQueen(i, string, 240, 240)
                break;
            case 36:
                animateQueen(i, string, 320, 320)
                break;
            case 45:
                animateQueen(i, string, 400, 400)
                break;
            case 54:
                animateQueen(i, string, 480, 480)
                break;
            case 63:
                animateQueen(i, string, 560, 560)
                break;
            case -9: 
                animateQueen(i, string, -80, -80)
                break;
            case -18:
                animateQueen(i, string, -160, -160)
                break;
            case -27:
                animateQueen(i, string, -240, -240)
                break;
            case -36:
                animateQueen(i, string, -320, -320)
                break;
            case -45:
                animateQueen(i, string, -400, -400)
                break;
            case -54:
                animateQueen(i, string, -480, -480)
                break;
            case -63:
                animateQueen(i, string, -560, -560)
                break;
            case 14:
                animateQueen(i, string, -160, 160)
                break;
            case 21: 
                animateQueen(i, string, -240, 240)
                break;
            case 28: 
                animateQueen(i, string, -320, 320)
                break;
            case 35: 
                animateQueen(i, string, -400, 400)
                break;
            case 42: 
                animateQueen(i, string, -480, 480)
                break;
            case -14:
                animateQueen(i, string, 160, -160)
                break;
            case -21: 
                animateQueen(i, string, 240, -240)
                break;
            case -28: 
                animateQueen(i, string, 320, -320)
                break;
            case -35: 
                animateQueen(i, string, 400, -400)
                break;
            case -42: 
                animateQueen(i, string, 480, -480)
                break;
            case 8:
                animateQueen(i, string, 0, 80)
                break;
            case 16:
                animateQueen(i, string, 0, 160)
                break;
            case 24:
                animateQueen(i, string, 0, 240)
                break;
            case 32:
                animateQueen(i, string, 0, 320)
                break;
            case 40:
                animateQueen(i, string, 0, 400)
                break;
            case 48:
                animateQueen(i, string, 0, 480)
                break;
            case 56:
                animateQueen(i, string, 0, 560)
                break;
            case -8:
                animateQueen(i, string, 0, -80)
                break;
            case -16:
                animateQueen(i, string, 0, -160)
                break;
            case -24:
                animateQueen(i, string, 0, -240)
                break;
            case -32:
                animateQueen(i, string, 0, -320)
                break;
            case -40:
                animateQueen(i, string, 0, -400)
                break;
            case -48:
                animateQueen(i, string, 0, -480)
                break;
            case -56:
                animateQueen(i, string, 0, -560)
                break;
            case 1:
                animateQueen(i, string, 80, 0)
                break;
            case 2:
                animateQueen(i, string, 160, 0)
                break;
            case 3:
                animateQueen(i, string, 240, 0)
                break;
            case 4:
                animateQueen(i, string, 320, 0)
                break;
            case 5:
                animateQueen(i, string, 400, 0)
                break;
            case 6:
                animateQueen(i, string, 480, 0)
                break;
            case -1:
                animateQueen(i, string, -80, 0)
                break;
            case -2:
                animateQueen(i, string, -160, 0)
                break;
            case -3:
                animateQueen(i, string, -240, 0)
                break;
            case -4:
                animateQueen(i, string, -320, 0)
                break;
            case -5:
                animateQueen(i, string, -400, 0)
                break;
            case -6:
                animateQueen(i, string, -480, 0)
                break;
            default:
                break;
        }
    }

    const animateKing = (i, string, num1, num2) => {
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
            type: "castlingMoved",
            payload: string
        })
        recordBoard()
        setMoveSquares([])
        setPieceSquare(null)
    }

    const moveKing = (i, string) => {
        //[i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2]
        switch (pieceSquare - i) {
            case 9:
                animateKing(i, string, 80, 80)
                break;
            case 8:
                animateKing(i, string, 0, 80)
                break;
            case 7:
                animateKing(i, string, -80, 80)
                break;
            case 1:
                animateKing(i, string, 80, 0)
                break;
            case -1:
                animateKing(i, string, -80, 0)
                break;
            case -7:
                animateKing(i, string, 80, -80)
                break;
            case -8:
                animateKing(i, string, 0, -80)
                break;
            case -9:
                animateKing(i, string, -80, -80)
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