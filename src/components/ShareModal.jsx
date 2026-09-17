import React, { useState, useMemo } from 'react'
import { generateRaffleImage } from '../utils/generateRaffleImage'

export function ShareModal({ isOpen, onClose, tickets }) {
  const [isSharing, setIsSharing] = useState(false)
  const [feedback, setFeedback] = useState('')

  const availableTickets = tickets.filter((t) => !t.buyerName).map((t) => t.number)
  const soldTickets = tickets.filter((t) => t.buyerName).map((t) => t.number)

  // Genera la imagen automáticamente en memoria con cálculo instantáneo
  const imageUrl = useMemo(() => {
    if (!isOpen || !tickets || tickets.length === 0) return null
    return generateRaffleImage(tickets)
  }, [isOpen, tickets])

  if (!isOpen) return null

  const showFeedback = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 3000)
  }

  // Compartir o descargar la imagen generada
  const handleShareImage = async () => {
    if (!imageUrl) return
    setIsSharing(true)

    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const file = new File([blob], `talonario-rifa-${new Date().toISOString().slice(0, 10)}.png`, {
        type: 'image/png',
      })

      // En móviles que soportan compartir archivos (WhatsApp, etc.)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Talonario de Rifa (00-99)',
          text: `🎟️ Números de la rifa. Quedan ${availableTickets.length} libres.`,
        })
        showFeedback('¡Imagen compartida con éxito!')
      } else {
        // Descarga directa
        const link = document.createElement('a')
        link.download = `talonario-rifa-${new Date().toISOString().slice(0, 10)}.png`
        link.href = imageUrl
        link.click()
        showFeedback('¡Imagen descargada en tu galería / descargas!')
      }
    } catch (err) {
      console.error('Error al compartir imagen:', err)
      if (err.name !== 'AbortError') {
        showFeedback('Hubo un problema. Puedes compartir la lista de texto.')
      }
    } finally {
      setIsSharing(false)
    }
  }

  // Compartir texto formateado por WhatsApp
  const handleShareWhatsAppText = () => {
    const text = [
      '🎟️ *TALONARIO DE RIFA (00 al 99)* 🎟️',
      '━━━━━━━━━━━━━━━━━━━━',
      `🟢 *DISPONIBLES (${availableTickets.length}/100):*`,
      availableTickets.join(', '),
      '',
      `🔴 *VENDIDOS (${soldTickets.length}/100):*`,
      soldTickets.length > 0 ? soldTickets.join(', ') : 'Ninguno aún',
      '━━━━━━━━━━━━━━━━━━━━',
      '✨ *¡Elige tu número de la suerte antes de que se agoten!*',
    ].join('\n')

    if (navigator.share) {
      navigator.share({
        title: 'Números de la Rifa (00-99)',
        text: text,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
        }
      })
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  // Copiar solo números disponibles
  const handleCopyAvailable = async () => {
    try {
      await navigator.clipboard.writeText(availableTickets.join(', '))
      showFeedback('¡Números disponibles copiados!')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 border border-stone-200 sm:border-0 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Compartir Rifa</h2>
            <p className="text-xs text-stone-500">
              Vista previa de la imagen que se enviará
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {feedback && (
          <div className="mt-2.5 p-2 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-700 text-center animate-pulse">
            {feedback}
          </div>
        )}

        {/* Vista previa en vivo de la imagen con los 100 números */}
        <div className="my-3 overflow-y-auto flex-1 max-h-56 bg-stone-100/70 p-2 rounded-2xl border border-stone-200 flex flex-col items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Talonario de números listo para compartir"
              className="w-full max-w-[280px] rounded-xl shadow-xs border border-stone-200"
            />
          ) : (
            <div className="py-10 text-xs text-stone-400 font-medium">Generando vista previa...</div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="space-y-2">
          {/* Opción 1: Compartir / Descargar la imagen mostrada */}
          <button
            type="button"
            onClick={handleShareImage}
            disabled={isSharing || !imageUrl}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
          >
            <span>📸</span>
            <span>{isSharing ? 'Abriendo opciones...' : 'Compartir / Descargar Imagen'}</span>
          </button>

          {/* Opción 2: Texto WhatsApp */}
          <button
            type="button"
            onClick={handleShareWhatsAppText}
            className="w-full p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>💬</span>
            <span>Enviar Lista por WhatsApp ({availableTickets.length} libres)</span>
          </button>

          {/* Opción 3: Copiar disponibles */}
          <button
            type="button"
            onClick={handleCopyAvailable}
            className="w-full p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>📋</span>
            <span>Copiar solo números libres</span>
          </button>
        </div>

        <div className="mt-3 pt-2 border-t border-stone-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-stone-400 hover:text-stone-700 py-1"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
