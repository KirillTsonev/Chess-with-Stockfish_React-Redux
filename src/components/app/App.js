import Board from '../board/Board';
import Pieces from '../pieces/Pieces';
import Options from '../options/Options';
import Behavior from '../behavior/Behavior';
import Progression from '../progression/Progression';

import "./app.sass"

function App() {
  return (
    <div className="app">
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