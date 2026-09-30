import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

/** Páginas só para alguns perfis: os demais voltam para o início. Usar dentro do ProtectedRoute. */
export function RoleRoute({ allow }) {
  const { user } = useAuth()
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/inicio" replace />
}
