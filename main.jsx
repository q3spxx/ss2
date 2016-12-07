import React from 'react'
import ReactDOM from 'react-dom'

import fix from 'react-tap-event-plugin'
fix()

import App from './admin/components/app.jsx'
ReactDOM.render(<App />, document.getElementById('root'))