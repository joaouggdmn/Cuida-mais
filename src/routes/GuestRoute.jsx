import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

/** Telas só para visitantes (login, cadastro): quem já entrou vai para a própria área. */
export function GuestRoute() {
  const { user } = useAuth()
  return user ? <Navigate to="/inicio" replace /> : <Outlet />
}
