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
    const [activeStatePiece, setActiveStatePiece] = useState("")
    const [moveSquares, setMoveSquares] = useState([])
    const [pieceSquare, setPieceSquare] = useState(null)
    const [occupiedSquares, setOccupiedSquares] = useState([])
    // const [emptySquares, setEmptySquares] = useState([])
    const [playerSquares, setPlayerSquares] = useState([])
    const [enemySquares, setEnemySquares] = useState([])
    const [moveVar, setMoveVar] = useState([0, 0])
    const [lastMadeMove, setLastMadeMove] = useState([])
    const [enemyKingAttacked, setEnemyKingAttacked] = useState(false)
    const [playerKingAttacked, setPlayerKingAttacked] = useState(false)

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
    let captureSound = new Audio(captureSoundFile)
    let castlingSound = new Audio(castlingSoundFile)
    let checkSound = new Audio(checkSoundFile)

    let attackedArr = [[], [], [], [], [], [], [], [], []]

    const recordBoard = () => {
        const filteredEnemy = boardEntries.filter(([key, value]) => /^o/.test(key))
        const justEnemy = Object.fromEntries(filteredEnemy)

        const filteredPlayer = boardEntries.filter(([key, value]) => /^p/.test(key))
        const justPlayer = Object.fromEntries(filteredPlayer)

        // const filteredEmpty = boardEntries.filter(([key, value]) => /empty/.test(key))
        const filteredOccupied = boardEntries.filter(([key, value]) => !/empty/.test(key))
        // const justEmpty = Object.fromEntries(filteredEmpty)
        const justOccupied = Object.fromEntries(filteredOccupied)

        setEnemySquares(Object.values(justEnemy))
        setPlayerSquares(Object.values(justPlayer))
        // setEmptySquares(Object.values(justEmpty))
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

    const checkArrays = (arrayChecked, i, arr) => {
        for (const subArr of arrayChecked) {
            if (subArr.includes(i)) {
                for (let j = i + 1; j <= Math.max(...subArr); j++) {
                    if (subArr.includes(j)) {
                        if (playerSquares.includes(j)) {
                            break
                        } else if (enemySquares.includes(j)) {
                            arr.push(j)
                            break
                        } else {
                            arr.push(j)
                        }
                    }
                }
                for (let j = i - 1; j >= Math.min(...subArr); j--) {
                    if (subArr.includes(j)) {
                        if (playerSquares.includes(j)) {
                            break
                        } else if (enemySquares.includes(j)) {
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

    const setKnightMoves = (i, arrMoves) => {    
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
            if (playerSquares.includes(number)) {
                arr = arr.filter(x => x !== number)
            }
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
                setKnightMoves(i, arr)
                setMoveSquares(arr)
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
                let arr = []
                checkArrays(rookMoves, i, arr)
                setMoveSquares(arr)
            }

            if (piece === "pb1") {
                let arr = []
                checkArrays(blackBishopMoves, i, arr)
                setMoveSquares(arr)
            }

            if (piece === "pb2") {
                let arr = []
                checkArrays(whiteBishopMoves, i, arr)
                setMoveSquares(arr)
            }

            if (piece === "pqw" || piece === "pqb") {
                let arr = []
                checkArrays(rookMoves, i, arr)
                checkArrays(blackBishopMoves, i, arr)
                checkArrays(whiteBishopMoves, i, arr)
                setMoveSquares(arr)
            }

            if (piece === "pkw" || piece === "pkb") {
                let arr = []
                
                if (castlingMoved[piece] && castlingMoved.pr2 && castlingMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2, i - 2].filter(a => a < 65)
                } else if (castlingMoved[piece] && castlingMoved.pr2) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i + 2].filter(a => a < 65)
                } else if (castlingMoved[piece] && castlingMoved.pr1) {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9, i - 2].filter(a => a < 65)
                } else if (knightLimits[0].includes(i)) {
                    arr = [i - 8, i - 7, i + 1, i + 8, i + 9].filter(a => a < 65)
                } else if (knightLimits[3].includes(i)) {
                    arr = [i - 9, i - 8, i - 1, i + 7, i + 8].filter(a => a < 65)
                } else {
                    arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9].filter(a => a < 65)
                }

                for (const number of arr) {
                    if (occupiedSquares.includes(number)) {
                        arr = arr.filter(x => x !== number)
                        if (!arr.includes(60) && pieceSquare === 61) {
                            arr = arr.filter(x => x !== 59)
                        }
                        if (!arr.includes(62) && pieceSquare === 61) {
                            arr = arr.filter(x => x !== 63)
                        }
                        setMoveSquares(arr)
                    } else {
                        setMoveSquares(arr)
                    }
                }
            }
        }

        if (activePiece === "ph1" && moveSquares.includes(i)) {
            setKnightMoves(i, attackedArr[7])
            moveKnight(i, "ph1")
            attackedArr[7] = []
        } else if (activePiece === "ph2" && moveSquares.includes(i)) {
            setKnightMoves(i, attackedArr[8])
            moveKnight(i, "ph2")
            attackedArr[8] = []
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
            checkArrays(blackBishopMoves, i, attackedArr[5])
            moveBishop(i, "pb1")
            attackedArr[5] = []
        } else if (activePiece === "pb2" && moveSquares.includes(i)) {
            checkArrays(whiteBishopMoves, i, attackedArr[6])
            moveBishop(i, "pb2")
            attackedArr[6] = []
        }

        if (activePiece === "pr1" && moveSquares.includes(i)) {
            checkArrays(rookMoves, i, attackedArr[3])
            moveRook(i, "pr1")
            attackedArr[3] = []
        } else if (activePiece === "pr2" && moveSquares.includes(i)) {
            checkArrays(rookMoves, i, attackedArr[4])
            moveRook(i, "pr2")
            attackedArr[4] = []
        }

        if (activePiece === "pqw" && moveSquares.includes(i)) {
            checkArrays(rookMoves, i, attackedArr[0])
            checkArrays(blackBishopMoves, i, attackedArr[1])
            checkArrays(whiteBishopMoves, i, attackedArr[2])
            moveQueen(i, "pqw")
            attackedArr[0] = []
            attackedArr[1] = []
            attackedArr[2] = []
        } else if (activePiece === "pqb" && moveSquares.includes(i)) {
            checkArrays(rookMoves, i, attackedArr[0])
            checkArrays(blackBishopMoves, i, attackedArr[1])
            checkArrays(whiteBishopMoves, i, attackedArr[2])
            moveQueen(i, "pqb")
            attackedArr[0] = []
            attackedArr[1] = []
            attackedArr[2] = []
        }

        if (activePiece === "pkw" && moveSquares.includes(i)) {
            moveKing(i, "pkw")
        } else if (activePiece === "pkb" && moveSquares.includes(i)) {
            moveKing(i, "pkb")
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
                type: "castlingMoved",
                payload: string
            })
        }

        setMoveVar([num1, num2])

        store.dispatch({
            type: "newSquare",
            payload: i
        })

        if (enemySquares.includes(i)) {
            if (attackedArr.flat().includes(board.okb) || attackedArr.flat().includes(board.okw)) {
                checkSound.play()
                setEnemyKingAttacked(true)
            } else if (!attackedArr.flat().includes(board.okb) || !attackedArr.flat().includes(board.okw)) {
                captureSound.play()
                setEnemyKingAttacked(false)
            } else {
                captureSound.play()
            }
            store.dispatch({
                type: string,
                payload: "takes"
            })
        } else {
            if (attackedArr.flat().includes(board.okb) || attackedArr.flat().includes(board.okw)) {
                checkSound.play()
                setEnemyKingAttacked(true)
            } else if (!attackedArr.flat().includes(board.okb) || !attackedArr.flat().includes(board.okw)) {
                moveSound.play()
                setEnemyKingAttacked(false)
            } else {
                moveSound.play()
            }
            store.dispatch({
                type: string,
            })
        }

        setLastMadeMove([i, null])
        setMoveSquares([])
        setPieceSquare(null)

        recordBoard()
    }  

    const moveKnight = (i, string) => {
        switch (pieceSquare - i) {
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

    const movePawn = (i, string) => {
        switch (pieceSquare - i) {
            case 8:
                animatePiece(i, string, 0, 80)
                break;
            case 16:
                animatePiece(i, string, 0, 160)
                break;
            default:
                break;
        }
    }

    const moveBishop = (i, string) => {
        switch (pieceSquare - i) {
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
        switch (pieceSquare - i) {
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
            switch (pieceSquare - i) {
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
            switch (pieceSquare - i) {
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
        switch (pieceSquare - i) {                                                   
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

    const animateCastling = (coor1, coor2, newSqKing, newSqRook, oldSq, piece, lastSq1, lastSq2) => {
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
            type: "castlingMoved",
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
        setLastMadeMove([lastSq1, lastSq2])
        setMoveSquares([])
        setPieceSquare(null)
    }

    const moveKing = (i, string) => {
        switch (pieceSquare - i) {
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
            case -2:
                animateCastling(-160, 0, 63, 64, 62, "pr2", 63, 62)
                break;
            case 2:
                animateCastling(160, 0, 59, 57, 60, "pr1", 59, 60)
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