import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const svgPath = path.resolve('public', 'pwa-icon.svg')
const svgBuffer = fs.readFileSync(svgPath)

async function generateIcons() {
  console.log('Generando iconos PNG para PWA...')

  // 1. Icono 192x192 (Estándar Android PWA)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public', 'pwa-192x192.png'))
  console.log('✓ Creado public/pwa-192x192.png')

  // 2. Icono 512x512 (Pantalla de carga / Splash Screen / Alta definición)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public', 'pwa-512x512.png'))
  console.log('✓ Creado public/pwa-512x512.png')

  // 3. Icono 180x180 para Apple Touch Icon (iPhone / iPad)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public', 'apple-touch-icon.png'))
  console.log('✓ Creado public/apple-touch-icon.png')

  console.log('¡Todos los iconos PNG se generaron exitosamente!')
}

generateIcons().catch((err) => {
  console.error('Error generando iconos:', err)
  process.exit(1)
})
