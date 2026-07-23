export function getSession() {
  const raw = localStorage.getItem('ethioHealthSession')
  return raw ? JSON.parse(raw) : null
}

function allAppointments() {
  return JSON.parse(localStorage.getItem('ethioHealthAppointments') || '[]')
}

function saveAll(appts) {
  localStorage.setItem('ethioHealthAppointments', JSON.stringify(appts))
}

export function getMyAppointments() {
  const session = getSession()
  if (!session) return []
  return allAppointments()
    .filter((a) => a.patientIdentifier === session.identifier)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

export function bookAppointment({ centerId, centerName, date, time }) {
  const session = getSession()
  if (!session) return null
  const appt = {
    id: `appt-${Date.now()}`,
    centerId,
    centerName,
    date,
    time,
    patientIdentifier: session.identifier,
    status: 'confirmed',
  }
  const appts = allAppointments()
  appts.push(appt)
  saveAll(appts)
  return appt
}

export function rescheduleAppointment(id, { date, time }) {
  const appts = allAppointments().map((a) =>
    a.id === id ? { ...a, date, time } : a
  )
  saveAll(appts)
}

export function cancelAppointment(id) {
  const appts = allAppointments().filter((a) => a.id !== id)
  saveAll(appts)
}
