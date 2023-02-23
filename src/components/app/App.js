import Board from '../board/Board'
import Pieces from '../pieces/Pieces'
import Options from '../options/Options'
import Behavior from '../behavior/Behavior'
import Progression from '../progression/Progression'

import { useSelector } from 'react-redux'

import "./app.sass"

function App() {
  const darkTheme = useSelector(state => state.darkTheme)

  return (
    <div className="app" style={darkTheme ? {background: "#161512"} : null}>
      <Options></Options>
      <div className='visible'>
        <Behavior></Behavior>
        <div className='threeGrids'>
          <Board></Board>
          <Pieces></Pieces>
        </div>
        <Progression></Progression>
      </div>
    </div>
  );
}

export default App;