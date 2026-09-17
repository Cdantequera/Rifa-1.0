import { useState, useEffect } from 'react'

const STORAGE_KEY = 'rifa_app_tickets_v1'

// Genera los 100 números del '00' al '99'
const generateInitialTickets = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    number: index.toString().padStart(2, '0'),
    buyerName: null,
  }))
}

export function useRaffle() {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === 100) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Error al leer de localStorage:', e)
    }
    return generateInitialTickets()
  })

  // Sincronizar en localStorage cada vez que cambien los boletos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
    } catch (e) {
      console.error('Error al guardar en localStorage:', e)
    }
  }, [tickets])

  // Asignar un número a un comprador (inmutable)
  const assignTicket = (numberStr, buyerName) => {
    const trimmedName = buyerName.trim()
    if (!trimmedName) return

    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.number === numberStr
          ? { ...ticket, buyerName: trimmedName }
          : ticket
      )
    )
  }

  // Liberar un número (cancelar venta)
  const releaseTicket = (numberStr) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.number === numberStr
          ? { ...ticket, buyerName: null }
          : ticket
      )
    )
  }

  // Reiniciar toda la rifa a su estado original
  const resetRaffle = () => {
    setTickets(generateInitialTickets())
  }

  return {
    tickets,
    assignTicket,
    releaseTicket,
    resetRaffle,
  }
}
