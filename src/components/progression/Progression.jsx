/* eslint-disable react-hooks/exhaustive-deps */
import store from "../redux/store"
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"

import first from "../../icons/first.png"
import prev from "../../icons/previous.png"
import next from "../../icons/next.png"
import last from "../../icons/last.png"

import "./progression.sass"

const Progression = () => {
    const [playerMinutes, setPlayerMinutes] = useState(0)
    const [playerSeconds, setPlayerSeconds] = useState("00")
    const [opponentMinutes, setOpponentMinutes] = useState(0)
    const [opponentSeconds, setOpponentSeconds] = useState("00")

    const moves = useSelector(state => state.moves)
    const moveNumbers = useSelector(state => state.moveNumbers)
    const currentMove = useSelector(state => state.currentMove)
    const time = useSelector(state => state.time)
    const color = useSelector(state => state.color)
    const notationArr = useSelector(state => state.notationArr)
    const pieceGainPlayer = useSelector(state => state.pieceGainPlayer)
    const pieceGainOpponent = useSelector(state => state.pieceGainOpponent)
    const increment = useSelector(state => state.increment)

    const bottomRef = useRef(null)
    const elapsedPlayer = useRef(0)
    const elapsedOpponent = useRef(0)
    const counter = useRef(0)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })

        if (moves.length > 1) {
            playerTimer(time)
        }

        counter.current = moves.length - 1
    }, [moves])

    useEffect(() => {
        if ((color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
            elapsedPlayer.current -= increment
        }

        if ((color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
            elapsedOpponent.current -= increment
        }
    }, [store.getState().toMove])

    useEffect(() => {
        let startingTime = time / 1000 / 60
        setPlayerMinutes(getZero(startingTime))
        setOpponentMinutes(getZero(startingTime))
    }, []);

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num
        } else {
            return num
        }
    }

    const onMoveClick = (i) => {
        if (i + 1 === moves.length) {
            store.dispatch({
                type: "currentMove",
                payload: null
            })
            counter.current = moves.length - 1
        } else {
            store.dispatch({
                type: "currentMove",
                payload: i
            })
            counter.current = i
        }
    }

    const playerTimer = (deadline) => {
        function getTimeRemaining(endtime, elapsed) {
            const t = endtime - elapsed
            const minutes = Math.floor((t / 1000 / 60) % 60)
            const seconds = Math.floor((t / 1000) % 60)
            if (t <= 0) {
                return {
                    "total": 0,
                    "minutes": 0,
                    "seconds": 0,
                }
            } else {
                return {
                    "total": t,
                    "minutes": minutes,
                    "seconds": seconds,
                }
            }
        }
    
        const timePlayerInterval = setInterval(updatePlayerClock, 100)

        function updatePlayerClock() {
            const tPlayer = getTimeRemaining(deadline, elapsedPlayer.current)
            
            setPlayerMinutes(getZero(tPlayer.minutes))
            setPlayerSeconds(getZero(tPlayer.seconds))

            if ((color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                elapsedPlayer.current += 100
            }
            
            if (tPlayer.total <= 0 || (color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                clearInterval(timePlayerInterval)
            }
        }

        const timeOpponentInterval = setInterval(updateOpponentClock, 100)

        function updateOpponentClock() {
            const tOpponent = getTimeRemaining(deadline, elapsedOpponent.current)

            setOpponentMinutes(getZero(tOpponent.minutes))
            setOpponentSeconds(getZero(tOpponent.seconds))

            if ((color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                elapsedOpponent.current += 100
            }
            
            if (tOpponent.total <= 0 || (color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                clearInterval(timeOpponentInterval)
            }
        }

        updateOpponentClock()
        updatePlayerClock()
    }

    const onFirstClick = () => {
        store.dispatch({
            type: "currentMove",
            payload: "0"
        })
    }

    const onPrevClick = () => {
        if (counter.current > 1) {
            counter.current--
            store.dispatch({
                type: "currentMove",
                payload: counter.current
            })
        } else {
            store.dispatch({
                type: "currentMove",
                payload: "0"
            })
        }
    }

    const onNextClick = () => {
        if (counter.current < moves.length - 1) {
            counter.current++
            store.dispatch({
                type: "currentMove",
                payload: counter.current
            })
        } else {
            store.dispatch({
                type: "currentMove",
                payload: null
            })
        }
    }

    const onLastClick = () => {
        store.dispatch({
            type: "currentMove",
            payload: null
        })
    }

    const renderProgression = () => {
        return (
            <div className="progression">
                <div className="progression__pieceGain">
                    {pieceGainOpponent.sort().reverse().join("")}
                </div>
                
                <div className="progression__timer__container">
                    {opponentMinutes} : {opponentSeconds}
                </div>

                <div className="progression__moves__container">
                    <div className="progression__moves__numbers">
                        {moveNumbers.map(a => <div className="progression__moves__numbers-body">{a - 1}</div>)}
                    </div>
                    <div className="progression__moves__grid">
                        {moves.slice(1).map((a, i) => 
                            <div className={`${(i === currentMove - 1) || (i + 2 === moves.length && !currentMove) ? "activeMove" : null} progression__moves__grid-item`} 
                                onClick={() => onMoveClick(i + 1)}
                                ref={(i + 2 === moves.length && !currentMove) ? bottomRef : null}>{notationArr[i]}</div>)}
                    </div>
                </div>

                <div className="progression__timer__container">
                    {playerMinutes} : {playerSeconds}
                </div>

                <div className="progression__pieceGain">
                    {pieceGainPlayer.sort().reverse().join("")}
                </div>

                <div className="progression__buttons">
                    <img src={first} alt="First" className="progression__buttons-button" onClick={() => onFirstClick()}/>
                    <img src={prev} alt="Previous" className="progression__buttons-button" onClick={() => onPrevClick()}/>
                    <img src={next} alt="Next" className="progression__buttons-button" onClick={() => onNextClick()}/>
                    <img src={last} alt="Last" className="progression__buttons-button" onClick={() => onLastClick()}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderProgression()}
        </div>
    )
}

export default Progression