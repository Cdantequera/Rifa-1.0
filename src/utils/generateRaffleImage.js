// Dibuja un rectángulo con esquinas redondeadas compatible con cualquier navegador
function drawRoundRect(ctx, x, y, width, height, radius, fill = true, stroke = true) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  if (fill) ctx.fill()
  if (stroke) ctx.stroke()
}

/**
 * Genera un archivo PNG en alta definición que contiene EXCLUSIVAMENTE
 * los 100 números de la rifa (00 al 99), con fondo blanco, rojo para vendidos
 * y blanco para disponibles, garantizando que todos los números sean 100% visibles.
 */
export function generateRaffleImage(tickets) {
  const canvas = document.createElement('canvas')
  const width = 640
  const height = 780
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // 1. Fondo blanco limpio
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // 2. Cabecera limpia y compacta
  const availableCount = tickets.filter((t) => !t.buyerName).length
  const soldCount = tickets.filter((t) => t.buyerName).length

  // Pastilla superior: TALONARIO OFICIAL
  ctx.fillStyle = '#eff6ff'
  ctx.strokeStyle = '#bfdbfe'
  ctx.lineWidth = 1
  drawRoundRect(ctx, 230, 20, 180, 26, 13, true, true)

  ctx.fillStyle = '#1d4ed8'
  ctx.font = 'bold 11px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('TALONARIO 00 AL 99', 320, 33)

  // Título principal
  ctx.fillStyle = '#1c1917'
  ctx.font = '900 24px system-ui, -apple-system, sans-serif'
  ctx.fillText('RIFA DE NÚMEROS', 320, 68)

  // Subtítulo con contadores
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = '#15803d'
  ctx.textAlign = 'right'
  ctx.fillText(`🟢 Libres: ${availableCount}`, 305, 96)

  ctx.fillStyle = '#78716c'
  ctx.textAlign = 'center'
  ctx.fillText('•', 320, 96)

  ctx.fillStyle = '#dc2626'
  ctx.textAlign = 'left'
  ctx.fillText(`🔴 Vendidos: ${soldCount}`, 335, 96)

  // Línea divisoria
  ctx.strokeStyle = '#e7e5e4'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(30, 114)
  ctx.lineTo(610, 114)
  ctx.stroke()

  // 3. Grilla 10x10 con los 100 números
  const startX = 30
  const startY = 126
  const cellSize = 50
  const gap = 9

  tickets.forEach((ticket, index) => {
    const col = index % 10
    const row = Math.floor(index / 10)
    const x = startX + col * (cellSize + gap)
    const y = startY + row * (cellSize + gap)

    const isSold = Boolean(ticket.buyerName)

    if (isSold) {
      // Casilla Vendida: Rojo sólido con texto blanco en negrita
      ctx.fillStyle = '#dc2626'
      ctx.strokeStyle = '#b91c1c'
      ctx.lineWidth = 1.5
      drawRoundRect(ctx, x, y, cellSize, cellSize, 8, true, true)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 20px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(ticket.number, x + cellSize / 2, y + cellSize / 2)
    } else {
      // Casilla Libre: Fondo blanco con borde y texto oscuro
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#d6d3d1'
      ctx.lineWidth = 1.5
      drawRoundRect(ctx, x, y, cellSize, cellSize, 8, true, true)

      ctx.fillStyle = '#1c1917'
      ctx.font = 'bold 20px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(ticket.number, x + cellSize / 2, y + cellSize / 2)
    }
  })

  // 4. Leyenda al pie de la imagen
  const legendY = 728

  // Muestra disponible
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#d6d3d1'
  ctx.lineWidth = 1.5
  drawRoundRect(ctx, 160, legendY - 10, 18, 18, 4, true, true)

  ctx.fillStyle = '#44403c'
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('Número Libre', 186, legendY)

  // Muestra vendido
  ctx.fillStyle = '#dc2626'
  ctx.strokeStyle = '#b91c1c'
  ctx.lineWidth = 1.5
  drawRoundRect(ctx, 360, legendY - 10, 18, 18, 4, true, true)

  ctx.fillStyle = '#dc2626'
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('Número Vendido', 386, legendY)

  // 5. Firma del proyecto al pie de la imagen
  ctx.fillStyle = '#a8a29e'
  ctx.font = '600 11px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Creado por Antequera Tech', 320, 756)

  return canvas.toDataURL('image/png')
}
