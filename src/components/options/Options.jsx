import { useSelector } from "react-redux"
import { useState } from "react"

import store from "../redux/store"

import "./options.sass"

const Options = () => {
    const [multiplier, setMultipler] = useState(0)
    const [helpMode, setHelpMode] = useState(false)
    const [helpTime, setHelpTime] = useState(false)

    const options = useSelector(state => state.options)
    const sandbox = useSelector(state => state.sandbox)

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
        if (color === "color/black" && !sandbox) {
            store.dispatch({
                type: "setBoard",
                payload: {
                    pr1: [1, "a8"],
                    ph1: [2, "b8"],
                    pb1: [3, "c8"],
                    pqb1: [4, "d8"],
                    pkb: [5, "e8"],
                    pb2: [6, "f8"],
                    ph2: [7, "g8"],
                    pr2: [8, "h8"],
                    pp1: [9, "a7"],
                    pp2: [10, "b7"],
                    pp3: [11, "c7"],
                    pp4: [12, "d7"],
                    pp5: [13, "e7"],
                    pp6: [14, "f7"],
                    pp7: [15, "g7"],
                    pp8: [16, "h7"],
                    empty1: [17, "a6"],
                    empty2: [18, "b6"],
                    empty3: [19, "c6"],
                    empty4: [20, "d6"],
                    empty5: [21, "e6"],
                    empty6: [22, "f6"],
                    empty7: [23, "g6"],
                    empty8: [24, "h6"],
                    empty9: [25, "a5"],
                    empty10: [26, "b5"],
                    empty11: [27, "c5"],
                    empty12: [28, "d5"],
                    empty13: [29, "e5"],
                    empty14: [30, "f5"],
                    empty15: [31, "g5"],
                    empty16: [32, "h5"],
                    empty17: [33, "a4"],
                    empty18: [34, "b4"],
                    empty19: [35, "c4"],
                    empty20: [36, "d4"],
                    empty21: [37, "e4"],
                    empty22: [38, "f4"],
                    empty23: [39, "g4"],
                    empty24: [40, "h4"],
                    empty25: [41, "a3"],
                    empty26: [42, "b3"],
                    empty27: [43, "c3"],
                    empty28: [44, "d3"],
                    empty29: [45, "e3"],
                    empty30: [46, "f3"],
                    empty31: [47, "g3"],
                    empty32: [48, "h3"],
                    op1: [49, "a2"],
                    op2: [50, "b2"],
                    op3: [51, "c2"],
                    op4: [52, "d2"],
                    op5: [53, "e2"],
                    op6: [54, "f2"],
                    op7: [55, "g2"],
                    op8: [56, "h2"],
                    or1: [57, "a1"],
                    oh1: [58, "b1"],
                    ob1: [59, "c1"],
                    oqw1: [60, "d1"],
                    okw: [61, "e1"],
                    ob2: [62, "f1"],
                    oh2: [63, "g1"],
                    or2: [64, "h1"]
                }
            })
        }
        if (color === "color/black" && sandbox) {
            store.dispatch({
                type: "setBoard",
                payload: {
                    or1: [1, "a8"],
                    oh1: [2, "b8"],
                    ob1: [3, "c8"],
                    okw: [4, "d8"],
                    oqw1: [5, "e8"],
                    ob2: [6, "f8"],
                    oh2: [7, "g8"],
                    or2: [8, "h8"],
                    op1: [9, "a7"],
                    op2: [10, "b7"],
                    op3: [11, "c7"],
                    op4: [12, "d7"],
                    op5: [13, "e7"],
                    op6: [14, "f7"],
                    op7: [15, "g7"],
                    op8: [16, "h7"],
                    empty1: [17, "a6"],
                    empty2: [18, "b6"],
                    empty3: [19, "c6"],
                    empty4: [20, "d6"],
                    empty5: [21, "e6"],
                    empty6: [22, "f6"],
                    empty7: [23, "g6"],
                    empty8: [24, "h6"],
                    empty9: [25, "a5"],
                    empty10: [26, "b5"],
                    empty11: [27, "c5"],
                    empty12: [28, "d5"],
                    empty13: [29, "e5"],
                    empty14: [30, "f5"],
                    empty15: [31, "g5"],
                    empty16: [32, "h5"],
                    empty17: [33, "a4"],
                    empty18: [34, "b4"],
                    empty19: [35, "c4"],
                    empty20: [36, "d4"],
                    empty21: [37, "e4"],
                    empty22: [38, "f4"],
                    empty23: [39, "g4"],
                    empty24: [40, "h4"],
                    empty25: [41, "a3"],
                    empty26: [42, "b3"],
                    empty27: [43, "c3"],
                    empty28: [44, "d3"],
                    empty29: [45, "e3"],
                    empty30: [46, "f3"],
                    empty31: [47, "g3"],
                    empty32: [48, "h3"],
                    pp1: [49, "a2"],
                    pp2: [50, "b2"],
                    pp3: [51, "c2"],
                    pp4: [52, "d2"],
                    pp5: [53, "e2"],
                    pp6: [54, "f2"],
                    pp7: [55, "g2"],
                    pp8: [56, "h2"],
                    pr1: [57, "a1"],
                    ph1: [58, "b1"],
                    pb1: [59, "c1"],
                    pkb: [60, "d1"],
                    pqb1: [61, "e1"],
                    pb2: [62, "f1"],
                    ph2: [63, "g1"],
                    pr2: [64, "h1"]
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

    const onBack = () => {
        setMultipler(multiplier - 1)
    }

    return (
        <div className="options" style={options ? {opacity: "1", visibility: "visible"} : {opacity: "0", visibility: "hidden"}}>
            <div className="options__helpMode" style={helpMode ? {opacity: "1", visibility: "visible"} : {opacity: "0", visibility: "hidden"}}>
                In sandbox mode you control both the white and the black pieces. Perfect for testing out game logic features.
            </div>
            <div className="options__helpTime" style={helpTime ? {opacity: "1", visibility: "visible"} : {opacity: "0", visibility: "hidden"}}>
                The options are in "Minutes + increment" format. Increment defines how many seconds are added to the players' timer after they make a move.
            </div>
            <div className="options__outer">
                <div className="options__inner" style={{transform: `translateY(${multiplier * -250}px)`, transition: "all .5s"}}>
                    <div className="options__body">
                        <div className="options__heading">Choose game mode <span onMouseEnter={() => setHelpMode(true)} 
                                                                                 onMouseLeave={() => setHelpMode(false)}
                                                                                 className="options__question">?</span></div>
                        <div className="options__container">
                            <div className="options__choice" onClick={() => setGameMode(false)}>Vs computer</div>
                            <div className="options__choice" onClick={() => setGameMode(true)}>Sandbox</div>
                        </div>
                    </div>
                    <div className="options__body">
                        <div className="options__back" onClick={() => onBack()}>Back</div>
                        <div className="options__heading">Choose the color of your pieces</div>
                        <div className="options__container">
                            <div className="options__choice" onClick={() => setColor("color/white")}>White</div>
                            <div className="options__choice" onClick={() => setColor("color/black")}>Black</div>
                        </div>
                    </div>
                    <div className="options__bodyTime">
                        <div className="options__back" onClick={() => onBack()}>Back</div>
                        <div className="options__heading">Choose the time control <span onMouseEnter={() => setHelpTime(true)} 
                                                                                        onMouseLeave={() => setHelpTime(false)}
                                                                                        className="options__question">?</span></div>
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
        </div>
    )
}

export default Options