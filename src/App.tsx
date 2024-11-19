import { QueryClient } from '@tanstack/react-query'
import AppRouters from './routes/AppRouters'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function App() {
  return (
    <>
      {/* Add your children components here */}
      <AppRouters />
    </>
  )
}

export default App
