import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import CardViewer from './CardViewer'
import './CardDeck.css'

// Las cards descansan en un abanico alrededor de la del centro (003), como en el diseño:
// la del centro está derecha y más abajo; las de los costados se inclinan hacia el centro
// y suben. Al arrastrar, el abanico "rueda": cada card toma la postura de su lugar.
//
// n = distancia de la card al centro, en separaciones entre cards (0 = centro).
const CENTER = 2 // índice de la card que descansa en el centro del abanico
const FIRST = 0 // card que se ve primero, en el centro: la 001. Las demás quedan a su derecha
const NUDGE_EVERY = 2000 // cada cuántos ms el abanico se mueve solo para avisar que se puede arrastrar
const NUDGE_SHIFT = 0.3 // cuánto se corre, en separaciones entre cards
const MAX_N = 3.2

// Inclinación en grados: las de la izquierda se inclinan a la derecha y viceversa.
// Las vecinas del centro ~15°, las de los extremos ~24°, y de ahí no pasan.
const arcRotate = (n) => {
  const a = Math.min(Math.abs(n), 2.7)
  return -Math.sign(n) * (19 * a - 3.5 * a ** 2)
}

// Cuánto suben respecto de la del centro, en anchos de card. En el diseño la vecina de la derecha
// queda un poco más arriba que la de la izquierda; esa diferencia se apaga hacia los extremos.
const arcLift = (n) => {
  const a = Math.min(Math.abs(n), MAX_N)
  const lean = 1 + 0.15 * Math.sign(n) * Math.min(1, Math.max(0, 2 - a))
  return 0.31 * a ** 1.69 * lean
}

