import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'pages';

import { client } from 'api/client';

import { ApolloProvider } from '@apollo/client';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
