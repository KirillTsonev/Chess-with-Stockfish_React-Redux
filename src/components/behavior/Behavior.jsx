import store from "../redux/store"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import "./behavior.sass"

const Behavior = () => {
    const [ballLeft, setBallLeft] = useState(false)

    const numbers = useSelector(state => state.numbers)
    const animations = useSelector(state => state.animations)
    const coordinates = useSelector(state => state.coordinates)
    const sounds = useSelector(state => state.sounds)
    const milliseconds = useSelector(state => state.milliseconds)

    useEffect(() => {
        if (localStorage.getItem("speed")) {
            store.dispatch({
                type: "behavior/animationSpeed",
                payload: localStorage.getItem("speed")
            })
        }
        if (localStorage.getItem("numbers")) {
            store.dispatch({
                type: "behavior/numbers",
                payload: JSON.parse(localStorage.getItem("numbers"))
            })
        }
        if (localStorage.getItem("coordinates")) {
            store.dispatch({
                type: "behavior/coordinates",
                payload: JSON.parse(localStorage.getItem("coordinates"))
            })
        }
        if (localStorage.getItem("sounds")) {
            store.dispatch({
                type: "sounds",
                payload: JSON.parse(localStorage.getItem("sounds"))
            })
        }
        if (localStorage.getItem("milliseconds")) {
            store.dispatch({
                type: "milliseconds",
                payload: JSON.parse(localStorage.getItem("milliseconds"))
            })
        }
        if (localStorage.getItem("darkTheme")) {
            setBallLeft(JSON.parse(localStorage.getItem("darkTheme")))
            store.dispatch({
                type: "darkTheme",
                payload: JSON.parse(localStorage.getItem("darkTheme"))
            })
        }
    }, [])

    const onChangeTheme = () => {
        setBallLeft(!ballLeft)
        store.dispatch({
            type: "darkTheme",
            payload: !ballLeft
        })
        localStorage.setItem("darkTheme", !ballLeft)
    }

    const onNumbersChoice = (boolean) => {
        store.dispatch({
            type: "behavior/numbers",
            payload: boolean
        })
        localStorage.setItem("numbers", boolean)
    }

    const onAnimationChoice = (speed) => {
        store.dispatch({
            type: "behavior/animationSpeed",
            payload: speed
        })
        localStorage.setItem("speed", speed)
    }

    const onCoordinatesChoice = (boolean) => {
        store.dispatch({
            type: "behavior/coordinates",
            payload: boolean
        })
        localStorage.setItem("coordinates", boolean)
    }

    const onSoundChoice = (boolean) => {
        store.dispatch({
            type: "sounds",
            payload: boolean
        })
        localStorage.setItem("sounds", boolean)
    }

    const onMillisecondsChoice = (boolean) => {
        store.dispatch({
            type: "milliseconds",
            payload: boolean
        })
        localStorage.setItem("milliseconds", boolean)
    }

    return (
        <div className="behavior">
            <div className="behavior__switch" onClick={() => onChangeTheme()}>
                <div>🌞</div>
                <div className={`behavior__switch-ball ${ballLeft ? "behavior__switch-ball-right" : "behavior__switch-ball-left"}`}></div>
                <div>🌜</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Visible numbers:</div>
                <div className={`behavior__option ${numbers ? "activeOption" : null}`}
                        onClick={() => onNumbersChoice(true)}>On</div>
                <div className={`behavior__option ${!numbers ? "activeOption" : null}`}
                        onClick={() => onNumbersChoice(false)}>Off</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Animation speed:</div>
                <div>           
                    <div className={`behavior__option ${animations === "none" ? "activeOption" : null}`}
                            onClick={() => onAnimationChoice("none")}>None</div>
                    <div className={`behavior__option ${animations === "slow" ? "activeOption" : null}`} 
                            onClick={() => onAnimationChoice("slow")}>Slow</div>
                    <div className={`behavior__option ${animations === "average" ? "activeOption" : null}`}
                            onClick={() => onAnimationChoice("average")}>Normal</div>
                    <div className={`behavior__option ${animations === "fast" ? "activeOption" : null}`}
                            onClick={() => onAnimationChoice("fast")}>Fast</div>
                </div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Coordinates:</div>
                <div className={`behavior__option ${coordinates ? "activeOption" : null}`}
                        onClick={() => onCoordinatesChoice(true)}>On</div>
                <div className={`behavior__option ${!coordinates ? "activeOption" : null}`}
                        onClick={() => onCoordinatesChoice(false)}>Off</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Sounds:</div>
                <div className={`behavior__option ${sounds ? "activeOption" : null}`}
                        onClick={() => onSoundChoice(true)}>On</div>
                <div className={`behavior__option ${!sounds ? "activeOption" : null}`}
                        onClick={() => onSoundChoice(false)}>Off</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Timer milliseconds:</div>
                <div className={`behavior__option ${milliseconds ? "activeOption" : null}`}
                        onClick={() => onMillisecondsChoice(true)}>On</div>
                <div className={`behavior__option ${!milliseconds ? "activeOption" : null}`}
                        onClick={() => onMillisecondsChoice(false)}>Off</div>
            </div>
        </div>
    )
}

export default Behavior