import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { chapters } from '../../data/chapters'
import { copy } from '../../data/copy'
import Logo from '../ui/Logo'
import './Menu.css'

const pad = (n) => String(n).padStart(2, '0')

// Menú de capítulos en forma de ticket (como la referencia: el botón del capítulo
// despliega la lista y solo se puede volver a los capítulos ya alcanzados).
//   current   id del capítulo actual
//   reached   ids de los capítulos habilitados
//   onSelect  (id) => void al elegir un capítulo habilitado
export default function Menu({ open, current, reached = [], onSelect, onClose }) {
  const ticketRef = useRef(null)

  // Al abrir, el foco pasa al ticket (Esc y el fondo lo cierran)
  useEffect(() => {
    if (open) ticketRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.nav
            ref={ticketRef}
            tabIndex={-1}
            className="ticket"
            role="dialog"
            aria-modal="true"
            aria-label={copy.menuLabel}
            initial={{ y: -18, rotate: -1.2 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: -18, rotate: 0.8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ticket__top">
              <p className="ticket__meta">
                <span>{copy.menuPlace}</span>
                <span>{copy.menuDate}</span>
              </p>
              <Logo className="ticket__logo" />
            </div>

            <ol className="ticket__list">
              {chapters.map((chapter, i) => {
                const enabled = reached.includes(chapter.id)
                return (
                  <li key={chapter.id} className={enabled ? '' : 'is-locked'}>
                    <button
                      type="button"
                      className="ticket__chapter"
                      disabled={!enabled}
                      aria-current={current === chapter.id ? 'true' : undefined}
                      onClick={() => {
                        onSelect?.(chapter.id)
                        onClose()
                      }}
                    >
                      <span className="ticket__num">{pad(i + 1)}</span>
                      <span className="ticket__title">{chapter.title}</span>
                    </button>

                    {chapter.items && (
                      <ul className="ticket__items">
                        {chapter.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ol>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
