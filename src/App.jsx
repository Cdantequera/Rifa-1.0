import React, { useState } from 'react'
import { useRaffle } from './hooks/useRaffle'
import { Header } from './components/Header'
import { TicketGrid } from './components/TicketGrid'
import { BuyerList } from './components/BuyerList'
import { BuyerModal } from './components/BuyerModal'
import { ShareModal } from './components/ShareModal'
import { InstallBanner } from './components/InstallBanner'

export default function App() {
  const { tickets, assignTicket, releaseTicket, resetRaffle } = useRaffle()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  return (
    <div className="min-h-screen bg-stone-100 py-0 sm:py-6 px-0 sm:px-4 flex justify-center items-start antialiased text-stone-800">
      {/* Contenedor Principal Mobile-First */}
      <main className="w-full max-w-md bg-white min-h-screen sm:min-h-0 sm:rounded-3xl shadow-sm sm:shadow-xl border-x sm:border border-stone-200 p-4 sm:p-5 flex flex-col gap-5">
        
        {/* Encabezado con estadísticas y botón de compartir */}
        <Header
          tickets={tickets}
          onReset={resetRaffle}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Sección del Talonario de Números */}
        <section>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-sm font-bold text-stone-800 tracking-tight">
              Talonario de Números
            </h2>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-stone-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-white border border-stone-300 shadow-2xs inline-block" />
                <span>Libre</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-600 border border-red-700 inline-block shadow-2xs" />
                <span>Vendido</span>
              </span>
            </div>
          </div>

          {/* Grilla interactiva (con soporte 10x10 para celular y 5 columnas) */}
          <TicketGrid tickets={tickets} onSelectTicket={handleSelectTicket} />
        </section>

        {/* Botón rápido para compartir imagen o lista */}
        <button
          type="button"
          onClick={() => setIsShareOpen(true)}
          className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Compartir Números de la Rifa (Foto o WhatsApp)</span>
        </button>

        {/* Resumen de compradores */}
        <section className="pb-1">
          <BuyerList tickets={tickets} onSelectTicket={handleSelectTicket} />
        </section>

        {/* Firma del proyecto */}
        <footer className="pt-2 pb-1 text-center border-t border-stone-100">
          <p className="text-xs font-medium text-stone-400 tracking-wide">
            Creado por <span className="font-bold text-stone-700">Antequera Tech</span>
          </p>
        </footer>
      </main>

      {/* Modal para asignar o gestionar un número */}
      {isModalOpen && selectedTicket && (
        <BuyerModal
          key={selectedTicket.number}
          ticket={selectedTicket}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={assignTicket}
          onRelease={releaseTicket}
        />
      )}

      {/* Modal para compartir la imagen (con vista previa en vivo) */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        tickets={tickets}
      />

      {/* Banner / aviso de instalación automática como App en el celular */}
      <InstallBanner />
    </div>
  )
}
