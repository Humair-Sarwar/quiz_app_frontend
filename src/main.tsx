import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import './styles/style.css'
import './styles/media.css'
import App from './App.tsx'
import 'react-toastify/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { Provider } from "react-redux";
import store from './app/store.ts'

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
    <Provider store={store}>
      <App />
      </Provider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>,
)
