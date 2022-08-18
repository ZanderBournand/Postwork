import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../src/redux/reducers'

const container = document.getElementById('root');
const root = createRoot(container);

const store2 = createStore(reducers, compose(applyMiddleware(thunk)))

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})

root.render(
  <React.StrictMode>
    <Provider store={store2}>
      {/* <Provider store={store}> */}
      {/* <Provider store={store2}> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      {/* </Provider> */}
      {/* </Provider> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();