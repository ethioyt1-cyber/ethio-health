import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import CenterDetail from './pages/CenterDetail'
import MyAppointments from './pages/MyAppointments'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/centers/:centerId" element={<CenterDetail />} />
          <Route path="/appointments" element={<MyAppointments />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
