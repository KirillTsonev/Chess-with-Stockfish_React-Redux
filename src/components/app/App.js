import Board from '../board/Board'
import Pieces from '../pieces/Pieces'
import Options from '../options/Options'
import Behavior from '../behavior/Behavior'
import Progression from '../progression/Progression'
import Modal from '../modal/Modal'

import { useSelector } from 'react-redux'

import "./app.sass"

function App() {
  const darkTheme = useSelector(state => state.darkTheme)
  const newGame = useSelector(state => state.newGame)
  const sandbox = useSelector(state => state.sandbox)
  const color = useSelector(state => state.color)

  if (newGame) {
    window.location.reload()
  }

  return (
    <div className="app" style={darkTheme ? {background: "#161512"} : null}>
      <Options></Options>
      <div className='visible'>
        <div>
          <Behavior></Behavior>
        </div>
        <div className={`threeGrids ${color === "black" && !sandbox ? "reverse" : null}`}>
          <Board></Board>
          <Pieces></Pieces>
        </div>
        <div>
          <Progression></Progression>
        </div>
        <Modal></Modal>
      </div>
    </div>
  );
}

export default App;