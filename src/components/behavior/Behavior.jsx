import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import store from "../redux/store"

import "./behavior.sass"

const Behavior = () => {
    const [ballLeft, setBallLeft] = useState(false)

    const darkTheme = useSelector(state => state.behavior.darkTheme)
    const numbers = useSelector(state => state.behavior.numbers)
    const animations = useSelector(state => state.behavior.animations)
    const coordinates = useSelector(state => state.behavior.coordinates)
    const sounds = useSelector(state => state.behavior.sounds)
    const milliseconds = useSelector(state => state.behavior.milliseconds)

    useEffect(() => {
        if (localStorage.getItem("darkTheme")) {
            setBallLeft(JSON.parse(localStorage.getItem("darkTheme")))
            store.dispatch({
                type: "darkTheme",
                payload: JSON.parse(localStorage.getItem("darkTheme"))
            })
        }

        if (localStorage.getItem("speed")) {
            store.dispatch({
                type: "animationSpeed",
                payload: localStorage.getItem("speed")
            })
        }

        if (localStorage.getItem("coordinates")) {
            store.dispatch({
                type: "coordinates",
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
            type: "numbers",
            payload: boolean
        })
    }

    const onAnimationChoice = (speed) => {
        store.dispatch({
            type: "animationSpeed",
            payload: speed
        })

        localStorage.setItem("speed", speed)
    }

    const onCoordinatesChoice = (boolean) => {
        store.dispatch({
            type: "coordinates",
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
        <div className={`${darkTheme ? "bg-darker" : null} behavior`}>
            <div className="behavior__switch" onClick={() => onChangeTheme()}>
                <div>🌞</div>

                <div className={`behavior__switch-ball 
                                ${ballLeft ? "behavior__switch-ball-right" : "behavior__switch-ball-left"}`}></div>
                                
                <div>🌜</div>
            </div>

            {/* <div className="behavior__container">
                <div className="behavior__body">Visible numbers:</div>

                <div className="behavior__option">
                    <div className={`behavior__option-body 
                                    ${numbers ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onNumbersChoice(true)}>On</div>

                    <div className={`behavior__option-body 
                                    ${!numbers ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onNumbersChoice(false)}>Off</div>
                </div>
            </div> */}

            <div className="behavior__container">
                <div className="behavior__body">Animation speed:</div>

                <div className="behavior__optionAnim">           
                    <div className={`behavior__option-body 
                                    ${animations === "none" ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onAnimationChoice("none")}>None</div>

                    <div className={`behavior__option-body 
                                    ${animations === "slow" ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`} 
                         onClick={() => onAnimationChoice("slow")}>Slow</div>

                    <div className={`behavior__option-body 
                                    ${animations === "average" ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onAnimationChoice("average")}>Normal</div>

                    <div className={`behavior__option-body 
                                    ${animations === "fast" ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onAnimationChoice("fast")}>Fast</div>
                </div>
            </div>

            <div className="behavior__container">
                <div className="behavior__body">Coordinates:</div>

                <div className="behavior__option">
                    <div className={`behavior__option-body 
                                    ${coordinates ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onCoordinatesChoice(true)}>On</div>

                    <div className={`behavior__option-body 
                                    ${!coordinates ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onCoordinatesChoice(false)}>Off</div>
                </div>
            </div>

            <div className="behavior__container">
                <div className="behavior__body">Sounds:</div>

                <div className="behavior__option">
                    <div className={`behavior__option-body 
                                    ${sounds ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onSoundChoice(true)}>On</div>

                    <div className={`behavior__option-body 
                                    ${!sounds ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onSoundChoice(false)}>Off</div>
                </div>
            </div>

            <div className="behavior__container">
                <div className="behavior__body">Timer milliseconds:</div>

                <div className="behavior__option">
                    <div className={`behavior__option-body 
                                    ${milliseconds ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onMillisecondsChoice(true)}>On</div>

                    <div className={`behavior__option-body 
                                    ${!milliseconds ? "activeOption" : null} 
                                    ${darkTheme ? "option-dark" : "option-light"}`}
                         onClick={() => onMillisecondsChoice(false)}>Off</div>
                </div>
            </div>
        </div>
    )
}

export default Behavior