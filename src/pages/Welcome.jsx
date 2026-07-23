import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import QueueTicket from '../components/QueueTicket'
import { getSession } from '../utils/appointments'

export default function Welcome() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    if (getSession()) navigate('/home')
  }, [navigate])

  return (
    <div className="screen">
      <LanguageSwitcher />
      <div className="container main-content">
        <div className="brand">
          <div className="brand-mark">EH</div>
          <div className="brand-name">{t.appName}</div>
        </div>
        <p className="tagline">{t.tagline}</p>

        <QueueTicket />

        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>
            {t.createAccount}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            {t.logIn}
          </button>
        </div>
      </div>
    </div>
  )
}
