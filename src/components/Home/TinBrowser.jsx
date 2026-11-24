import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { TIN_ITEMS, TIN_CHIP_ORDER } from '../../data/tin'
import CardViewer from './CardViewer'
import Tin from './Tin'
import TinSheet from './TinSheet'
import './TinBrowser.css'

const ITEMS = Object.fromEntries(TIN_ITEMS.map((item) => [item.id, item]))

// Pestaña "Lata de galletas": una fila de categorías y la lata, cerrada. Tocar la tapa o cualquier
// categoría la abre. Ya abierta, cada categoría (o el objeto mismo) lo saca de la lata y lo acerca
// para leerlo, con el mismo visor que las recetas y el sobre.
export default function TinBrowser() {
  const [open, setOpen] = useState(false)
  const [raisedId, setRaisedId] = useState(null) // objeto destacado por el puntero / su categoría
  const [activeId, setActiveId] = useState(null) // objeto que está saliendo de la lata
  const [hiddenId, setHiddenId] = useState(null) // objeto cuya copia está en el visor
  const [viewer, setViewer] = useState(null) // { item, origin }

  const busy = activeId !== null

  const handleChip = (id) => {
    if (busy) return
    if (!open) setOpen(true)
    else setActiveId(id)
  }

  // El objeto terminó de salir: el visor toma su lugar exacto (posición y tamaño)
  const handleLifted = (item, el) => {
    if (!el) return
    // El visor arranca desde la cara nueva del objeto (no desde el recorte de la lata)
    const rect = (el.querySelector('.tin__item-face') ?? el).getBoundingClientRect()
    setHiddenId(item.id)
    setViewer({
      item,
      origin: { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2, width: rect.width, rotate: 0 },
    })
  }

  // El visor ya se cerró: el objeto vuelve a su lugar en la lata
  const handleExited = () => {
    setHiddenId(null)
    setActiveId(null)
  }

  return (
    <div className="tb">
      <div className="tb__chips" role="group" aria-label="Categorías de la lata de galletas">
        {TIN_CHIP_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className="tb__chip"
            onClick={() => handleChip(id)}
            onPointerEnter={(e) => e.pointerType !== 'touch' && setRaisedId(id)}
            onPointerLeave={() => setRaisedId(null)}
            onFocus={() => setRaisedId(id)}
            onBlur={() => setRaisedId(null)}
          >
            {ITEMS[id].chip}
          </button>
        ))}
      </div>

      <Tin
        open={open}
        onToggle={() => !busy && setOpen((v) => !v)}
        raisedId={raisedId}
        activeId={activeId}
        hiddenId={hiddenId}
        onHover={setRaisedId}
        onPick={setActiveId}
        onLifted={handleLifted}
      />

      <p className="tb__hint" aria-live="polite">
        {open ? 'Elige un objeto para sacarlo de la lata.' : 'Abre la lata: toca la tapa o elige una categoría.'}
      </p>

      <AnimatePresence onExitComplete={handleExited}>
        {viewer && (
          <CardViewer
            key={viewer.item.id}
            card={{
              id: viewer.item.id,
              title: viewer.item.title,
              image: viewer.item.face.image,
              ratio: viewer.item.face.ratio,
            }}
            sheet={<TinSheet title={viewer.item.title} />}
            origin={viewer.origin}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
