import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';

import './styles/application.scss';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
