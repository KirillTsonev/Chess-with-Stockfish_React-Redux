import { useSelector } from "react-redux"

const Comp = () => {
    const board = useSelector(state => state.board)

    const decode = () => {
        console.log(board)
    }

    decode()
}

export default Comp