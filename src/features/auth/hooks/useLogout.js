import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from './useAuth'

export function useLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useCallback(async () => {
    // Sai da rota protegida (renderizando já, com flushSync) antes de limpar a sessão;
    // senão o ProtectedRoute ainda montado redirecionaria para /login.
    await navigate('/', { flushSync: true })
    logout()
    toast.success('Você saiu da sua conta.', { description: 'Até logo!' })
  }, [logout, navigate])
}
