import React, { useMemo, useState } from 'react'

export function BuyerList({ tickets, onSelectTicket }) {
  const [copied, setCopied] = useState(false)

  // Agrupar números por comprador
  const buyersSummary = useMemo(() => {
    const map = new Map()

    tickets.forEach((ticket) => {
      if (ticket.buyerName) {
        const name = ticket.buyerName.trim()
        if (!map.has(name)) {
          map.set(name, [])
        }
        map.get(name).push(ticket.number)
      }
    })

    return Array.from(map.entries())
      .map(([buyerName, numbers]) => ({
        buyerName,
        numbers: numbers.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
        count: numbers.length,
      }))
      .sort((a, b) => a.buyerName.localeCompare(b.buyerName))
  }, [tickets])

  const handleCopySummary = async () => {
    if (buyersSummary.length === 0) return

    const lines = [
      '📋 *RESUMEN DE LA RIFA (00-99)*',
      '━━━━━━━━━━━━━━━━━━━━',
      ...buyersSummary.map(
        (b) => `• *${b.buyerName}*: ${b.numbers.join(', ')} (${b.count} ${b.count === 1 ? 'número' : 'números'})`
      ),
      '━━━━━━━━━━━━━━━━━━━━',
      `Total vendidos: ${tickets.filter((t) => t.buyerName).length}/100`,
    ]

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-sm font-bold text-stone-900 leading-tight">
            Lista de Compradores
          </h3>
          <p className="text-[11px] text-stone-500">
            {buyersSummary.length} {buyersSummary.length === 1 ? 'comprador registrado' : 'compradores registrados'}
          </p>
        </div>

        {buyersSummary.length > 0 && (
          <button
            type="button"
            onClick={handleCopySummary}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        )}
      </div>

      {buyersSummary.length === 0 ? (
        <div className="py-8 text-center text-stone-400">
          <p className="text-sm font-medium text-stone-500">Aún no hay compras registradas</p>
          <p className="text-xs text-stone-400 mt-0.5">Toca cualquier número en la grilla para venderlo</p>
        </div>
      ) : (
        <div className="mt-3 divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
          {buyersSummary.map((item) => (
            <div key={item.buyerName} className="py-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-900">
                  {item.buyerName}
                </span>
                <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                  {item.count} {item.count === 1 ? 'número' : 'números'}
                </span>
              </div>

              {/* Formato: Juan: 03, 15, 99 (3 números) en pastillas rojas */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
                <span className="font-mono text-stone-400 font-medium">Números:</span>
                {item.numbers.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      const t = tickets.find((x) => x.number === num)
                      if (t) onSelectTicket(t)
                    }}
                    className="inline-flex items-center px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md font-mono font-bold transition-colors cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
