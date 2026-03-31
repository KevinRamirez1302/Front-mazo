import './App.css'
import './index.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingChatbot from './components/FloatingChatbot'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  )
}
