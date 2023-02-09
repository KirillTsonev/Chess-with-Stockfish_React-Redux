import store from "../redux/store"
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"

import "./progression.sass"

const Progression = () => {
    const [playerMinutes, setPlayerMinutes] = useState(null)
    const [playerSeconds, setPlayerSeconds] = useState(null)
    const [opponentMinutes, setOpponentMinutes] = useState(null)
    const [opponentSeconds, setOpponentSeconds] = useState(null)
    const [miliseconds, setMiliseconds] = useState(null)

    const moves = useSelector(state => state.moves)
    const moveNumbers = useSelector(state => state.moveNumbers)
    const currentMove = useSelector(state => state.currentMove)
    const toMove = useSelector(state => state.toMove)
    const color = useSelector(state => state.color)

    const bottomRef = useRef(null)
    const elapsedPlayer = useRef(1000)
    const elapsedOpponent = useRef(1000)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })
        if (moves.length > 1) {
            playerTimer(600000)
        }
    }, [moves])

    // useEffect(() => {
    //     if (moves.length > 2) {
    //         playerTimer(600000)
    //     }
    // }, [toMove])

    const onMoveClick = (i) => {
        if (i + 1 === moves.length) {
            store.dispatch({
                type: "currentMove",
                payload: null
            })
        } else {
            store.dispatch({
                type: "currentMove",
                payload: i
            })
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
    
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num
            } else {
                return num
            }
        }
    
        const timePlayerInterval = setInterval(updatePlayerClock, 1000)

        function updatePlayerClock() {
            const tPlayer = getTimeRemaining(deadline, elapsedPlayer.current)
            

            setPlayerMinutes(getZero(tPlayer.minutes))
            setPlayerSeconds(getZero(tPlayer.seconds))

            if ((color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                elapsedPlayer.current += 1000
            }
            
            if (tPlayer.total <= 0 || (color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                clearInterval(timePlayerInterval)
            }
        }

        const timeOpponentInterval = setInterval(updateOpponentClock, 1000)

        function updateOpponentClock() {
            
            const tOpponent = getTimeRemaining(deadline, elapsedOpponent.current)

            setOpponentMinutes(getZero(tOpponent.minutes))
            setOpponentSeconds(getZero(tOpponent.seconds))

            if ((color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                elapsedOpponent.current += 1000
            }
            
            if (tOpponent.total <= 0 || (color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                clearInterval(timeOpponentInterval)
            }
        }

        updateOpponentClock()
        updatePlayerClock()
    }

    const renderMoves = () => {
        return (
            <div className="progression">
                <div className="progression__timer__container">
                    <div>{opponentMinutes} : {opponentSeconds}</div>
                </div>
                <div className="progression__moves__container">
                    <div className="progression__moves__numbers">
                        {moveNumbers.map(a => <div className="progression__moves__numbers-body">{a - 1}</div>)}
                    </div>
                    <div className="progression__moves__grid">
                        {moves.slice(1).map((a, i) => 
                            <div className={`${(i === currentMove - 1) || (i + 2 === moves.length && !currentMove) ? "activeMove" : null} progression__moves__grid-item`} 
                                onClick={() => onMoveClick(i + 1)}
                                ref={(i + 2 === moves.length && !currentMove) ? bottomRef : null}>{i + 1}</div>)}
                    </div>
                </div>
                <div className="progression__timer__container">
                    <div>{playerMinutes} : {playerSeconds}</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderMoves()}
        </div>
    )
}

export default Progression