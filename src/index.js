import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { ContextMovie } from 'components/Context';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/goit-react-hw-05-movies">
      <ContextMovie>
        <App />
      </ContextMovie>
    </BrowserRouter>
  </React.StrictMode>
);
