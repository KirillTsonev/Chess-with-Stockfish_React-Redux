import Board from '../board/Board';
import Pieces from '../pieces/Pieces';
import Options from '../options/Options';
import Behavior from '../behavior/Behavior';

import "./app.sass"

function App() {
  return (
    <div className="app">
      <Options></Options>
      {/* <Pieces></Pieces> */}
      <div className='visible'>
        <Board></Board>
        <Behavior></Behavior>
      </div>
    </div>
  );
}

export default App;