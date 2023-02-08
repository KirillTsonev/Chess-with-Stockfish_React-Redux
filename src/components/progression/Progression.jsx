import store from "../redux/store"
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"

import "./progression.sass"

const Progression = () => {
    const moves = useSelector(state => state.moves)
    const moveNumbers = useSelector(state => state.moveNumbers)
    const currentMove = useSelector(state => state.currentMove)

    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [moves]);

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

    const renderMoves = () => {
        return (
            <div className="progression__moves-container">
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
        )
    }

    return (
        <div className="progression">
            {renderMoves()}
        </div>
    )
}

export default Progression