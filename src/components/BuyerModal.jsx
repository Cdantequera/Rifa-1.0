import React, { useState, useEffect, useRef } from 'react'

export function BuyerModal({ ticket, isOpen, onClose, onSave, onRelease }) {
  const [name, setName] = useState(ticket?.buyerName || '')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const isSold = Boolean(ticket?.buyerName)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !ticket) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Por favor ingresa un nombre para continuar')
      inputRef.current?.focus()
      return
    }
    onSave(ticket.number, trimmed)
    onClose()
  }

  const handleRelease = () => {
    if (window.confirm(`¿Seguro que deseas liberar el número ${ticket.number}?`)) {
      onRelease(ticket.number)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 border border-stone-200 sm:border-0"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-2xl font-black shadow-inner ${
                isSold
                  ? 'bg-red-600 text-white shadow-red-700/30'
                  : 'bg-blue-600 text-white shadow-blue-700/30'
              }`}
            >
              {ticket.number}
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">
                {isSold ? 'Detalles del Número' : 'Asignar Número'}
              </h2>
              <span
                className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-semibold ${
                  isSold
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isSold ? '● Vendido' : '● Libre / Disponible'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="buyerNameInput" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              {isSold ? 'Modificar Nombre del Comprador' : 'Nombre del Comprador'}
            </label>
            <input
              ref={inputRef}
              id="buyerNameInput"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              placeholder="Ej. Juan Pérez"
              className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                error
                  ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                  : 'border-stone-200 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {error && <p className="text-xs text-red-600 mt-1.5 font-semibold">{error}</p>}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-semibold rounded-xl shadow-md shadow-blue-200 active:scale-[0.98] transition-all cursor-pointer"
            >
              {isSold ? 'Guardar Cambios' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-base font-semibold rounded-xl transition-all active:scale-[0.98]"
            >
              Cancelar
            </button>
          </div>

          {isSold && (
            <div className="pt-2 border-t border-stone-100 text-center">
              <button
                type="button"
                onClick={handleRelease}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline py-1.5 inline-flex items-center gap-1.5 transition-colors"
              >
                Liberar este número (Marcar como disponible)
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
