import { createStandaloneToast } from '@chakra-ui/react';
import { store } from '@redux';
import { registerLicense } from '@syncfusion/ej2-base';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const { ToastContainer } = createStandaloneToast();

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NHaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH5fdnVRRWhZV0xyWkQ='
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
