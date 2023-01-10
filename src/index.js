import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './components/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

// var wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

// var stockfish = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js');

// stockfish.addEventListener('message', function (e) {
//   console.log(e.data);
// });

// stockfish.postMessage('uci');

root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);