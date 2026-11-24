import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cards } from '../../data/cards'
import CardViewer from './CardViewer'
import './RecipeBrowser.css'

// Las cards dentro de la zona Contenido: una fila de categorías (una por card) que las filtra,
// y debajo las cards. Al elegir una categoría queda solo su card; al tocarla se voltea y se
// amplía para leer su historia (el mismo visor que usan las cards de la mesa).
// Sirve para las recetas (de día) y para las historias de Sobremesa (de noche):
//   items     las cards; cada una trae { id, number, title, image, chip?, plant?, ratio? }
//   sheetOf   (card) => hoja de atrás; sin ella se usa la historia de la receta
//   noun      cómo se llaman en los avisos de lectura ("receta", "historia")
export default function RecipeBrowser({ items = cards, sheetOf, noun = 'receta' }) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState(null) // id de la card elegida o null = todas
  const [open, setOpen] = useState(null) // { card, origin }
  const [liftedId, setLiftedId] = useState(null)

  const visible = filter ? items.filter((c) => c.id === filter) : items
  const selected = filter ? items.find((c) => c.id === filter) : null

  const toggle = (id) => setFilter((current) => (current === id ? null : id))

  const handleOpen = (card, button) => {
    const rect = button.getBoundingClientRect()
    setLiftedId(card.id)
    setOpen({
      card,
      origin: {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
        width: rect.width,
        rotate: 0,
      },
    })
  }

  return (
    <div className="rb">
      <div className="rb__chips" role="group" aria-label={`Filtrar las ${noun}s por categoría`}>
        {items.map((card) => (
          <button
            key={card.id}
            type="button"
            className="rb__chip"
            aria-pressed={filter === card.id}
            onClick={() => toggle(card.id)}
          >
            {card.chip ?? card.plant}
          </button>
        ))}
      </div>

      <p className="rb__status" aria-live="polite">
        {selected ? (
          <>
            <span>
              {selected.number} · {selected.title}
            </span>
            <button type="button" className="rb__all" onClick={() => setFilter(null)}>
              Ver todas
            </button>
          </>
        ) : (
          <span className="sr-only">
            Mostrando las {items.length} {noun}s
          </span>
        )}
      </p>

      <ul className="rb__grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((card) => (
            <motion.li
              key={card.id}
              className="rb__item"
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className={`rb__card${liftedId === card.id ? ' is-lifted' : ''}`}
                aria-label={`Leer la ${noun} ${card.number}: ${card.title}`}
                onClick={(e) => handleOpen(card, e.currentTarget)}
              >
                <img src={card.image} alt="" draggable={false} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence onExitComplete={() => setLiftedId(null)}>
        {open && (
          <CardViewer
            key={open.card.id}
            card={open.card}
            sheet={sheetOf?.(open.card)}
            origin={open.origin}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
