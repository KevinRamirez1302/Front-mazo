import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LandingPage from './pages/LandingPage.tsx'
import PlayGemini from './components/PlayGemini.tsx'
import CourseDetails from './pages/CourseDetails.tsx'
import AdminLogin from './pages/AdminLogin.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'play',
        element: <PlayGemini />,
      },
      {
        path: 'curso/:id',
        element: <CourseDetails />,
      },
      {
        path: 'admin',
        element: <AdminLogin />,
      },
      {
        path: 'admin-panel',
        element: <AdminDashboard />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
