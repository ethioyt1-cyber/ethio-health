import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import BottomNav from '../components/BottomNav'
import { healthCenters } from '../data/healthCenters'
import { getSession } from '../utils/appointments'

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [session, setSession] = useState(null)

  useEffect(() => {
    const s = getSession()
    if (!s) {
      navigate('/login')
      return
    }
    setSession(s)
  }, [navigate])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return healthCenters
    return healthCenters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subcity.toLowerCase().includes(q)
    )
  }, [query])

  if (!session) return null

  return (
    <div className="app-shell">
      <LanguageSwitcher />
      <div className="app-header container">
        <div className="brand">
          <div className="brand-mark">EH</div>
          <div className="brand-name">{t.appName}</div>
        </div>
        <p className="tagline" style={{ margin: '4px 0 0' }}>
          {t.homeGreeting}, {session.fullName?.split(' ')[0]}
        </p>
      </div>

      <div className="app-body container">
        <input
          className="search-input"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="section-title">{t.nearbyTitle}</div>

        {filtered.length === 0 && <div className="empty-state">{t.noResults}</div>}

        {filtered.map((center) => (
          <div
            key={center.id}
            className="card"
            onClick={() => navigate(`/centers/${center.id}`)}
          >
            <div className="card-title-row">
              <div className="card-title">{center.name}</div>
              <div className="card-rating">★ {center.rating}</div>
            </div>
            <div className="card-meta">{center.subcity} · {center.type}</div>
            <div className="chip-row">
              {center.services.slice(0, 3).map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
