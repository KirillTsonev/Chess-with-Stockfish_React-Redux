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

    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [moves]);

    useEffect(() => {
        timer(Date.now() + 600000, setPlayerMinutes, setPlayerSeconds)
        timer(Date.now() + 600000, setOpponentMinutes, setOpponentSeconds)
    }, [])

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

    const timer = (deadline, setterMinutes, settterSeconds) => {
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
    
                setterMinutes(getZero(t.minutes))
                settterSeconds(getZero(t.seconds))
    
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
                    <div>{playerMinutes} : {playerSeconds}</div>
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
                    <div>{opponentMinutes} : {opponentSeconds}</div>
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