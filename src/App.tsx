import { QueryClient } from "@tanstack/react-query";
import "./App.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function App() {
  return <>{/* Add your children components here */}</>;
}

export default App;