function DeckCard({ card, index, trackX, pitch, cardW, hidden, reduce, onOpen, onFocusVisible }) {
  const liRef = useRef(null)
  const liftRef = useRef(null)
  const buttonRef = useRef(null)
  const down = useRef(null)

  // Postura en el abanico según dónde está la card ahora (se actualiza mientras se arrastra)
  const n = useTransform([trackX, pitch], ([x, p]) => index - CENTER + (p ? x / p : 0))
  const hover = useMotionValue(0) // 0 → 1 al pasar el puntero: la card se endereza un poco
  const rotate = useTransform([n, hover], ([v, h]) => arcRotate(v) * (1 - 0.5 * h))
  const lift = useTransform([n, cardW], ([v, cw]) => -arcLift(v) * cw)
  const zIndex = useTransform(n, (v) => 100 - Math.round(Math.abs(v) * 10))

  // Inclinación 3D según dónde está el puntero
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 220, damping: 20, mass: 0.6 }
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), spring)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), spring)

  const variants = reduce
    ? { hidden: { opacity: 0 }, rest: { opacity: 1 }, hover: {} }
    : {
        hidden: { opacity: 0, y: 70, rotate: 7 },
        rest: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          transition: { type: 'spring', stiffness: 110, damping: 15, delay: 0.1 + index * 0.07 },
        },
        hover: {
          y: -26,
          scale: 1.05,
          rotate: [0, -2.2, 1.4, 0],
          transition: {
            y: { type: 'spring', stiffness: 260, damping: 18 },
            scale: { type: 'spring', stiffness: 260, damping: 18 },
            rotate: { duration: 0.75, ease: 'easeOut' },
          },
        },
      }

  const setHover = (to) => {
    if (reduce) return
    animate(hover, to, { type: 'spring', stiffness: 160, damping: 18 })
  }

  const handlePointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const el = buttonRef.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px - 0.5)
    my.set(py - 0.5)
    el.style.setProperty('--sx', `${px * 100}%`)
    el.style.setProperty('--sy', `${py * 100}%`)
  }

  const handleClick = (e) => {
    // Si el puntero se arrastró, fue un desplazamiento del carrusel y no un clic
    const start = down.current
    down.current = null
    if (start && e.detail !== 0 && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return
    onOpen(card, liRef.current, liftRef.current, buttonRef.current)
  }

  return (
    <motion.li
      ref={liRef}
      className="deck__slot"
      style={{ '--i': index, rotate, y: lift, zIndex }}
    >
      <motion.div
        ref={liftRef}
        className="deck__lift"
        variants={variants}
        initial="hidden"
        whileInView="rest"
        whileHover="hover"
        viewport={{ once: true, amount: 0.2 }}
        onHoverStart={() => setHover(1)}
        onHoverEnd={() => setHover(0)}
      >
        <button
          ref={buttonRef}
          type="button"
          className={`deck__card ${hidden ? 'is-lifted' : ''}`}
          style={{ '--card-img': `url(${card.image})` }}
          aria-label={`Abrir la receta ${card.number}: ${card.title}`}
          onPointerDown={(e) => {
            down.current = { x: e.clientX, y: e.clientY }
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => {
            mx.set(0)
            my.set(0)
          }}
          onFocus={(e) => {
            if (e.currentTarget.matches(':focus-visible')) onFocusVisible(index)
          }}
          onClick={handleClick}
        >
          <motion.span className="deck__tilt" style={{ rotateX, rotateY, transformPerspective: 900 }}>
            <img src={card.image} alt="" draggable={false} />
            <span className="deck__grain" aria-hidden="true" />
            <span className="deck__sheen" aria-hidden="true" />
          </motion.span>
        </button>
      </motion.div>
    </motion.li>
  )
}

// Carrusel de cards sobre el mantel: se recorre arrastrando (o con trackpad y teclado) y la card
// más cercana queda en el centro. Al elegir una card se voltea y se amplía para leer su historia.
export default function CardDeck({ cards }) {
  const reduce = useReducedMotion()
  const deckRef = useRef(null)
  const x = useMotionValue(0) // cuánto se corrió el abanico (px)
  const pitch = useMotionValue(0) // separación entre cards (px)
  const cardW = useMotionValue(0) // ancho de una card (px)
  const [limits, setLimits] = useState({ min: 0, max: 0 })
  const [open, setOpen] = useState(null) // { card, origin }
  const [liftedId, setLiftedId] = useState(null)
  const [hint, setHint] = useState(true) // el aviso de "arrastra" se ve hasta que alguien recorre las cards
  const wheelTimer = useRef(null)
  const inView = useRef(false) // el abanico está a la vista
  const overCard = useRef(false) // el puntero está sobre una card
  const nudging = useRef(false) // el movimiento de aviso está en curso

  // Medidas reales: el tamaño de la card y la separación vienen del CSS
  useEffect(() => {
    const deck = deckRef.current
    const observer = new ResizeObserver(() => {
      const cw = deck.querySelector('.deck__slot')?.offsetWidth ?? 0
      const ratio = parseFloat(getComputedStyle(deck).getPropertyValue('--pitch-ratio')) || 1.37
      if (!cw) return
      const p = cw * ratio
      const before = pitch.get()
      cardW.set(cw)
      pitch.set(p)
      setLimits({ min: -(cards.length - 1 - CENTER) * p, max: CENTER * p })
      // La primera vez, la card FIRST queda en el centro; al cambiar de tamaño se conserva la posición
      x.set(before ? (x.get() / before) * p : (CENTER - FIRST) * p)
    })
    observer.observe(deck)
    return () => observer.disconnect()
  }, [cards.length, cardW, pitch, x])

  // Solo se avisa mientras el abanico se ve en pantalla
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting
    }, { threshold: 0.35 })
    io.observe(deckRef.current)
    return () => io.disconnect()
  }, [])

  const clampX = (value) => Math.min(limits.max, Math.max(limits.min, value))

  // La card más cercana al centro queda exactamente en el centro
  const snapTo = (value) => {
    const p = pitch.get()
    if (!p) return clampX(value)
    return clampX(Math.round(value / p) * p)
  }

  const glideTo = (target) =>
    animate(x, target, { type: 'spring', stiffness: 150, damping: 24, restDelta: 0.5 })

  const handleDragEnd = (_, info) => {
    glideTo(snapTo(x.get() + info.velocity.x * 0.2))
  }

  // Si el aviso se está moviendo y alguien toca el abanico, vuelve a su lugar de inmediato
  const settle = () => {
    if (!nudging.current) return
    nudging.current = false
    glideTo(snapTo(x.get()))
  }

  // Cada 2 segundos, un movimiento lento hacia la izquierda y de vuelta: así se entiende que el
  // abanico se puede recorrer. Se detiene cuando alguien lo arrastra, y se pausa mientras hay una
  // card abierta, el puntero está sobre una card, la pestaña está oculta o el abanico no se ve.
  useEffect(() => {
    if (reduce || !hint || open) return undefined
    const id = window.setInterval(() => {
      if (!inView.current || overCard.current || document.hidden || nudging.current) return
      if (x.isAnimating() || !pitch.get()) return
      const from = x.get()
      nudging.current = true
      animate(x, [from, from - pitch.get() * NUDGE_SHIFT, from], {
        duration: 1.15,
        ease: 'easeInOut',
        onComplete: () => {
          nudging.current = false
        },
      })
    }, NUDGE_EVERY)
    return () => window.clearInterval(id)
  }, [reduce, hint, open, x, pitch])

  // Trackpad: el gesto horizontal recorre las cards y al soltar se acomodan
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    nudging.current = false
    setHint(false)
    x.stop()
    x.set(clampX(x.get() - e.deltaX))
    window.clearTimeout(wheelTimer.current)
    wheelTimer.current = window.setTimeout(() => glideTo(snapTo(x.get())), 160)
  }

  useEffect(() => () => window.clearTimeout(wheelTimer.current), [])

  // Con teclado, la card enfocada pasa al centro
  const handleFocusVisible = (index) => {
    nudging.current = false
    setHint(false)
    glideTo(clampX(-(index - CENTER) * pitch.get()))
  }

  // Posición, tamaño e inclinación de la card en pantalla: desde ahí arranca el zoom
  const handleOpen = (card, li, lift, button) => {
    const rect = button.getBoundingClientRect()
    const a = new DOMMatrix(getComputedStyle(li).transform)
    const b = new DOMMatrix(getComputedStyle(lift).transform)
    setLiftedId(card.id)
    setOpen({
      card,
      origin: {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
        width: li.offsetWidth * Math.hypot(a.a, a.b) * Math.hypot(b.a, b.b),
        rotate: (Math.atan2(a.b, a.a) * 180) / Math.PI + (Math.atan2(b.b, b.a) * 180) / Math.PI,
      },
    })
  }

  return (
    <div
      className="deck"
      ref={deckRef}
      onWheel={handleWheel}
      onPointerDown={settle}
      onPointerMove={(e) => {
        const over = Boolean(e.target.closest?.('.deck__slot'))
        overCard.current = over
        if (over) settle()
      }}
      onPointerLeave={() => {
        overCard.current = false
      }}
    >
      <motion.ul
        className="deck__track"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: limits.min, right: limits.max }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => {
          nudging.current = false
          setHint(false)
          x.stop()
        }}
        onDragEnd={handleDragEnd}
      >
        {cards.map((card, i) => (
          <DeckCard
            key={card.id}
            card={card}
            index={i}
            trackX={x}
            pitch={pitch}
            cardW={cardW}
            hidden={liftedId === card.id}
            reduce={reduce}
            onOpen={handleOpen}
            onFocusVisible={handleFocusVisible}
          />
        ))}
      </motion.ul>

      <AnimatePresence>
        {hint && (
          <motion.p
            key="hint"
            className="deck__hint"
            aria-hidden="true"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.6 } }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.3 } }}
          >
            <svg className="deck__hint-arrow" viewBox="0 0 24 12" focusable="false">
              <path d="M22 6H3M8 1.5 3 6l5 4.5" />
            </svg>
            <span className="deck__hint-mouse">Arrastra para ver las demás</span>
            <span className="deck__hint-touch">Desliza para ver las demás</span>
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={() => setLiftedId(null)}>
        {open && (
          <CardViewer
            key={open.card.id}
            card={open.card}
            origin={open.origin}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
