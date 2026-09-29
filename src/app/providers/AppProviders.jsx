import { Toaster } from '@/components/ui/Toaster'
import { AuthProvider } from '@/contexts/AuthContext'

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
