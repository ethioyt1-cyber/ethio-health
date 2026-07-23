// Mock data representing participating health centers and hospitals.
// In a later phase this will be replaced by real facility data from the
// Addis Ababa Health Bureau's system.

export const healthCenters = [
  {
    id: 'yekatit12',
    name: 'Yekatit 12 Hospital',
    subcity: 'Arada',
    type: 'Hospital',
    services: ['General consultation', 'Laboratory', 'Imaging', 'Pharmacy'],
    rating: 4.3,
  },
  {
    id: 'zewditu',
    name: 'Zewditu Memorial Hospital',
    subcity: 'Kirkos',
    type: 'Hospital',
    services: ['General consultation', 'Maternity', 'Laboratory'],
    rating: 4.1,
  },
  {
    id: 'bole-hc',
    name: 'Bole Health Center',
    subcity: 'Bole',
    type: 'Health center',
    services: ['General consultation', 'Vaccination', 'Pharmacy'],
    rating: 4.5,
  },
  {
    id: 'gulele-hc',
    name: 'Gulele Health Center',
    subcity: 'Gulele',
    type: 'Health center',
    services: ['General consultation', 'Laboratory', 'Vaccination'],
    rating: 4.0,
  },
  {
    id: 'yeka-hc',
    name: 'Yeka Health Center',
    subcity: 'Yeka',
    type: 'Health center',
    services: ['General consultation', 'Maternity', 'Pharmacy'],
    rating: 3.9,
  },
  {
    id: 'tikur-anbessa',
    name: 'Tikur Anbessa Specialized Hospital',
    subcity: 'Lideta',
    type: 'Hospital',
    services: ['Specialist consultation', 'Imaging', 'Laboratory', 'Surgery'],
    rating: 4.4,
  },
]

function pad(n) {
  return n.toString().padStart(2, '0')
}

// Generates appointment slots for the next 3 days for a given center.
export function generateSlots(centerId) {
  const times = ['09:00', '09:30', '10:30', '11:00', '14:00', '14:30', '15:30']
  const slots = []
  const today = new Date()

  for (let dayOffset = 1; dayOffset <= 3; dayOffset++) {
    const date = new Date(today)
    date.setDate(today.getDate() + dayOffset)
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

    times.forEach((time, i) => {
      // Deterministic pseudo-availability so the same slot isn't always open,
      // but stays consistent across renders for a given center/day/time.
      const seed = (centerId.length + dayOffset * 7 + i * 3) % 5
      if (seed !== 0) {
        slots.push({
          id: `${centerId}-${dateStr}-${time}`,
          date: dateStr,
          time,
        })
      }
    })
  }
  return slots
}
