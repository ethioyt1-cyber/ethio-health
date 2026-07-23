import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

export default function LanguageSwitcher() {
  const { lang, setLang, languageOrder } = useLanguage()

  return (
    <div className="lang-bar">
      {languageOrder.map((code) => (
        <button
          key={code}
          className={`lang-pill ${lang === code ? 'active' : ''}`}
          onClick={() => setLang(code)}
        >
          {translations[code].langName}
        </button>
      ))}
    </div>
  )
}
