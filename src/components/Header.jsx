import React from 'react'

export function Header({ tickets, onReset, onOpenShare }) {
  const total = tickets.length
  const soldCount = tickets.filter((t) => t.buyerName !== null).length
  const availableCount = total - soldCount
  const progressPercent = Math.round((soldCount / total) * 100)

  const handleResetClick = () => {
    if (
      window.confirm(
        '⚠️ ¿Estás seguro de que deseas REINICIAR toda la rifa?\n\nSe borrarán todos los compradores y todos los números volverán a estar disponibles.'
      )
    ) {
      onReset()
    }
  }

  return (
    <header className="space-y-4">
      {/* Barra superior con Título y Botones de Acción */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            100 Números (00-99)
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Gestor de Rifa
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón Compartir en Azul */}
          <button
            type="button"
            onClick={onOpenShare}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Compartir</span>
          </button>

          {/* Botón Reiniciar */}
          <button
            type="button"
            onClick={handleResetClick}
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Reiniciar rifa"
            aria-label="Reiniciar rifa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tarjetas de métricas: Disponibles (Azul) vs Vendidos (Rojo) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs shadow-blue-200">
            {availableCount}
          </div>
          <div>
            <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Disponibles</p>
            <p className="text-xs font-semibold text-blue-700">{total > 0 ? Math.round((availableCount / total) * 100) : 0}% libres</p>
          </div>
        </div>

        <div className="bg-red-50/60 border border-red-200/80 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-xs shadow-red-200">
            {soldCount}
          </div>
          <div>
            <p className="text-[11px] font-bold text-red-800 uppercase tracking-wider">Vendidos</p>
            <p className="text-xs font-semibold text-red-600">{progressPercent}% ocupados</p>
          </div>
        </div>
      </div>

      {/* Barra de progreso de azul a rojo */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-stone-500">
          <span className="font-medium">Progreso de venta</span>
          <span className="font-bold text-stone-700">{soldCount} de {total} boletos vendidos</span>
        </div>
        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-red-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  )
}
