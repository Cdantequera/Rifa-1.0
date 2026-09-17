import React, { useState, useEffect } from 'react'

const checkIsStandalone = () => {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

const checkIsIOS = () => {
  if (typeof window === 'undefined') return false
  const userAgent = window.navigator.userAgent.toLowerCase()
  return (
    /iphone|ipad|ipod/.test(userAgent) &&
    !userAgent.includes('crios') &&
    !userAgent.includes('fxios')
  )
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(checkIsStandalone)
  const [isIOS] = useState(checkIsIOS)
  const [showPrompt, setShowPrompt] = useState(() => {
    if (checkIsStandalone()) return false
    if (checkIsIOS()) {
      return !sessionStorage.getItem('pwa_prompt_dismissed')
    }
    return false
  })

  useEffect(() => {
    if (isInstalled) return

    // 1. Capturar el evento de instalación nativo en Android / Chrome
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)

      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed')
      if (!dismissed) {
        setShowPrompt(true)
      }
    }

    // 2. Escuchar cuando la app se instala con éxito
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  // Disparar la instalación nativa de Android/Chrome
  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem('pwa_prompt_dismissed', 'true')
  }

  // No mostrar nada si ya está instalada o no hay aviso activo
  if (isInstalled || !showPrompt) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto bg-stone-900 text-white rounded-2xl shadow-2xl p-4 border border-stone-700 flex flex-col gap-3">
        {/* Encabezado del aviso */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-md shrink-0">
              🎟️
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Instalar App en tu Celular
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                {isIOS
                  ? 'Agrégala a tu pantalla de inicio para usarla sin navegador'
                  : 'Ábrela como una app nativa, a pantalla completa y sin conexión'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="text-stone-400 hover:text-white text-xs p-1"
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>

        {/* Contenido según el sistema operativo */}
        {isIOS ? (
          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700 text-xs text-stone-300 space-y-1.5">
            <p className="font-semibold text-white">Para instalar en tu iPhone:</p>
            <p className="flex items-center gap-1.5">
              <span>1. Toca el botón <strong>Compartir</strong></span>
              <span className="inline-block px-1.5 py-0.5 bg-stone-700 rounded text-[11px]">⎋</span>
              <span>(abajo en Safari).</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span>2. Selecciona <strong>"Agregar a pantalla de inicio"</strong></span>
              <span className="inline-block px-1.5 py-0.5 bg-stone-700 rounded text-[11px]">➕</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-900/50 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>📲</span>
              <span>Instalar Ahora con 1 Toque</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Más tarde
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
