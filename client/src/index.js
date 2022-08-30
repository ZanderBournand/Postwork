import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../src/redux/reducers'

const container = document.getElementById('root');
const root = createRoot(container);

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API}>
            <App />
          </GoogleOAuthProvider>
        </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
