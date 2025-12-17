import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import './styles/style.css'
import './styles/media.css'
import App from './App.tsx'
import 'react-toastify/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 600000,
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 6 * 1000,
      // refetchOnMount: false,
      refetchOnReconnect: false,
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools/>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
