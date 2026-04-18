import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { logWebVitals, initLongTaskMonitoring } from './utils/performance.js'

// Create root
const root = createRoot(document.getElementById('root'))

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Enable performance monitoring in production
if (import.meta.env.PROD) {
  // Log Core Web Vitals
  logWebVitals()

  // Monitor long-running tasks
  initLongTaskMonitoring()

  // Log initial memory usage
  console.log('[Performance] Initial metrics loaded')
}
