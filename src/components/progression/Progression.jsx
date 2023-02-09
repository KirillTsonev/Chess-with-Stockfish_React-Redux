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
        // if (moves.length === 2) {
        //     opponentTimer(Date.now() + 600000)
        // }
        if (moves.length === 2) {
            playerTimer(600000)
        }
    }, [moves])

    useEffect(() => {
        if (moves.length > 2) {
            playerTimer(600000)
        }
        // opponentTimer(Date.now() + 600000)
    }, [toMove])

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
        function getTimeRemaining(endtime) {
            let t
            if ((color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                t = endtime - elapsedPlayer.current
            } else if ((color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                t = endtime - elapsedOpponent.current
            }
            
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
            const t = getTimeRemaining(deadline)

            setPlayerMinutes(getZero(t.minutes))
            setPlayerSeconds(getZero(t.seconds))

            if ((color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                elapsedPlayer.current += 1000
            }
            
            if (t.total <= 0 || (color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                clearInterval(timePlayerInterval)
            }
        }

        const timeOpponentInterval = setInterval(updateOpponentClock, 1000)

        function updateOpponentClock() {
            
            const t = getTimeRemaining(deadline)

            setOpponentMinutes(getZero(t.minutes))
            setOpponentSeconds(getZero(t.seconds))

            if ((color === "white" && store.getState().toMove === "b") || (color === "black" && store.getState().toMove === "w")) {
                elapsedOpponent.current += 1000
            }
            
            if (t.total <= 0 || (color === "white" && store.getState().toMove === "w") || (color === "black" && store.getState().toMove === "b")) {
                clearInterval(timeOpponentInterval)
            }
        }

        updatePlayerClock()
        updateOpponentClock()
    }

    const opponentTimer = (deadline) => {
        function getTimeRemaining(endtime) {
            const t = endtime - Date.now()
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
    
        function setClock(endtime) {
            const timeInterval = setInterval(updateClock, 1000)
    
            updateClock()
    
            function updateClock() {
                const t = getTimeRemaining(endtime)
    
                setOpponentMinutes(getZero(t.minutes))
                setOpponentSeconds(getZero(t.seconds))
    
                if (t.total <= 0) {
                    clearInterval(timeInterval)
                }
            }
        }
    
        setClock(deadline)
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