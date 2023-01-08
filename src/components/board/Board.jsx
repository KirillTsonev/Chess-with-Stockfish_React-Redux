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
        [1, 9, 17, 25, 33, 41, 49, 57],
        [2, 10, 18, 26, 34, 42, 50, 58], 
        [7, 15, 23, 31, 39, 47, 55, 63], 
        [8, 16, 24, 32, 40, 48, 56, 64]
    ]
    
    useEffect(() => {
        recordBoard()
    }, [])

    useEffect(() => {
        recordBoard()
    }, [pieceSquare])

    // const onSquareClick = (i) => {
    //     if ((!moveSquares.includes(i) && pieceSquare && !occupiedSquares.includes(i)) || i === pieceSquare) {
    //         setMoveSquares([])
    //         setPieceSquare(null)
    //         
    //     }
    //     if (activePiece === "playerKnight1" && moveSquares.includes(i)) {
    //         moveKnight(i, playerKnight1, "playerKnight1", setPlayerKnight1)
    //     } else if (activePiece === "playerKnight2" && moveSquares.includes(i)) {
    //         moveKnight(i, playerKnight2 ,"playerKnight2", setPlayerKnight2)
    //     }
    // }

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
        const renderEntries = (a, i) => {
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
                case "pr1": case "pr2":
                    return (color === "white"
                                    ?
                                        <img src={whiteRook}
                                            key={a}
                                            alt="White Rook" 
                                            className="piece">
                                        </img>
                                    : 
                                        <img src={blackRook}
                                            key={a}
                                            alt="Black Rook" 
                                            className="piece">
                                        </img>)
                case "pk1":
                    return (color === "white"
                                    ?
                                        <img src={whiteKnight}
                                            key={a}
                                            alt="White Knight" 
                                            className="piece"
                                            style={activeStatePiece === "pk1"
                                                            ?
                                                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                            :
                                                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>
                                    : 
                                        <img src={blackKnight}
                                            key={a}
                                            alt="Black Knight" 
                                            className="piece"
                                            style={activeStatePiece === "pk1"
                                                ?
                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                :
                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>)
                case "pk2":
                    return (color === "white"
                                    ?
                                        <img src={whiteKnight}
                                            key={a}
                                            alt="White Knight" 
                                            className="piece"
                                            style={activeStatePiece === "pk2"
                                                ?
                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                :
                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>
                                    : 
                                        <img src={blackKnight}
                                            key={a}
                                            alt="Black Knight" 
                                            className="piece"
                                            style={activeStatePiece === "pk2"
                                                ?
                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                :
                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>)
                case "pb1": case "pb2":
                    return (color === "white"
                                    ?
                                        <img src={whiteBishop}
                                            key={a}
                                            alt="White Bishop" 
                                            className="piece">
                                        </img>
                                    : 
                                        <img src={blackBishop}
                                            key={a}
                                            alt="Black Bishop" 
                                            className="piece">
                                        </img>)
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
                    return (color === "white" 
                                    ?
                                        <img src={whitePawn}
                                            key={a}
                                            alt="White Pawn" 
                                            className="piece"
                                            style={activeStatePiece === "pp1"
                                                            ?
                                                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                            :
                                                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>
                                    :
                                        <img src={blackPawn}
                                            key={a}
                                            alt="Black Pawn" 
                                            className="piece"
                                            style={activeStatePiece === "pp1"
                                                            ?
                                                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                            :
                                                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                        </img>)
                case "pp2": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp2"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp2"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp3": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp3"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp3"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp4": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp4"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp4"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp5": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp5"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp5"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp6": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp6"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp6"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp7": 
                    return (color === "white" 
                                        ?
                                            <img src={whitePawn}
                                                key={a}
                                                alt="White Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp7"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>
                                        :
                                            <img src={blackPawn}
                                                key={a}
                                                alt="Black Pawn" 
                                                className="piece"
                                                style={activeStatePiece === "pp7"
                                                                ?
                                                                {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                                                :
                                                                {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                                            </img>)
                case "pp8":
                    return (color === "white" 
                    ?
                        <img src={whitePawn}
                            key={a}
                            alt="White Pawn" 
                            className="piece"
                            style={activeStatePiece === "pp8"
                                            ?
                                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                            :
                                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                        </img>
                    :
                        <img src={blackPawn}
                            key={a}
                            alt="Black Pawn" 
                            className="piece"
                            style={activeStatePiece === "pp8"
                                            ?
                                            {transform: `translate(${moveVar[0]}px, ${moveVar[1]}px)`} 
                                            :
                                            {transform: `translate(0px, 0px)` , transition: `all ${animationSpeed}s`}}>
                        </img>)
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