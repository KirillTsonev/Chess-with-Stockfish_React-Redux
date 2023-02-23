import { useSelector } from "react-redux"
import { useState } from "react"

import store from "../redux/store"

import "./options.sass"

const Options = () => {
    const [multiplier, setMultipler] = useState(0)

    const options = useSelector(state => state.options)

    const setGameMode = (boolean) => {
        store.dispatch({
            type: "sandbox",
            payload: boolean
        })
        setMultipler(1)
    }

    const setColor = (color) => {
        store.dispatch({
            type: color
        })
        if (color === "color/black") {
            store.dispatch({
                type: "setBoard",
                payload: {
                    or1: [1, "h1"],
                    oh1: [2, "g1"],
                    ob1: [3, "f1"],
                    okw: [4, "e1"],
                    oqw1: [5, "d1"],
                    ob2: [6, "c1"],
                    oh2: [7, "b1"],
                    or2: [8, "a1"],
                    op1: [9, "h2"],
                    op2: [10, "g2"],
                    op3: [11, "f2"],
                    op4: [12, "e2"],
                    op5: [13, "d2"],
                    op6: [14, "c2"],
                    op7: [15, "b2"],
                    op8: [16, "a2"],
                    empty1: [17, "h3"],
                    empty2: [18, "g3"],
                    empty3: [19, "f3"],
                    empty4: [20, "e3"],
                    empty5: [21, "d3"],
                    empty6: [22, "c3"],
                    empty7: [23, "b3"],
                    empty8: [24, "a3"],
                    empty9: [25, "h4"],
                    empty10: [26, "g4"],
                    empty11: [27, "f4"],
                    empty12: [28, "e4"],
                    empty13: [29, "d4"],
                    empty14: [30, "c4"],
                    empty15: [31, "b4"],
                    empty16: [32, "a4"],
                    empty17: [33, "h5"],
                    empty18: [34, "g5"],
                    empty19: [35, "f5"],
                    empty20: [36, "e5"],
                    empty21: [37, "d5"],
                    empty22: [38, "c5"],
                    empty23: [39, "b5"],
                    empty24: [40, "a5"],
                    empty25: [41, "h6"],
                    empty26: [42, "g6"],
                    empty27: [43, "f6"],
                    empty28: [44, "e6"],
                    empty29: [45, "d6"],
                    empty30: [46, "c6"],
                    empty31: [47, "b6"],
                    empty32: [48, "a6"],
                    pp1: [49, "h7"],
                    pp2: [50, "g72"],
                    pp3: [51, "f7"],
                    pp4: [52, "e7"],
                    pp5: [53, "d7"],
                    pp6: [54, "c7"],
                    pp7: [55, "b7"],
                    pp8: [56, "a7"],
                    pr1: [57, "h8"],
                    ph1: [58, "g8"],
                    pb1: [59, "f8"],
                    pkb: [60, "e8"],
                    pqb1: [61, "d8"],
                    pb2: [62, "c8"],
                    ph2: [63, "b8"],
                    pr2: [64, "a8"],
                }
            })
        }
        setMultipler(2)
    }

    const setTime = (time, increment) => {
        store.dispatch({
            type: "setTime",
            payload: time
        })
        store.dispatch({
            type: "increment",
            payload: increment
        })
        store.dispatch({
            type: "optionsOff"
        })
    }

    return (
        <div className="options" style={options ? {display: "block"} : {display: "none"}}>
            {/* <div>choose opponent</div> */}
            <div className="options__outer">
                <div className="options__inner" style={{transform: `translateY(${multiplier * -250}px)`, transition: "all .5s"}}>
                    <div className="options__body">
                        <div className="options__qheader">Choose game mode <span className="options__question">?</span></div>
                        <div className="options__container">
                            <div className="options__choice" onClick={() => setGameMode(false)}>Against computer</div>
                            <div className="options__choice" onClick={() => setGameMode(true)}>Sandbox</div>
                        </div>
                    </div>
                    <div className="options__body">
                        <div className="options__qheader">Choose the color of your pieces</div>
                        <div className="options__container">
                            <div className="options__choice" onClick={() => setColor("color/white")}>White</div>
                            <div className="options__choice" onClick={() => setColor("color/black")}>Black</div>
                        </div>
                    </div>
                    <div className="options__body">
                        <div className="options__qheader">Choose the time control <span className="options__question">?</span></div>
                        <div className="options__container">
                            <div>
                                <div className="options__choice" onClick={() => setTime(600000, 0)}>10 + 0</div>
                                <div className="options__choice" onClick={() => setTime(300000, 0)}>5 + 0</div>
                                <div className="options__choice" onClick={() => setTime(180000, 0)}>3 + 0</div>
                            </div>
                            <div>
                                <div className="options__choice" onClick={() => setTime(600000, 3000)}>10 + 3</div>
                                <div className="options__choice" onClick={() => setTime(300000, 3000)}>5 + 3</div>
                                <div className="options__choice" onClick={() => setTime(180000, 3000)}>3 + 3</div>
                            </div>
                            <div>
                                <div className="options__choice" onClick={() => setTime(600000, 5000)}>10 + 5</div>
                                <div className="options__choice" onClick={() => setTime(300000, 5000)}>5 + 5</div>
                                <div className="options__choice" onClick={() => setTime(180000, 5000)}>3 + 5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>choose time</div>
            <div>choose difficulty</div> */}
        </div>
    )
}

export default Options