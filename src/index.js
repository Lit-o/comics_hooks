import React from 'react';
import ReactDOM from 'react-dom';
// import ComicsAPI from './api/ComicsAPI'
import App from './components/app/App';
import './style/style.scss';

// const server = new ComicsAPI();
// server.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))
// server.getCharacter(1010338).then(res => console.log(res))
// server.getAllCharacters().then(res => console.log(res))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

