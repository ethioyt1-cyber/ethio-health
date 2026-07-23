import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { healthCenters, generateSlots } from '../data/healthCenters'
import { bookAppointment } from '../utils/appointments'

export default function CenterDetail() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { centerId } = useParams()
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [booked, setBooked] = useState(false)

  const center = healthCenters.find((c) => c.id === centerId)
  const slots = useMemo(() => generateSlots(centerId), [centerId])

  const slotsByDate = useMemo(() => {
    const groups = {}
    slots.forEach((s) => {
      if (!groups[s.date]) groups[s.date] = []
      groups[s.date].push(s)
    })
    return groups
  }, [slots])

  if (!center) {
    return (
      <div className="screen">
        <div className="container main-content">
          <p>Center not found.</p>
          <button className="btn btn-secondary" onClick={() => navigate('/home')}>{t.back}</button>
        </div>
      </div>
    )
  }

  function handleConfirm() {
    const slot = slots.find((s) => s.id === selectedSlotId)
    if (!slot) return
    bookAppointment({
      centerId: center.id,
      centerName: center.name,
      date: slot.date,
      time: slot.time,
    })
    setBooked(true)
  }

  if (booked) {
    return (
      <div className="screen">
        <LanguageSwitcher />
        <div className="container main-content">
          <div className="brand">
            <div className="brand-mark">EH</div>
            <div className="brand-name">{t.appName}</div>
          </div>
          <h2 style={{ fontFamily: 'var(--font-latin)' }}>{t.bookingConfirmedTitle}</h2>
          <p className="tagline">{t.bookingConfirmedBody}</p>
          <button className="btn btn-primary" onClick={() => navigate('/appointments')}>
            {t.myAppointments}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="brand-name" style={{ fontSize: 17 }}>{center.name}</div>
      </div>
      <LanguageSwitcher />

      <div className="container app-body" style={{ paddingTop: 8 }}>
        <div className="card-meta" style={{ marginBottom: 2 }}>
          {t.subcityLabel}: {center.subcity} · {t.typeLabel}: {center.type}
        </div>
        <div className="chip-row" style={{ marginBottom: 8 }}>
          {center.services.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
        <div className="card-meta">{t.ratingLabel}: ★ {center.rating}</div>

        <div className="section-title" style={{ marginTop: 20 }}>{t.availableSlots}</div>

        {Object.entries(slotsByDate).map(([date, daySlots]) => (
          <div key={date}>
            <div className="slot-group-label">{date}</div>
            <div className="slot-grid">
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`slot-btn ${selectedSlotId === slot.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSlotId(slot.id)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          className="btn btn-primary"
          style={{ marginTop: 24 }}
          disabled={!selectedSlotId}
          onClick={handleConfirm}
        >
          {selectedSlotId ? t.confirmBooking : t.bookAppointment}
        </button>
      </div>
    </div>
  )
}
