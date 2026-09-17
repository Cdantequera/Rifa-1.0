import React from 'react'

export function TicketItem({ ticket, onSelect, isCompact = false }) {
  const isSold = Boolean(ticket.buyerName)

  // Modo compacto (10x10): Para ver todos los 100 números en pantalla móvil
  if (isCompact) {
    return (
      <button
        type="button"
        onClick={() => onSelect(ticket)}
        className={`
          relative aspect-square flex items-center justify-center rounded-md font-mono font-bold
          text-[11px] sm:text-xs transition-all duration-100 transform active:scale-90 select-none
          ${
            isSold
              ? 'bg-red-600 text-white font-black border border-red-700 shadow-xs hover:bg-red-700'
              : 'bg-white text-stone-800 border border-stone-200 hover:border-blue-500 hover:bg-blue-50/20 shadow-2xs'
          }
        `}
        title={isSold ? `Vendido a: ${ticket.buyerName}` : `Número ${ticket.number} libre`}
        aria-label={`Número ${ticket.number}, ${isSold ? `vendido a ${ticket.buyerName}` : 'disponible'}`}
      >
        <span>{ticket.number}</span>
      </button>
    )
  }

  // Modo detallado (5 columnas): Casillas más grandes con nombre
  return (
    <button
      type="button"
      onClick={() => onSelect(ticket)}
      className={`
        relative aspect-square flex flex-col items-center justify-center rounded-xl font-mono text-base font-bold
        transition-all duration-150 transform active:scale-95 select-none shadow-xs
        ${
          isSold
            ? 'bg-red-600 text-white hover:bg-red-700 border border-red-700 shadow-red-200'
            : 'bg-white text-stone-800 hover:bg-stone-50 hover:border-blue-500 border border-stone-200 shadow-stone-100'
        }
      `}
      title={isSold ? `Vendido a: ${ticket.buyerName}` : `Número ${ticket.number} libre`}
      aria-label={`Número ${ticket.number}, ${isSold ? `vendido a ${ticket.buyerName}` : 'disponible'}`}
    >
      <span className="text-lg leading-none tracking-tight">{ticket.number}</span>
      
      {isSold && (
        <span className="text-[9px] font-sans font-medium px-1 max-w-[90%] truncate mt-0.5 opacity-95">
          {ticket.buyerName}
        </span>
      )}
    </button>
  )
}
