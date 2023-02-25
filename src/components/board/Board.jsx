/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux"
import { useEffect } from "react"

import "./board.sass"

const Board = () => {
    const board = useSelector(state => state.board.board)
    const highlightMove = useSelector(state => state.board.highlightMove)
    const moveSquares = useSelector(state => state.board.moveSquares)
    const pieceSquare = useSelector(state => state.board.pieceSquare)

    const sandbox = useSelector(state => state.options.sandbox)
    const color = useSelector(state => state.options.color)

    const coordinates = useSelector(state => state.behavior.coordinates)

    const currentMove = useSelector(state => state.progression.currentMove)

    let boardEntries = Object.entries(board)

    let filteredOccupiedRender = boardEntries.filter(([key, value]) => !/empty/.test(key))
    let justOccupiedRender = Object.fromEntries(filteredOccupiedRender)
    let occupiedSquaresRender =  Object.values(justOccupiedRender).map(a => a = a[0])

    const recordBoard = () => {  
        filteredOccupiedRender = boardEntries.filter(([key, value]) => !/empty/.test(key))
        justOccupiedRender = Object.fromEntries(filteredOccupiedRender)
        occupiedSquaresRender = Object.values(justOccupiedRender).map(a => a = a[0])
    }

    useEffect(() => {
        recordBoard()
    }, [])

    useEffect(() => {
        recordBoard()
    }, [board])

    const renderBoard = () => {
        let letters = ["a", "b", "c", "d", "e", "f", "g", "h"]

        return (
            <div className="board">
                {letters.map((a, i) => <div key={i + 1 * 300} className={`${i % 2 === 0 ? "white" : "black"} 
                                                                          ${i + 1 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 1) && !occupiedSquaresRender.includes(i + 1) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 1) && occupiedSquaresRender.includes(i + 1) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 1 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 1) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseLetters">{letters[i]}</div> 
                        : null}

                    {coordinates 
                        && i + 1 === 8 
                        && color === "white" 
                        ? <div className="numbers">8</div> 
                        : null}

                    {coordinates 
                        && i + 1 === 8 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">1</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">8</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 9 * 300} className={`${i % 2 !== 0 ? "white" : "black"} 
                                                                          ${i + 9 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 9) && !occupiedSquaresRender.includes(i + 9) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 9) && occupiedSquaresRender.includes(i + 9) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 9 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 9) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 9 === 16 
                        && color === "white" 
                        ? <div className="numbers">7</div> 
                        : null}

                    {coordinates 
                        && i + 9 === 16 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">2</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">7</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 17 * 300} className={`${i % 2 === 0 ? "white" : "black"} 
                                                                           ${i + 17 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 17) && !occupiedSquaresRender.includes(i + 17) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 17) && occupiedSquaresRender.includes(i + 17) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 17 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 17) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 17 === 24 
                        && color === "white" 
                        ? <div className="numbers">6</div> 
                        : null}

                    {coordinates 
                        && i + 17 === 24 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">3</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">6</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 25 * 300} className={`${i % 2 !== 0 ? "white" : "black"} 
                                                                           ${i + 25 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 25) && !occupiedSquaresRender.includes(i + 25) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 25) && occupiedSquaresRender.includes(i + 25) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 25 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 25) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 25 === 32 
                        && color === "white" 
                        ? <div className="numbers">5</div> 
                        : null}

                    {coordinates 
                        && i + 25 === 32 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">4</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">5</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 33 * 300} className={`${i % 2 === 0 ? "white" : "black"} 
                                                                           ${i + 33 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 33) && !occupiedSquaresRender.includes(i + 33) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 33) && occupiedSquaresRender.includes(i + 33) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 33 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 33) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 33 === 40 
                        && color === "white" 
                        ? <div className="numbers">4</div> 
                        : null}

                    {coordinates 
                        && i + 33 === 40 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">5</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">4</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 41 * 300} className={`${i % 2 !== 0 ? "white" : "black"} 
                                                                           ${i + 41 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 41) && !occupiedSquaresRender.includes(i + 41) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 41) && occupiedSquaresRender.includes(i + 41) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 41 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 41) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 41 === 48 
                        && color === "white" 
                        ? <div className="numbers">3</div> 
                        : null}

                    {coordinates 
                        && i + 41 === 48 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">6</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">3</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 49 * 300} className={`${i % 2 === 0 ? "white" : "black"} 
                                                                           ${i + 49 === pieceSquare ? "highlight" : null}`}>
                    {moveSquares.includes(i + 49) && !occupiedSquaresRender.includes(i + 49) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 49) && occupiedSquaresRender.includes(i + 49) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 49 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 49) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates 
                        && i + 49 === 56 
                        && color === "white" 
                        ? <div className="numbers">2</div> 
                        : null}

                    {coordinates 
                        && i + 49 === 56 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">7</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">2</div> 
                        : null}
                </div>)}

                {letters.map((a, i) => <div key={i + 57 * 300} className={`${i % 2 !== 0 ? "white" : "black"} 
                                                                           ${i + 57 === pieceSquare ? "highlight" : null}`} >
                    {moveSquares.includes(i + 57) && !occupiedSquaresRender.includes(i + 57) 
                        ? <div className="activeSquare"></div> 
                        : null}

                    {moveSquares.includes(i + 57) && occupiedSquaresRender.includes(i + 57) 
                        ? <div className="enemySquare"><div></div></div> 
                        : null}

                    {(highlightMove.slice(-1)[0] === i + 57 && !currentMove) 
                        || (currentMove && highlightMove[currentMove - 1] === i + 57) 
                        ? <div className="lastMadeMove"></div> 
                        : null}

                    {coordinates && color === "white" 
                        ? <div className="letters">{letters[i]}</div> 
                        : null}

                    {coordinates 
                        && color === "black" 
                        && sandbox 
                        ? <div className="letters">{letters[7 - i]}</div> 
                        : null}

                    {coordinates 
                        && i + 57 === 64 
                        && color === "white" 
                        ? <div className="numbers">1</div> 
                        : null}

                    {coordinates 
                        && i + 57 === 64 
                        && color === "black" 
                        && sandbox 
                        ? <div className="numbers">8</div> 
                        : null}

                    {coordinates 
                        && i === 0 
                        && color === "black" 
                        && !sandbox 
                        ? <div className="reverseNumbers">1</div> 
                        : null}
                </div>)}
            </div>
        )
    }

    return (
        <div>
            {renderBoard()}
        </div>
    )
}

export default Board