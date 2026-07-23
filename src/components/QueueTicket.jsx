import { useLanguage } from '../i18n/LanguageContext'

export default function QueueTicket() {
  const { t } = useLanguage()

  return (
    <div className="ticket">
      <div className="ticket-row">
        <div>
          <div className="ticket-label">{t.ticketLabel}</div>
          <div className="ticket-value">A-014</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="ticket-label">{t.ticketWait}</div>
          <div className="ticket-value" style={{ fontSize: 18 }}>{t.ticketWaitValue}</div>
        </div>
      </div>
      <div className="ticket-divider" />
      <div className="ticket-sub">{t.ticketFacility}</div>
    </div>
  )
}
