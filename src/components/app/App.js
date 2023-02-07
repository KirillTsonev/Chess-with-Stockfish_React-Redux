import Board from '../board/Board';
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
        <Board></Board>
        <Progression></Progression>
      </div>
    </div>
  );
}

export default App;