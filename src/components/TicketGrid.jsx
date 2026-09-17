import React, { useState, useMemo } from 'react'
import { TicketItem } from './TicketItem'

export function TicketGrid({ tickets, onSelectTicket }) {
  const [viewMode, setViewMode] = useState('10x10')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (filter === 'available' && ticket.buyerName !== null) return false
      if (filter === 'sold' && ticket.buyerName === null) return false

      if (search.trim() !== '') {
        const query = search.trim().toLowerCase()
        const matchesNumber = ticket.number.includes(query)
        const matchesBuyer = ticket.buyerName?.toLowerCase().includes(query)
        return matchesNumber || matchesBuyer
      }

      return true
    })
  }, [tickets, filter, search])

  const isCompact = viewMode === '10x10'

  return (
    <div className="space-y-3">
      {/* Selector de Modo de visualización y Filtros */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-stone-700">Vista del Talonario:</span>
          <div className="inline-flex p-0.5 bg-stone-100 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setViewMode('10x10')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                isCompact
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>📱</span>
              <span>10x10 (Ver todos)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('5cols')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                !isCompact
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🔍</span>
              <span>5 columnas</span>
            </button>
          </div>
        </div>

        {/* Filtros por estado */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Todos (100)
          </button>
          <button
            type="button"
            onClick={() => setFilter('available')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'available'
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Libres ({tickets.filter((t) => !t.buyerName).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('sold')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'sold'
                ? 'bg-white text-red-600 font-bold shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Vendidos ({tickets.filter((t) => t.buyerName).length})
          </button>
        </div>

        {/* Buscador de número o comprador */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar número (ej. 07) o comprador..."
            className="w-full pl-8 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <svg
            className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grilla interactiva */}
      {filteredTickets.length > 0 ? (
        <div
          className={`transition-all ${
            isCompact
              ? 'grid grid-cols-10 gap-1 sm:gap-1.5 p-2 bg-stone-50/90 rounded-2xl border border-stone-200'
              : 'grid grid-cols-5 gap-2 sm:gap-2.5'
          }`}
        >
          {filteredTickets.map((ticket) => (
            <TicketItem
              key={ticket.number}
              ticket={ticket}
              onSelect={onSelectTicket}
              isCompact={isCompact}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <p className="text-sm font-medium">No se encontraron números</p>
          <p className="text-xs mt-1">Prueba cambiando el filtro o la búsqueda</p>
        </div>
      )}
    </div>
  )
}
