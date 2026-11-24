import { createElement, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import envelopeBack from '../../assets/home/sobre-fondo.webp'
import envelopeFront from '../../assets/home/sobre-frente.webp'
import { ENVELOPE, papers } from '../../data/papers'
import CardViewer from './CardViewer'
import DespensaSheet from './DespensaSheet'
import PermisoSheet from './PermisoSheet'
import PaperViewer from './PaperViewer'
import './Envelope.css'

const ENV_BOX = 1100 / 1364 // ancho / alto de las imágenes del sobre

// Al abrirse, cada papel se voltea y muestra su hoja con texto (con el diseño de las recetas).
// Si un papel no tiene hoja todavía, se abre tal cual, en grande.
const SHEETS = { permiso: PermisoSheet, despensa: DespensaSheet }

// Un papel dentro del sobre. Al pasar el puntero (o enfocarlo) asoma un poco; al elegirlo
// sube hasta salir del sobre y, desde ahí, se acerca para leerse.
function Paper({ paper, index, active, hidden, busy, reduce, onPick, onLifted }) {
  const ref = useRef(null)
  const { cx, cy, w, rot, ratio } = paper.pose
  const h = w * ratio * ENV_BOX // alto en % del alto del sobre

  const variants = {
    rest: {
      y: 0,
      rotate: rot,
      transition: { type: 'spring', stiffness: 110, damping: 15 },
    },
    hover: {
      y: '-6.5%',
      rotate: rot + 1.3,
      transition: { type: 'spring', stiffness: 240, damping: 16 },
    },
    lift: {
      y: `-${paper.lift * 100}%`,
      rotate: rot,
      transition: { duration: reduce ? 0.01 : 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Posición dentro del sobre (el sobre entero está inclinado, así que "arriba" sigue su eje)
  const style = {
    left: `${cx - w / 2}%`,
    top: `${cy - h / 2}%`,
    width: `${w}%`,
    zIndex: active ? 3 : index + 1,
    visibility: hidden ? 'hidden' : 'visible',
  }

  const handleClick = () => {
    if (!busy) onPick(paper)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      className="env__paper"
      style={style}
      variants={variants}
      initial={false}
      animate={active ? 'lift' : 'rest'}
      whileHover={busy || reduce ? undefined : 'hover'}
      whileFocus={busy || reduce ? undefined : 'hover'}
      onAnimationComplete={(definition) => {
        if (definition === 'lift') onLifted(paper, ref.current)
      }}
      onClick={handleClick}
      aria-label={`Leer: ${paper.title}`}
      aria-haspopup="dialog"
    >
      <img src={paper.image} alt="" draggable={false} />
    </motion.button>
  )
}

// El sobre con los dos papeles. Cada papel se abre en un visor propio.
export default function Envelope() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState(null) // papel que está saliendo / abierto
  const [open, setOpen] = useState(null) // { paper, origin } mientras el visor está abierto
  const [hiddenId, setHiddenId] = useState(null) // papel que se oculta mientras su copia está en el visor

  const busy = activeId !== null

  const handlePick = (paper) => {
    setActiveId(paper.id)
  }

  // El papel terminó de salir: el visor toma su lugar exacto (posición, tamaño e inclinación)
  const handleLifted = (paper, el) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    setHiddenId(paper.id)
    setOpen({
      paper,
      origin: {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
        width: el.offsetWidth,
        rotate: ENVELOPE.rot + paper.pose.rot,
      },
    })
  }

  // Ya se cerró el visor: el papel reaparece afuera del sobre y vuelve a entrar
  const handleExited = () => {
    setHiddenId(null)
    setActiveId(null)
  }

  return (
    <div className="env-wrap">
      <div className="env">
        <img className="env__img env__back" src={envelopeBack} alt="" draggable={false} />

        {papers.map((paper, i) => (
          <Paper
            key={paper.id}
            paper={paper}
            index={i}
            active={activeId === paper.id}
            hidden={hiddenId === paper.id}
            busy={busy}
            reduce={reduce}
            onPick={handlePick}
            onLifted={handleLifted}
          />
        ))}

        <img
          className="env__img env__front"
          src={envelopeFront}
          alt=""
          draggable={false}
          style={{ opacity: ENVELOPE.frontOpacity }}
        />
      </div>

      <AnimatePresence onExitComplete={handleExited}>
        {open &&
          (SHEETS[open.paper.id] ? (
            <CardViewer
              key={open.paper.id}
              card={{
                id: open.paper.id,
                title: open.paper.title,
                image: open.paper.image,
                ratio: 1 / open.paper.pose.ratio,
              }}
              sheet={createElement(SHEETS[open.paper.id])}
              origin={open.origin}
              onClose={() => setOpen(null)}
            />
          ) : (
            <PaperViewer
              key={open.paper.id}
              paper={open.paper}
              origin={open.origin}
              onClose={() => setOpen(null)}
            />
          ))}
      </AnimatePresence>
    </div>
  )
}
