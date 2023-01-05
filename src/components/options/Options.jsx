import store from "../redux/store"
import { useSelector } from "react-redux"

import "./options.sass"

const Options = () => {
    const setColor = (color) => {
        store.dispatch({
            type: color
        })
        store.dispatch({
            type: "optionsOff"
        })
    }

    const selectOptions = state => state.options
    const options = useSelector(selectOptions)

    return (
        <div className="optionsContainer" style={options ? null : {display: "none", opacity: "0"}}>
            {/* <div>choose opponent</div> */}
            <div className="optionsContainer__side">
                <div className="optionsContainer__qheader">Choose side</div>
                <div className="optionsContainer__acontainer">
                    <div className="optionsContainer__aoption" onClick={() => setColor("color/white")}>White</div>
                    <div className="optionsContainer__aoption" onClick={() => setColor("color/black")}>Black</div>
                </div>
            </div>
            {/* <div>choose time</div>
            <div>choose difficulty</div> */}
        </div>
    )
}

export default Options