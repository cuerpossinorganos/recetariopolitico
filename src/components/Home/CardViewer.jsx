import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { animate, motion, useScroll } from 'motion/react'
import { CARD_RATIO } from '../../data/cards'
import { stories } from '../../data/stories'
import StoryPaper from './StoryPaper'
import './CardViewer.css'

const DURATION = 1.15
const EASE = [0.22, 1, 0.36, 1] // desplazamiento y zoom: arranca rápido y se asienta
const FLIP_EASE = [0.55, 0, 0.25, 1] // giro: parejo de principio a fin

// Barra fina arriba que muestra cuánto de la historia se leyó.
// Va en su propio componente para engancharse al lector cuando ya existe.
function ReadingProgress({ containerRef }) {
  const { scrollYProgress } = useScroll({ container: containerRef })
  return (
    <motion.div
      className="viewer__progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  )
}

// Medidas del visor. La historia se lee en una hoja ancha (más zoom que la card en la mesa)
// que llega hasta el borde de abajo de la pantalla y sigue hacia abajo con el scroll.
function measure(ratio = CARD_RATIO) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const sheetW = Math.min(vw * 0.96, 1100)
  const top = Math.max(14, vh * 0.035)
  const sheetH = vh - top
  // La card (cara de adelante) cabe dentro del ancho de la hoja
  const frontH = Math.min(sheetH * 0.92, sheetW / ratio)
  return { vw, vh, sheetW, sheetH, top, frontH, frontW: frontH * ratio }
}

// Visor de una card: sale de su lugar en la mesa, se voltea y se amplía mostrando la historia.
// Cuando termina de girar, la hoja pasa a ser un lector con scroll sin fin (hacia abajo).
// Al cerrar, vuelve arriba, se voltea de nuevo y regresa a su sitio.
//   card     { id, title, image, ratio? }  ratio = ancho / alto de la cara de adelante (por defecto, el de las cards)
//   sheet    hoja de atrás (por defecto, la historia de la receta); sirve para otros papeles, como "La despensa"
export default function CardViewer({ card, origin, onClose, sheet }) {
  const story = stories[card.id]
  const ratio = card.ratio ?? CARD_RATIO
  const [size, setSize] = useState(() => measure(ratio))
  const [phase, setPhase] = useState('flipping') // 'flipping' | 'reading'
  const scrollerRef = useRef(null)
  const closing = useRef(false)

  const requestClose = useCallback(() => {
    if (closing.current) return
    closing.current = true
    const finish = () => {
      setPhase('flipping')
      onClose()
    }
    const el = scrollerRef.current
    if (el && el.scrollTop > 2) {
      // Vuelve al principio de la historia antes de dar la vuelta
      animate(el.scrollTop, 0, {
        duration: Math.min(0.6, 0.25 + el.scrollTop / 6000),
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
    const onResize = () => setSize(measure(ratio))
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
  }, [requestClose, ratio])

  // En cuanto se puede leer, el foco pasa al lector (así funcionan espacio, flechas y re pág)
  useEffect(() => {
    if (phase === 'reading') scrollerRef.current?.focus({ preventScroll: true })
  }, [phase])

  // Estado inicial/final: la card de la mesa, con su mismo tamaño e inclinación
  const from = {
    x: origin.cx - size.vw / 2,
    y: origin.cy - (size.top + size.sheetH / 2),
    scale: origin.width / size.frontW,
    rotate: origin.rotate,
    rotateY: 0,
  }
  const to = { x: 0, y: 0, scale: 1, rotate: 0, rotateY: 180 }
  const reading = phase === 'reading'

  return createPortal(
    <div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      style={{
        '--sheet-w': `${size.sheetW}px`,
        '--sheet-top': `${size.top}px`,
      }}
    >
      <motion.div
        className="viewer__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        onClick={requestClose}
      />

      {/* Durante el giro: la card en 3D */}
      <motion.div
        className="viewer__card"
        style={{
          width: size.sheetW,
          height: size.sheetH,
          marginLeft: -size.sheetW / 2,
          top: size.top,
          transformPerspective: 2400,
          visibility: reading ? 'hidden' : 'visible',
          '--card-img': `url(${card.image})`,
        }}
        initial={from}
        animate={to}
        exit={from}
        transition={{
          duration: DURATION,
          ease: EASE,
          rotateY: { duration: DURATION, ease: FLIP_EASE },
        }}
        onAnimationComplete={() => {
          if (!closing.current) setPhase('reading')
        }}
      >
        <div className="viewer__face viewer__face--front">
          <div className="viewer__front" style={{ width: size.frontW, height: size.frontH }}>
            <img src={card.image} alt="" draggable={false} />
            <span className="viewer__grain" aria-hidden="true" />
          </div>
        </div>

        <div className="viewer__face viewer__face--back" aria-hidden="true">
          <div className="viewer__clip">
            {sheet ?? <StoryPaper story={story} card={card} />}
          </div>
        </div>
      </motion.div>

      {/* Ya girada: lector con scroll */}
      {reading && (
        <div
          className="reader"
          ref={scrollerRef}
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) requestClose()
          }}
        >
          <div className="reader__sheet">
            {sheet ?? <StoryPaper story={story} card={card} />}
          </div>
        </div>
      )}

      {reading && <ReadingProgress containerRef={scrollerRef} />}

      <motion.button
        type="button"
        className="viewer__close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.5 } }}
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
