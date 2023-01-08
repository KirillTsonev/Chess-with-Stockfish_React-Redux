import Board from './components/board/Board';
import Pieces from './components/pieces/Pieces';
import Options from './components/options/Options';

function App() {
  return (
    <div className="App">
      <Options></Options>
      <Board></Board>
      {/* <Pieces></Pieces> */}
    </div>
  );
}

export default App;