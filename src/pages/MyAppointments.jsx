import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import BottomNav from '../components/BottomNav'
import { generateSlots } from '../data/healthCenters'
import {
  getSession,
  getMyAppointments,
  rescheduleAppointment,
  cancelAppointment,
} from '../utils/appointments'

export default function MyAppointments() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [reschedulingId, setReschedulingId] = useState(null)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    if (!getSession()) {
      navigate('/login')
      return
    }
    setAppointments(getMyAppointments())
  }, [navigate])

  const reschedulingAppt = appointments.find((a) => a.id === reschedulingId)

  const slotsByDate = useMemo(() => {
    if (!reschedulingAppt) return {}
    const slots = generateSlots(reschedulingAppt.centerId)
    const groups = {}
    slots.forEach((s) => {
      if (!groups[s.date]) groups[s.date] = []
      groups[s.date].push(s)
    })
    return groups
  }, [reschedulingAppt])

  function refresh() {
    setAppointments(getMyAppointments())
  }

  function confirmReschedule() {
    const allSlots = Object.values(slotsByDate).flat()
    const slot = allSlots.find((s) => s.id === selectedSlotId)
    if (!slot || !reschedulingAppt) return
    rescheduleAppointment(reschedulingAppt.id, { date: slot.date, time: slot.time })
    setReschedulingId(null)
    setSelectedSlotId(null)
    refresh()
  }

  function confirmCancel() {
    cancelAppointment(cancelingId)
    setCancelingId(null)
    refresh()
  }

  return (
    <div className="app-shell">
      <LanguageSwitcher />
      <div className="app-header container">
        <div className="brand">
          <div className="brand-mark">EH</div>
          <div className="brand-name">{t.myAppointments}</div>
        </div>
      </div>

      <div className="app-body container">
        {appointments.length === 0 && (
          <div className="empty-state">{t.noAppointments}</div>
        )}

        {appointments.map((appt) => (
          <div key={appt.id} className="appt-card">
            <div className="card-title-row">
              <div className="card-title">{appt.centerName}</div>
            </div>
            <div className="card-meta">{appt.date} · {appt.time}</div>

            {reschedulingId === appt.id ? (
              <div style={{ marginTop: 14 }}>
                <div className="slot-group-label">{t.chooseNewSlot}</div>
                {Object.entries(slotsByDate).map(([date, daySlots]) => (
                  <div key={date}>
                    <div className="card-meta" style={{ margin: '8px 0 6px' }}>{date}</div>
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
                <div className="appt-actions">
                  <button onClick={() => { setReschedulingId(null); setSelectedSlotId(null) }}>
                    {t.keepIt}
                  </button>
                  <button
                    className="btn-primary"
                    style={{ border: 'none' }}
                    disabled={!selectedSlotId}
                    onClick={confirmReschedule}
                  >
                    {t.confirmBooking}
                  </button>
                </div>
              </div>
            ) : (
              <div className="appt-actions">
                <button onClick={() => { setReschedulingId(appt.id); setSelectedSlotId(null) }}>
                  {t.reschedule}
                </button>
                <button className="danger" onClick={() => setCancelingId(appt.id)}>
                  {t.cancel}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {cancelingId && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-title">{t.cancelConfirmTitle}</div>
            <div className="modal-body">{t.cancelConfirmBody}</div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setCancelingId(null)}>
                {t.keepIt}
              </button>
              <button
                className="btn btn-primary"
                style={{ background: 'var(--danger)' }}
                onClick={confirmCancel}
              >
                {t.yesCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
