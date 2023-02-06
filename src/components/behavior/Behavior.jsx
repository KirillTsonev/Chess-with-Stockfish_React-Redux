import store from "../redux/store"
import { useSelector } from "react-redux"

import "./behavior.sass"

const Behavior = () => {
    const numbers = useSelector(state => state.numbers)
    const animations = useSelector(state => state.animations)
    const moves = useSelector(state => state.moves)

    const onNumbersChoice = (boolean) => {
        store.dispatch({
            type: "behavior/numbers",
            payload: boolean
        })
    }

    const onAnimationChoice = (speed) => {
        store.dispatch({
            type: "behavior/animationSpeed",
            payload: speed
        })
    }

    const renderMoves = () => {
        return (
            <div className="behavior__moves">
                {moves.slice(1).map((a, i) => <div className="behavior__moves-item">{i + 1}</div>)}
            </div>
        )
    }

    return (
        <div className="behavior">
            <div className="behavior__container">
                <div className="behavior__body">Visible numbers:</div>
                <div className={`behavior__option ${numbers ? "active" : null}`}  onClick={() => onNumbersChoice(true)}>On</div>
                <div className={`behavior__option ${!numbers ? "active" : null}`} onClick={() => onNumbersChoice(false)}>Off</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Animation speed:</div>
                <div>
                    <div className={`behavior__option ${animations === "slow" ? "active" : null}`}  onClick={() => onAnimationChoice("slow")}>Slow</div>
                    <div className={`behavior__option ${animations === "fast" ? "active" : null}`}  onClick={() => onAnimationChoice("fast")}>Fast</div>
                </div>
                <div>
                    <div className={`behavior__option ${animations === "average" ? "active" : null}`} onClick={() => onAnimationChoice("average")}>Normal</div>
                    <div className={`behavior__option ${animations === "none" ? "active" : null}`} onClick={() => onAnimationChoice("none")}>None</div>
                </div>
            </div>
            <div className="behavior__container">
                {renderMoves()}
            </div>
        </div>
    )
}

export default Behavior