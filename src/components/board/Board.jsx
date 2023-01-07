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

import store from "../redux/store"

import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"

import "./board.sass"

const Board = () => {
    // const [activePiece, setActivePiece] = useState("")
    const [moveSquares, setMoveSquares] = useState([])
    const [pieceSquare, setPieceSquare] = useState(null)
    const [occupiedSquares, setOccupiedSquares] = useState([])
    const [emptySquares, setEmptySquares] = useState([])
    const [playerSquares, setPlayerSquares] = useState([])
    const [enemySquares, setEnemySquares] = useState([])
    // const [knightLimit, setKnightLimit] = useState([])
    const [playerKnight1, setPlayerKnight1] = useState([0, 0])
    const [playerKnight2, setPlayerKnight2] = useState([0, 0])

    const selectColor = state => state.color
    const selectBoard = state => state.board
    const selectPiece = state => state.activePiece
    const board = useSelector(selectBoard)
    const color = useSelector(selectColor)
    const activePiece = useSelector(selectPiece)
    const boardEntries = Object.entries(board)

    const recordBoard = () => {
        const asArray = Object.entries(board)

        const enemyReg = /^o/
        const filteredEnemy = asArray.filter(([key, value]) => enemyReg.test(key))
        const justEnemy = Object.fromEntries(filteredEnemy)

        const playerReg = /^p/
        const filteredPlayer = asArray.filter(([key, value]) => playerReg.test(key))
        const justPlayer = Object.fromEntries(filteredPlayer)

        const emptyReg = /empty/
        const filteredEmpty = asArray.filter(([key, value]) => emptyReg.test(key))
        const filteredOccupied = asArray.filter(([key, value]) => !emptyReg.test(key))
        const justEmpty = Object.fromEntries(filteredEmpty)
        const justOccupied = Object.fromEntries(filteredOccupied)

        setEnemySquares(Object.values(justEnemy))
        setPlayerSquares(Object.values(justPlayer))
        setEmptySquares(Object.values(justEmpty))
        setOccupiedSquares(Object.values(justOccupied))
    }
    
    useEffect(() => {
        recordBoard()

        // const arrKnightLimit = []

        // for (let i = 1; i < 58; i += 8) {
        //     arrKnightLimit.push(i)
        //     arrKnightLimit.push(i + 1)
        //     arrKnightLimit.push(i + 6)
        //     arrKnightLimit.push(i + 7)
        //     setKnightLimit(arrKnightLimit)
        // }
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
            <div className="container">
                <div className="board">
                    {arr1.map((a, i) => <div key={i + 1} className={`${i % 2 === 0 ? "white" : "black"} ${i + 1 === pieceSquare ? "highlight" : null}`}>
                        {moveSquares.includes(i + 1) ? <div className="activeSquare"></div> : null}
                        {/* {color === "white" && i + 1 === 5 ? <img className="piece" src={blackKing} alt="Black King"></img> : null}
                        {color === "white" && i + 1 === 4 ? <img className="piece" src={blackQueen} alt="Black Queen"></img> : null}
                        {color === "white" && (i + 1 === 1 || i + 1 === 8) ? <img className="piece" src={blackRook} alt="Black Rook"></img> : null}
                        {color === "white" && (i + 1 === 3 || i + 1 === 6) ? <img className="piece" src={blackBishop} alt="Black Bishop"></img> : null}
                        {color === "white" && (i + 1 === 2 || i + 1 === 7) ? <img className="piece" src={blackKnight} alt="Black Knight" onClick={(e) => onPieceClick("knight", i + 1, e)}></img> : null}
                        {color === "black" && i + 1 === 4 ? <img className="piece" src={whiteKing} alt="White King"></img> : null}
                        {color === "black" && i + 1 === 5 ? <img className="piece" src={whiteQueen} alt="White Queen"></img> : null}
                        {color === "black" && (i + 1 === 1 || i + 1 === 8) ? <img className="piece" src={whiteRook} alt="White Rook"></img> : null}
                        {color === "black" && (i + 1 === 3 || i + 1 === 6) ? <img className="piece" src={whiteBishop} alt="White Bishop"></img> : null}
                        {color === "black" && (i + 1 === 2 || i + 1 === 7) ? <img className="piece" src={whiteKnight} alt="White Knight"></img> : null} */}
                    </div>)}

                    {arr2.map((a, i) => <div key={i + 9} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 9 === pieceSquare ? "highlight" : null}`}>
                        {moveSquares.includes(i + 9) ? <div className="activeSquare"></div> : null}
                        {/* {color === "white" ? <img className="piece" src={blackPawn} alt="Black Pawn" onClick={() => onPieceClick("pawn", i + 9)}></img> : null}
                        {color === "black" ? <img className="piece" src={whitePawn} alt="White Pawn"></img> : null} */}
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
                        {/* {color === "white" ? <img className="piece" src={whitePawn} alt="White Pawn" onClick={() => onPieceClick("pawn", i + 49)}></img> : null}
                        {color === "black" ? <img className="piece" src={blackPawn} alt="Black Pawn"></img> : null} */}
                    </div>)}

                    {arr8.map((a, i) => <div key={i + 57} className={`${i % 2 !== 0 ? "white" : "black"} ${i + 57 === pieceSquare ? "highlight" : null}`} >
                        {moveSquares.includes(i + 57) ? <div className="activeSquare"></div> : null}
                        {/* {color === "white" && i + 57 === 61 ? <img className="piece" src={whiteKing} alt="White King"></img> : null}
                        {color === "white" && i + 57 === 60 ? <img className="piece" src={whiteQueen} alt="White Queen"></img> : null}
                        {color === "white" && (i + 57 === 57 || i + 57 === 64) ? <img className="piece" src={whiteRook} alt="White Rook"></img> : null}
                        {color === "white" && (i + 57 === 59 || i + 57 === 62) ? <img className="piece" src={whiteBishop} alt="White Bishop"></img> : null} */}

                        {/* {color === "white" && (i + 57 === 58) ? <div className="piece" onClick={() => onSquareClick(i + 57)}>
                            <img src={whiteKnight}
                                alt="White Knight" 
                                onClick={() => onPieceClick("playerKnight1", board.pk1)}
                                style={{transform: `translate(${playerKnight1[0]}px, ${playerKnight1[1]}px)`}}>
                            </img>
                        </div> : null} */}

                        {/* {color === "white" && (i + 57 === 63) ? <div className="piece" onClick={() => onSquareClick(i + 57)}>
                            <img src={whiteKnight} 
                                alt="White Knight" 
                                onClick={() => onPieceClick("playerKnight2", board.pk2)}
                                style={{transform: `translate(${playerKnight2[0]}px, ${playerKnight2[1]}px)`}}>
                            </img>
                        </div> : null} */}

                        {/* {color === "black" && i + 57 === 60 ? <img className="piece" src={blackKing} alt="Black King"></img> : null}
                        {color === "black" && i + 57 === 61 ? <img className="piece" src={blackQueen} alt="Black Queen"></img> : null}
                        {color === "black" && (i + 57 === 57 || i + 57 === 64) ? <img className="piece" src={blackRook} alt="Black Rook"></img> : null}
                        {color === "black" && (i + 57 === 59 || i + 57 === 62) ? <img className="piece" src={blackBishop} alt="Black Bishop"></img> : null} */}

                        {/* {color === "black" && (i + 57 === 58) ? <div className="piece">
                            <img src={blackKnight}
                                alt="Black Knight" 
                                onClick={() => onPieceClick("playerKnight1", board.pk1)}
                                style={{transform: `translate(${playerKnight1[0]}px, ${playerKnight1[1]}px)`}}>
                            </img>
                        </div> : null} */}

                        {/* {color === "black" && (i + 57 === 63) ? <div className="piece" >
                            <img src={blackKnight} 
                                alt="Black Knight" 
                                onClick={() => onPieceClick("playerKnight2", board.pk2)}
                                style={{transform: `translate(${playerKnight2[0]}px, ${playerKnight2[1]}px)`}}>
                            </img>
                        </div> : null} */}
                    </div>)}
                </div>
            </div>
        )
    }

    // const renderPieces = () => {
    //     return (
    //         <div className="piecesGrid">
    //             {color === "white" ?
    //                     <img src={whiteKnight}
    //                         alt="White Knight" 
    //                         onClick={() => onPieceClick("playerKnight1", board.pk1)}
    //                         className="piece playerKnight1"
    //                         style={{transform: `translate(${playerKnight1[0]}px, ${playerKnight1[1]}px)`}}>
    //                     </img>
    //             : null}

    //             {color === "white" ?
    //                 <img src={whiteKnight} 
    //                     alt="White Knight" 
    //                     onClick={() => onPieceClick("playerKnight2", board.pk2)}
    //                     className="piece playerKnight2"
    //                     style={{transform: `translate(${playerKnight2[0]}px, ${playerKnight2[1]}px)`}}>
    //                 </img>
    //             : null}
    //         </div>
    //     )
    // }

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
                                            style={{transform: `translate(${playerKnight1[0]}px, ${playerKnight1[1]}px)`}}>
                                        </img>
                                    : 
                                        <img src={blackKnight}
                                            key={a}
                                            alt="Black Knight" 
                                            className="piece"
                                            style={{transform: `translate(${playerKnight1[0]}px, ${playerKnight1[1]}px)`}}>
                                        </img>)
                case "pk2":
                    return (color === "white"
                                    ?
                                        <img src={whiteKnight}
                                            key={a}
                                            alt="White Knight" 
                                            className="piece"
                                            style={{transform: `translate(${playerKnight2[0]}px, ${playerKnight2[1]}px)`}}>
                                        </img>
                                    : 
                                        <img src={blackKnight}
                                            key={a}
                                            alt="Black Knight" 
                                            className="piece"
                                            style={{transform: `translate(${playerKnight2[0]}px, ${playerKnight2[1]}px)`}}>
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
                case "pp1": case "pp2": case "pp3": case "pp4": case "pp5": case "pp6": case "pp7": case "pp8":
                    return (color === "white" 
                                    ?
                                        <img src={whitePawn}
                                            key={a}
                                            alt="White Pawn" 
                                            className="piece">
                                        </img>
                                    :
                                        <img src={blackPawn}
                                            key={a}
                                            alt="Black Pawn" 
                                            className="piece">
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
                                            {i + 1}
                                    </div>)}
                                    
                {arr2.map((a, i) => <div key={i + 9}
                                        onClick={() => onSquareClick(i + 9, boardEntries[i + 8][0])}
                                        className="movementSquare">
                                            {i + 9}
                                    </div>)}

                {arr3.map((a, i) => <div key={i + 17} 
                                        onClick={() => onSquareClick(i + 17, boardEntries[i + 16][0])}
                                        className="movementSquare">
                                            {i + 17}
                                    </div>)}

                {arr4.map((a, i) => <div key={i + 25}
                                        onClick={() => onSquareClick(i + 25, boardEntries[i + 24][0])}
                                        className="movementSquare">
                                            {i + 25}
                                    </div>)}

                {arr5.map((a, i) => <div key={i + 33} 
                                        onClick={() => onSquareClick(i + 33, boardEntries[i + 32][0])}
                                        className="movementSquare">
                                            {i + 33}
                                    </div>)}

                {arr6.map((a, i) => <div key={i + 41}
                                        onClick={() => onSquareClick(i + 41, boardEntries[i + 40][0])}
                                        className="movementSquare">
                                            {i + 41}
                                    </div>)}

                {arr7.map((a, i) => <div key={i + 49}
                                        onClick={() => onSquareClick(i + 49, boardEntries[i + 48][0])}
                                        className="movementSquare">
                                            {i + 49}
                                    </div>)}

                {arr8.map((a, i) => <div key={i + 57} 
                                        onClick={() => onSquareClick(i + 57, boardEntries[i + 56][0])}
                                        className="movementSquare">
                                            {i + 57}
                                    </div>)}
            </div>
        )
    }

    const moveKnight = (i, piece, setter, string) => {
        switch (pieceSquare - i) {
            case -17:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] + 80, piece[1] + 160])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case -15:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] - 80, piece[1] + 160])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case -10:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] + 160, piece[1] + 80])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case -6:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] - 160, piece[1] + 80])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case 6:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] + 160, piece[1] - 80])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case 10:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] - 160, piece[1] - 80])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case 15:
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                // setter([piece[0] + 80, piece[1] - 160])
                setMoveSquares([])
                setPieceSquare(null)
                store.dispatch({
                    type: string,
                    payload: i
                })
                recordBoard()
                break;
            case 17:
                setter([piece[0] - 80, piece[1] - 160])
                store.dispatch({
                    type: "newSquare",
                    payload: i
                })
                store.dispatch({
                    type: string,
                    payload: string
                })
                // setPlayerKnight1([0, 0])
                recordBoard()
                setMoveSquares([])
                setPieceSquare(null)
                break;
            default:
                break;
        }
    }

    function onSquareClick(i, piece) {
        if (playerSquares.includes(i)) {
            setPieceSquare(i)

            if (piece === "pawn") {
                setMoveSquares([i - 8, i - 16])
            }

            if (piece === "pk1" || piece === "pk2") {               
                let arr = [i - 17, i - 15, i - 10, i - 6, i + 6, i + 10, i + 15, i + 17]
                for (const number of arr) {
                    if (occupiedSquares.includes(number)) {
                        arr = arr.filter(x => x !== number)
                        setMoveSquares(arr)
                    }
                }
            }
            
            store.dispatch({
                type: "activePiece",
                payload: piece
            })

            store.dispatch({
                type: "oldSquare",
                payload: i
            })
        }

        if (activePiece === "pk1" && moveSquares.includes(i)) {
            moveKnight(i, playerKnight1, setPlayerKnight1, "pk1")
        } else if (activePiece === "pk2" && moveSquares.includes(i)) {
            moveKnight(i, playerKnight2, setPlayerKnight2, "pk2")
        }
        
    }

    return (
        <div>
            {renderBoard()}
            {renderPieces()}
            {renderMovement()}
        </div>
    )
}

export default Board