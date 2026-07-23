import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function BottomNav() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        {t.navHome}
      </button>
      <button
        className={`nav-item ${location.pathname === '/appointments' ? 'active' : ''}`}
        onClick={() => navigate('/appointments')}
      >
        {t.navAppointments}
      </button>
      <button
        className="nav-item"
        onClick={() => {
          localStorage.removeItem('ethioHealthSession')
          navigate('/')
        }}
      >
        {t.navLogout}
      </button>
    </nav>
  )
}
