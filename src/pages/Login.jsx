import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Login() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const accounts = JSON.parse(localStorage.getItem('ethioHealthAccounts') || '[]')
    const match = accounts.find(
      (a) => a.identifier === identifier && a.password === password
    )
    if (!match) {
      setError('No matching account found in this demo. Try creating an account first.')
      return
    }
    localStorage.setItem('ethioHealthSession', JSON.stringify(match))
    navigate('/home')
  }

  return (
    <div className="screen">
      <LanguageSwitcher />
      <div className="container main-content">
        <div className="brand">
          <div className="brand-mark">EH</div>
          <div className="brand-name">{t.appName}</div>
        </div>
        <h2 style={{ fontFamily: 'var(--font-latin)', margin: '4px 0 4px' }}>{t.logIn}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>{t.phoneNumber} / {t.idNumber}</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="field">
            <label>{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
            {t.logIn}
          </button>
        </form>

        <div className="footer-link">
          <button onClick={() => navigate('/')}>{t.backHome}</button>
        </div>
      </div>
    </div>
  )
}
