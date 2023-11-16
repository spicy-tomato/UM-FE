import { registerLicense } from '@syncfusion/ej2-base';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// axios.defaults.baseURL = 'https://um-be.laptrinhkhongvui.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpQnxbf1xzZFJMYlxbRHFPMyBoS35RdURjWXZedHZQQ2dZWERw'
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
