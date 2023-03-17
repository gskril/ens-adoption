import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
