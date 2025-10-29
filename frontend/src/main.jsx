import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
      gcTime: 600000, // 10 minutes
      networkMode: 'online',
    },
    mutations: {
      retry: 2,
      networkMode: 'online',
    },
  },
})

// Error boundary component
function ErrorBoundary({ children }) {
  return (
    <div role="alert">
      {children}
    </div>
  )
}

// Root component with providers
function Root() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  )
}

// Mount the application
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(<Root />)
} else {
  console.error('Root element not found')
}
