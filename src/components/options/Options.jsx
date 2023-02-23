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