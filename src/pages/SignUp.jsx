import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { translations, languageOrder } from '../i18n/translations'

const PHONE_REGEX = /^0[9|7]\d{8}$/
const FAYDA_ID_REGEX = /^\d{16}$/

export default function SignUp() {
  const { t, lang, setLang } = useLanguage()
  const navigate = useNavigate()

  const [mode, setMode] = useState('phone') // 'phone' | 'id'
  const [fullName, setFullName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function validate() {
    const next = {}
    if (!fullName.trim()) next.fullName = t.errorRequired
    if (mode === 'phone') {
      if (!PHONE_REGEX.test(identifier)) next.identifier = t.errorPhone
    } else {
      if (!FAYDA_ID_REGEX.test(identifier)) next.identifier = t.errorId
    }
    if (password.length < 8) next.password = t.errorPassword
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const account = {
      fullName,
      mode,
      identifier,
      // Demo only: never store real passwords in plain text in a production app.
      password,
      preferredLanguage: lang,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('ethioHealthAccounts') || '[]')
    existing.push(account)
    localStorage.setItem('ethioHealthAccounts', JSON.stringify(existing))
    localStorage.setItem('ethioHealthSession', JSON.stringify(account))
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="screen">
        <LanguageSwitcher />
        <div className="container main-content">
          <div className="brand">
            <div className="brand-mark">EH</div>
            <div className="brand-name">{t.appName}</div>
          </div>
          <h2 style={{ fontFamily: 'var(--font-latin)' }}>{t.successTitle}</h2>
          <p className="tagline">{t.successBody}</p>
          <button className="btn btn-primary" onClick={() => navigate('/home')}>
            {t.navHome}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <LanguageSwitcher />
      <div className="container main-content">
        <div className="brand">
          <div className="brand-mark">EH</div>
          <div className="brand-name">{t.appName}</div>
        </div>
        <h2 style={{ fontFamily: 'var(--font-latin)', margin: '4px 0 4px' }}>{t.signupTitle}</h2>
        <p className="tagline">{t.signupSubtitle}</p>

        <div className="toggle-row">
          <button
            type="button"
            className={`toggle-option ${mode === 'phone' ? 'active' : ''}`}
            onClick={() => { setMode('phone'); setIdentifier(''); setErrors({}) }}
          >
            {t.tabPhone}
          </button>
          <button
            type="button"
            className={`toggle-option ${mode === 'id' ? 'active' : ''}`}
            onClick={() => { setMode('id'); setIdentifier(''); setErrors({}) }}
          >
            {t.tabId}
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>{t.fullName}</label>
            <input
              type="text"
              placeholder={t.fullNamePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>

          <div className="field">
            <label>{mode === 'phone' ? t.phoneNumber : t.idNumber}</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder={mode === 'phone' ? t.phonePlaceholder : t.idPlaceholder}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            {errors.identifier && <div className="error-text">{errors.identifier}</div>}
          </div>

          <div className="field">
            <label>{t.password}</label>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <div className="field">
            <label>{t.preferredLanguage}</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {languageOrder.map((code) => (
                <option key={code} value={code}>{translations[code].langName}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
            {t.submit}
          </button>
        </form>

        <div className="footer-link">
          {t.haveAccount} <button onClick={() => navigate('/login')}>{t.logInLink}</button>
        </div>
      </div>
    </div>
  )
}
