/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"

import firstDark from "../../icons/first-dark.png"
import prevDark from "../../icons/prev-dark.png"
import nextDark from "../../icons/next-dark.png"
import lastDark from "../../icons/last-dark.png"
import resignDark from "../../icons/resign-dark.png"
import firstLight from "../../icons/first-light.png"
import prevLight from "../../icons/prev-light.png"
import nextLight from "../../icons/next-light.png"
import lastLight from "../../icons/last-light.png"
import resignLight from "../../icons/resign-light.png"
import cancel from "../../icons/x.png"

import store from "../redux/store"

import gameEndSoundFile from "../../sounds/gameEnd.ogg"

import "./progression.sass"

const Progression = () => {
    const [playerMinutes, setPlayerMinutes] = useState(0)
    const [playerSeconds, setPlayerSeconds] = useState("00")
    const [playerMiliseconds, setPlayerMiliseconds] = useState("0")
    const [opponentMinutes, setOpponentMinutes] = useState(0)
    const [opponentSeconds, setOpponentSeconds] = useState("00")
    const [opponentMiliseconds, setOpponentMiliseconds] = useState("0")
    const [resignConfirm, setResignConfirm] = useState(false)

    const gameEnd = useSelector(state => state.board.gameEnd)

    const color = useSelector(state => state.options.color)
    const time = useSelector(state => state.options.time)
    const increment = useSelector(state => state.options.increment)

    const milliseconds = useSelector(state => state.behavior.milliseconds)
    const darkTheme = useSelector(state => state.behavior.darkTheme)

    const moves = useSelector(state => state.progression.moves)
    const moveNumbers = useSelector(state => state.progression.moveNumbers)
    const currentMove = useSelector(state => state.progression.currentMove)
    const notationArr = useSelector(state => state.progression.notationArr)
    const pieceGainPlayer = useSelector(state => state.progression.pieceGainPlayer)
    const pieceGainOpponent = useSelector(state => state.progression.pieceGainOpponent)
 
    const bottomRef = useRef(null)
    const elapsedPlayer = useRef(0)
    const elapsedOpponent = useRef(0)
    const counter = useRef(0)

    const gameEndSound = new Audio(gameEndSoundFile)

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
        if ((color === "white" && store.getState().board.toMove === "b") 
            || (color === "black" && store.getState().board.toMove === "w")) {
            elapsedPlayer.current -= increment
        }

        if ((color === "white" && store.getState().board.toMove === "w") 
            || (color === "black" && store.getState().board.toMove === "b")) {
            elapsedOpponent.current -= increment
        }
    }, [store.getState().board.toMove])

    useEffect(() => {
        let startingTime = time / 1000 / 60
        setPlayerMinutes(getZero(startingTime))
        setOpponentMinutes(getZero(startingTime))
    }, [time]);

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
            const miliseconds = Math.floor((t / 10) % 100) / 10

            if (t <= 0) {
                return {
                    "total": 0,
                    "minutes": 0,
                    "seconds": 0,
                    "miliseconds": 0
                }
            } else {
                return {
                    "total": t,
                    "minutes": minutes,
                    "seconds": seconds,
                    "miliseconds": miliseconds
                }
            }
        }
    
        const timePlayerInterval = setInterval(updatePlayerClock, 100)

        function updatePlayerClock() {
            const tPlayer = getTimeRemaining(deadline, elapsedPlayer.current)
            
            setPlayerMinutes(getZero(tPlayer.minutes))
            setPlayerSeconds(getZero(tPlayer.seconds))
            setPlayerMiliseconds(tPlayer.miliseconds)

            if ((color === "white" && store.getState().board.toMove === "w") 
                || (color === "black" && store.getState().board.toMove === "b")) {
                elapsedPlayer.current += 100
            }
            
            if (tPlayer.total <= 0 
                || (color === "white" && store.getState().board.toMove === "b") 
                || (color === "black" && store.getState().board.toMove === "w") 
                || store.getState().board.gameEnd) {
                clearInterval(timePlayerInterval)
            }
        }

        const timeOpponentInterval = setInterval(updateOpponentClock, 100)

        function updateOpponentClock() {
            const tOpponent = getTimeRemaining(deadline, elapsedOpponent.current)

            setOpponentMinutes(getZero(tOpponent.minutes))
            setOpponentSeconds(getZero(tOpponent.seconds))
            setOpponentMiliseconds(tOpponent.miliseconds)

            if ((color === "white" && store.getState().board.toMove === "b") 
                || (color === "black" && store.getState().board.toMove === "w")) {
                elapsedOpponent.current += 100
            }
            
            if (tOpponent.total <= 0 
                || (color === "white" && store.getState().board.toMove === "w") 
                || (color === "black" && store.getState().board.toMove === "b") 
                || store.getState().board.gameEnd) {
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

        counter.current = 0
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

        counter.current = moves.length - 1
    }

    const onResignConfirm = () => {
        store.dispatch({
            type: "gameEnd"
        })

        store.dispatch({
            type: "modalOpen",
            payload: true
        })

        store.dispatch({
            type: "endMessage",
            payload: "You've resigned."
        })

        gameEndSound.play()

        setResignConfirm(false)
    }

    const onNewGame = () => {
        store.dispatch({
            type: "newGame"
        })
    }

    return (
        <div className={`${darkTheme ? "bg-darker" : null} progression`}>
            <div className="progression__pieceGain">
                {pieceGainOpponent.sort().reverse().join("")}
            </div>

            <div className={`${darkTheme ? "bg-dark" : "bg-light"} progression__timer`}>
                {opponentMinutes}:{opponentSeconds}

                <span style={milliseconds ? {display: "inline"} : {display: "none"}}>:{opponentMiliseconds}</span>
            </div>

            <div className="progression__moves">
                <div className="progression__moves__numbers">
                    {moveNumbers.slice(1).map(a => 
                        <div className={`${darkTheme ? "bg-dark" : "bg-light"} 
                                         progression__moves__numbers-body`}>{a - 1}</div>)}
                </div>

                <div className="progression__moves__grid">
                    {moves.slice(1).map((a, i) => 
                        <div className={`${((i === currentMove - 1) || (i + 2 === moves.length && !currentMove)) && darkTheme 
                                            ? "activeMoveDark" 
                                            : null}
                                         ${((i === currentMove - 1) || (i + 2 === moves.length && !currentMove)) && !darkTheme 
                                            ? "activeMoveLight" 
                                            : null} 
                                         progression__moves__grid-item`} 
                            onClick={() => onMoveClick(i + 1)}
                            ref={(i + 2 === moves.length && !currentMove) ? bottomRef : null}>{notationArr[i]}</div>)}
                </div>
            </div>

            <div className={`${darkTheme ? "bg-dark" : "bg-light"} progression__timer`}>
                {playerMinutes}:{playerSeconds}

                <span style={milliseconds ? {display: "inline"} : {display: "none"}}>:{playerMiliseconds}</span>
            </div>

            <div className="progression__pieceGain">
                {pieceGainPlayer.sort().reverse().join("")}
            </div>

            <div className="progression__buttons">
                <img src={darkTheme ? firstDark : firstLight} 
                        alt="First" 
                        className="progression__buttons-button" 
                        onClick={() => onFirstClick()}/>

                <img src={darkTheme ? prevDark : prevLight} 
                        alt="Previous" 
                        className="progression__buttons-button" 
                        onClick={() => onPrevClick()}/>

                <img src={darkTheme ? nextDark : nextLight} 
                        alt="Next" 
                        className="progression__buttons-button" 
                        onClick={() => onNextClick()}/>

                <img src={darkTheme ? lastDark : lastLight} 
                        alt="Last" 
                        className="progression__buttons-button" 
                        onClick={() => onLastClick()}/>
            </div>

            <div className={`${darkTheme ? "bg-dark" : "bg-light"}  progression__resign`}
                    style={resignConfirm 
                            || gameEnd 
                            || moves.length === 1 
                            ? {display: "none"} 
                            : {display: "block"}}
                    onClick={() => setResignConfirm(true)}
                    title="Resign">
                <img src={darkTheme ? resignDark : resignLight} 
                        alt="Resign" 
                        className="progression__resign-img"/>
            </div>

            <div className="progression__resign__confirm">
                <div className="progression__resign__confirm-btn" 
                        style={resignConfirm ? {display: "block"} : {display: "none"}}
                        title="Resign"
                        onClick={() => onResignConfirm()}>
                    <img src={darkTheme ? resignDark : resignLight} 
                            alt="Resign" 
                            className="progression__resign-img"/>
                </div>

                <img src={cancel} 
                        alt="Cancel" 
                        style={resignConfirm ? {display: "block"} : {display: "none"}} 
                        className="progression__resign__confirm-cancel"
                        onClick={() => setResignConfirm(false)}
                        title="Cancel"/>
            </div>

            <div className="progression__new"
                    style={gameEnd && moves.length > 1 ? {display: "block"} : {display: "none"}}
                    onClick={() => onNewGame()}>New Game</div>
        </div>
    )
}

export default Progression