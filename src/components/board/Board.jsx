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
import { useSelector } from "react-redux"

import "./board.sass"

const Board = () => {
    const selectColor = state => state.color
    const color = useSelector(selectColor)

    const onClick = () => {
        
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
                {arr1.map((a, i) => <div key={i + 1} className={i % 2 === 0 ? "white" : "black"}>
                    {i + 1}
                </div>)}
                {arr2.map((a, i) => <div key={i + 9} className={i % 2 !== 0 ? "white" : "black"}>
                    {i + 9}
                </div>)}
                {arr3.map((a, i) => <div key={i + 17} className={i % 2 === 0 ? "white" : "black"}>
                    {i + 17}
                </div>)}
                {arr4.map((a, i) => <div key={i + 25} className={i % 2 !== 0 ? "white" : "black"}>
                    {i + 25}
                </div>)}
                {arr5.map((a, i) => <div key={i + 33} className={i % 2 === 0 ? "white" : "black"}>
                    {i + 33}
                </div>)}
                {arr6.map((a, i) => <div key={i + 41} className={i % 2 !== 0 ? "white" : "black"}>
                    {i + 41}
                </div>)}
                {arr7.map((a, i) => <div key={i + 49} className={i % 2 === 0 ? "white" : "black"}>
                    {i + 49}
                    {color === "white" ? <img className="piece" src={whitePawn} alt="White Pawn"></img> : null}
                    {color === "black" ? <img className="piece" src={blackPawn} alt="Black Pawn"></img> : null}
                </div>)}
                {arr8.map((a, i) => <div key={i + 57} className={i % 2 !== 0 ? "white" : "black"}>
                    {i + 57}
                    {color === "white" && i + 57 === 61 ? <img className="piece" src={whiteKing} alt="White King"></img> : null}
                    {color === "white" && i + 57 === 60 ? <img className="piece" src={whiteQueen} alt="White Queen"></img> : null}
                    {color === "white" && (i + 57 === 57 || i + 57 === 64) ? <img className="piece" src={whiteRook} alt="White Rook"></img> : null}
                    {color === "white" && (i + 57 === 59 || i + 57 === 62) ? <img className="piece" src={whiteBishop} alt="White Bishop"></img> : null}
                    {color === "white" && (i + 57 === 58 || i + 57 === 63) ? <img className="piece" src={whiteKnight} alt="White Knight"></img> : null}
                    {color === "black" && i + 57 === 60 ? <img className="piece" src={blackKing} alt="Black King"></img> : null}
                    {color === "black" && i + 57 === 61 ? <img className="piece" src={blackQueen} alt="Black Queen"></img> : null}
                    {color === "black" && (i + 57 === 57 || i + 57 === 64) ? <img className="piece" src={blackRook} alt="Black Rook"></img> : null}
                    {color === "black" && (i + 57 === 59 || i + 57 === 62) ? <img className="piece" src={blackBishop} alt="Black Bishop"></img> : null}
                    {color === "black" && (i + 57 === 58 || i + 57 === 63) ? <img className="piece" src={blackKnight} alt="Black Knight"></img> : null}
                </div>)}
            </div>
        )
    }

    return (
        <div className="container">
            {renderBoard()}
        </div>
    )
}

export default Board