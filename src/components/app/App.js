import Board from '../board/Board';
import Options from '../options/Options';
import Behavior from '../behavior/Behavior';

import "./app.sass"

function App() {
  return (
    <div className="app">
      <Options></Options>
      <div className='visible'>
        <Board></Board>
        <Behavior></Behavior>
      </div>
    </div>
  );
}

export default App;