import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { animate, motion } from 'motion/react'
import './PaperViewer.css'

const DURATION = 0.95
const EASE = [0.22, 1, 0.36, 1]

// Medidas del visor: el papel se lee grande, centrado, y si es más alto que la pantalla
// se sigue hacia abajo con el scroll.
function measure(paper) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const sheetW = Math.min(vw * 0.94, 780)
  const sheetH = sheetW * paper.pose.ratio
  const top = Math.max(14, vh * 0.04)
  return { vw, vh, sheetW, sheetH, top }
}

// Visor de un papel: sale del sobre, se acerca y queda grande para leerlo.
// Al cerrar vuelve al mismo punto del sobre desde donde salió.
export default function PaperViewer({ paper, origin, onClose }) {
  const [size, setSize] = useState(() => measure(paper))
  const [reading, setReading] = useState(false)
  const scrollerRef = useRef(null)
  const closing = useRef(false)

  const requestClose = useCallback(() => {
    if (closing.current) return
    closing.current = true
    const finish = () => {
      setReading(false)
      onClose()
    }
    const el = scrollerRef.current
    if (el && el.scrollTop > 2) {
      // Vuelve arriba antes de regresar al sobre
      animate(el.scrollTop, 0, {
        duration: Math.min(0.5, 0.2 + el.scrollTop / 6000),
        ease: 'easeInOut',
        onUpdate: (v) => {
          el.scrollTop = v
        },
        onComplete: finish,
      })
    } else {
      finish()
    }
  }, [onClose])

  useEffect(() => {
    const onResize = () => setSize(measure(paper))
    const onKeyDown = (e) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)

    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
    }
  }, [paper, requestClose])

  // Cuando ya se puede leer, el foco pasa al lector (funcionan espacio, flechas y re pág)
  useEffect(() => {
    if (reading) scrollerRef.current?.focus({ preventScroll: true })
  }, [reading])

  // Estado inicial/final: el papel como estaba en el sobre (mismo punto, tamaño e inclinación)
  const from = {
    x: origin.cx - size.vw / 2,
    y: origin.cy - (size.top + size.sheetH / 2),
    scale: origin.width / size.sheetW,
    rotate: origin.rotate,
  }
  const to = { x: 0, y: 0, scale: 1, rotate: 0 }

  return createPortal(
    <div className="pv" role="dialog" aria-modal="true" aria-label={paper.title}>
      <motion.div
        className="pv__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        onClick={requestClose}
      />

      <div
        ref={scrollerRef}
        className={`pv__scroller${reading ? ' is-reading' : ''}`}
        tabIndex={-1}
        onClick={(e) => {
          if (e.target === e.currentTarget) requestClose()
        }}
      >
        <motion.div
          className="pv__sheet"
          style={{ width: size.sheetW, marginTop: size.top, marginBottom: size.top }}
          initial={from}
          animate={to}
          exit={from}
          transition={{ duration: DURATION, ease: EASE }}
          onAnimationComplete={() => {
            if (!closing.current) setReading(true)
          }}
        >
          <img src={paper.image} alt={paper.title} draggable={false} />
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="pv__close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={requestClose}
        autoFocus
      >
        Cerrar
      </motion.button>
    </div>,
    document.body,
  )
}
