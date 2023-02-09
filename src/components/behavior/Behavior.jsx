import store from "../redux/store"
import { useSelector } from "react-redux"

import "./behavior.sass"

const Behavior = () => {
    const numbers = useSelector(state => state.numbers)
    const animations = useSelector(state => state.animations)
    const coordinates = useSelector(state => state.coordinates)

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

    const onCoordinatesChoice = (boolean) => {
        store.dispatch({
            type: "behavior/coordinates",
            payload: boolean
        })
    }

    return (
        <div className="behavior">
            <div className="behavior__container">
                <div className="behavior__body">Visible numbers:</div>
                <div className={`behavior__option ${numbers ? "activeOption" : null}`}  onClick={() => onNumbersChoice(true)}>On</div>
                <div className={`behavior__option ${!numbers ? "activeOption" : null}`} onClick={() => onNumbersChoice(false)}>Off</div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Animation speed:</div>
                <div>
                    <div className={`behavior__option ${animations === "slow" ? "activeOption" : null}`}  onClick={() => onAnimationChoice("slow")}>Slow</div>
                    <div className={`behavior__option ${animations === "fast" ? "activeOption" : null}`}  onClick={() => onAnimationChoice("fast")}>Fast</div>
                </div>
                <div>
                    <div className={`behavior__option ${animations === "average" ? "activeOption" : null}`} onClick={() => onAnimationChoice("average")}>Normal</div>
                    <div className={`behavior__option ${animations === "none" ? "activeOption" : null}`} onClick={() => onAnimationChoice("none")}>None</div>
                </div>
            </div>
            <div className="behavior__container">
                <div className="behavior__body">Coordinates:</div>
                <div className={`behavior__option ${coordinates ? "activeOption" : null}`}  onClick={() => onCoordinatesChoice(true)}>On</div>
                <div className={`behavior__option ${!coordinates ? "activeOption" : null}`} onClick={() => onCoordinatesChoice(false)}>Off</div>
            </div>
        </div>
    )
}

export default Behavior