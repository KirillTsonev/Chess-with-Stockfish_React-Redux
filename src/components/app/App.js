import React, { Suspense } from 'react';
import { useSelector } from 'react-redux'

import "./app.sass"

const Modal = React.lazy(() => import('../modal/Modal'))
const Progression = React.lazy(() => import('../progression/Progression'))
const Behavior = React.lazy(() => import('../behavior/Behavior'))
const Pieces = React.lazy(() => import('../pieces/Pieces'))
const Board = React.lazy(() => import('../board/Board'))
const Options = React.lazy(() => import('../options/Options'))

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
      <Suspense>
        <Options></Options>
      </Suspense>
      <div className='visible'>
        <div>
          <Suspense>
            <Behavior></Behavior>
          </Suspense>
        </div>
        <div className={`threeGrids ${color === "black" && !sandbox ? "reverse" : null}`}>
          <Suspense>
            <Board></Board>
          </Suspense>
          <Suspense>
            <Pieces></Pieces>
          </Suspense>
        </div>
        <div>
          <Suspense>
            <Progression></Progression>
          </Suspense>
        </div>
        <Suspense>
          <Modal></Modal>
        </Suspense>
      </div>
    </div>
  );
}

export default App;