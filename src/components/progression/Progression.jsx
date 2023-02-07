import store from "../redux/store"
import { useSelector } from "react-redux"

import "./progression.sass"

const Progression = () => {
    const moves = useSelector(state => state.moves)

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
            <div className="behavior__moves">
                {moves.slice(1).map((a, i) => <div className="behavior__moves-item" onClick={() => onMoveClick(i + 1)}>{i + 1}</div>)}
            </div>
        )
    }

    return (
        <div className="progression">
            <div className="progression__container">
                {renderMoves()}
            </div>
        </div>
    )
}

export default Progression