import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { LandingPage } from '@/features/marketing/pages/LandingPage'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { GuestRoute } from '@/routes/GuestRoute'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MarketingLayout />,
        children: [{ index: true, element: <LandingPage /> }],
      },
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <LoginPage /> },
              { path: 'cadastro', element: <RegisterPage /> },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [{ path: 'minha-area', element: <DashboardPage /> }],
          },
        ],
      },
    ],
  },
])
