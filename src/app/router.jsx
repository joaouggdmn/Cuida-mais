import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom'
import { AccountPage } from '@/features/account/pages/AccountPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { CARE_SEEKER_ROLES } from '@/features/auth/roles'
import { ChatPage } from '@/features/chat/pages/ChatPage'
import { HomePage } from '@/features/home/pages/HomePage'
import { LandingPage } from '@/features/marketing/pages/LandingPage'
import { AgendaPage } from '@/features/scheduling/pages/AgendaPage'
import { PlansPage } from '@/features/subscription/pages/PlansPage'
import { SupportPage } from '@/features/support/pages/SupportPage'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { GuestRoute } from '@/routes/GuestRoute'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { RoleRoute } from '@/routes/RoleRoute'

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
            element: <AppLayout />,
            children: [
              { path: 'inicio', element: <HomePage /> },
              { path: 'suporte', element: <SupportPage /> },
              { path: 'conta', element: <AccountPage /> },
              {
                element: <RoleRoute allow={CARE_SEEKER_ROLES} />,
                children: [
                  { path: 'agenda', element: <AgendaPage /> },
                  { path: 'chat/:caregiverId?', element: <ChatPage /> },
                  { path: 'planos', element: <PlansPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])
