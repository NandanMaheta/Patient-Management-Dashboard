import { AuthProvider } from './Context/AuthContext'
import './App.css'
import Dashboard from './Pages/Dashboard'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}> 
    <AuthProvider>
      <Dashboard/>
    </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
