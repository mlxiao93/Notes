import React from 'react'
import { render, hydrate } from 'react-dom'
import { renderToString }  from 'react-dom/server'

import App from './src/App'

// console.log(renderToString(<App />));

if (location.port === '3000') {
  render(<App />, document.querySelector('#app'));
} else {
  hydrate(<App />, document.querySelector('#app'));
}
