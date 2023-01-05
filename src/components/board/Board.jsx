import blackKing from "../../images/king.png"

import "./board.sass"

const Board = () => {
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
                {arr1.map((a, i) => <div key={i + 1} className={i % 2 === 0 ? "board__white" : "board__black"}>{i + 1}</div>)}
                {arr2.map((a, i) => <div key={i + 9} className={i % 2 !== 0 ? "board__white" : "board__black"}>{i + 9}</div>)}
                {arr3.map((a, i) => <div key={i + 17} className={i % 2 === 0 ? "board__white" : "board__black"}>{i + 17}</div>)}
                {arr4.map((a, i) => <div key={i + 25} className={i % 2 !== 0 ? "board__white" : "board__black"}>{i + 25}</div>)}
                {arr5.map((a, i) => <div key={i + 33} className={i % 2 === 0 ? "board__white" : "board__black"}>{i + 33}</div>)}
                {arr6.map((a, i) => <div key={i + 41} className={i % 2 !== 0 ? "board__white" : "board__black"}>{i + 41}</div>)}
                {arr7.map((a, i) => <div key={i + 49} className={i % 2 === 0 ? "board__white" : "board__black"}>{i + 49}</div>)}
                {arr8.map((a, i) => <div key={i + 57} className={i % 2 !== 0 ? "board__white" : "board__black"}>{i + 57}</div>)}
            </div>
        )
    }

    return (
        renderBoard()
    )
}

export default Board