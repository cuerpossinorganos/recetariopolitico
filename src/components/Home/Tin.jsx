import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { TIN, TIN_ITEMS } from '../../data/tin'
import './Tin.css'

const polygon = (points) => `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`
const LID_CLIP = polygon(TIN.lidShape)
const [LID_OX, LID_OY] = TIN.lidOrigin
const SPRING = { type: 'spring', stiffness: 70, damping: 15, mass: 1 }
const CLOSED = TIN.closedImage
const CLOSED_CLIP = polygon(CLOSED.shape)

// Un objeto dentro de la lata. Es una copia exacta de lo que ya está dibujado en la lata abierta:
// al pasar el puntero (o la categoría) se despega un poco; al elegirlo sube hasta salir de la lata
// y, desde ahí, se acerca para leerlo (igual que los papeles del sobre).
function TinItem({ item, index, raised, active, hidden, busy, reduce, onHover, onPick, onLifted }) {
  const ref = useRef(null)
  const variants = {
    rest: { y: '0%', scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 130, damping: 16 } },
    hover: {
      y: '-5.5%',
      scale: 1.045,
      rotate: index % 2 ? 1.1 : -1.1,
      transition: { type: 'spring', stiffness: 260, damping: 17 },
    },
    lift: {
      y: '-12%',
      scale: 1.1,
      rotate: 0,
      transition: { duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }
  const state = active ? 'lift' : raised ? 'hover' : 'rest'

  return (
    <motion.div
      ref={ref}
      className="tin__item"
      data-raised={state !== 'rest' ? 'true' : undefined}
      style={{
        left: `${item.left}%`,
        top: `${item.top}%`,
        width: `${item.width}%`,
        height: `${item.height}%`,
        zIndex: state !== 'rest' ? 30 : index + 2,
        visibility: hidden ? 'hidden' : undefined,
      }}
      data-lifted={active ? 'true' : undefined}
      variants={variants}
      initial={false}
      animate={reduce && state === 'hover' ? 'rest' : state}
      onAnimationComplete={(definition) => {
        if (definition === 'lift') onLifted(item, ref.current)
      }}
    >
      <button
        type="button"
        className="tin__item-hit"
        style={{ clipPath: polygon(item.shape) }}
        aria-label={`Sacar de la lata: ${item.title}`}
        aria-haspopup="dialog"
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') onHover(item.id)
        }}
        onPointerLeave={() => onHover(null)}
        onFocus={(e) => {
          if (e.currentTarget.matches(':focus-visible')) onHover(item.id)
        }}
        onBlur={() => onHover(null)}
        onClick={() => {
          if (!busy) onPick(item.id)
        }}
      >
        <img src={item.image} alt="" draggable={false} />
      </button>
      {/* Al salir de la lata el objeto se muestra como en su ilustración propia */}
      <img
        className="tin__item-face"
        src={item.face.image}
        alt=""
        draggable={false}
        style={{ width: `${item.face.width}%`, aspectRatio: item.face.ratio }}
      />
    </motion.div>
  )
}

// La lata de galletas. Cerrada, la tapa está sobre la boca; al abrirla la tapa se corre y aparecen
// sus objetos. Tocar la tapa abre y cierra la lata.
//   open        la lata está abierta
//   raisedId    objeto que se está destacando (por el puntero o por su categoría)
//   activeId    objeto que está saliendo de la lata para abrirse
//   hiddenId    objeto cuya copia está en el visor (se oculta aquí)
export default function Tin({ open, onToggle, raisedId, activeId, hiddenId, onHover, onPick, onLifted }) {
  const reduce = useReducedMotion()
  const busy = activeId !== null
  const closed = TIN.lidClosed

  const lidPose = open
    ? { x: '0%', y: '0%', rotate: 0, scale: 1 }
    : { x: `${closed.x}%`, y: `${closed.y}%`, rotate: closed.rotate, scale: closed.scale }

  return (
    <div className="tin" data-open={open ? 'true' : 'false'}>
      <motion.div
        className="tin__group"
        style={{ aspectRatio: TIN.ratio }}
        initial={false}
        animate={{ x: open ? '0%' : `${TIN.closedShift}%` }}
        transition={reduce ? { duration: 0.01 } : SPRING}
      >
        {/* Las capas armadas (lata, objetos y tapa). Con la lata cerrada del todo se esconden, porque
            ahí se ve la ilustración real; solo se muestran al abrir y un instante al cerrar. */}
        <motion.div
          className="tin__stack"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={
            open || reduce
              ? { duration: reduce ? 0.01 : 0.05 }
              : { duration: 0.01, delay: 0.18 } // se esconde cuando tu lata cerrada ya cubrió todo
          }
        >
          {/* La lata sin contenido: la base de la lata cerrada y de la abierta */}
          <img className="tin__layer tin__band" src={TIN.layers.band} alt="" draggable={false} />
          {/* La lata abierta (sin la tapa): aparece al abrir */}
          <img className="tin__layer tin__body" src={TIN.layers.body} alt="" draggable={false} />

          {TIN_ITEMS.map((item, i) => (
            <TinItem
              key={item.id}
              item={item}
              index={i}
              raised={open && raisedId === item.id}
              active={activeId === item.id}
              hidden={hiddenId === item.id}
              busy={busy}
              reduce={reduce}
              onHover={onHover}
              onPick={onPick}
              onLifted={onLifted}
            />
          ))}

          <motion.div
            className="tin__lid"
            style={{ originX: LID_OX / 100, originY: LID_OY / 100 }}
            initial={false}
            animate={lidPose}
            transition={reduce ? { duration: 0.01 } : SPRING}
          >
            <img className="tin__layer" src={TIN.layers.lid} alt="" draggable={false} />
            <button
              type="button"
              className="tin__lid-hit"
              style={{ clipPath: LID_CLIP }}
              aria-label="Cerrar la lata"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              onClick={onToggle}
            />
          </motion.div>
        </motion.div>

        {/* La lata cerrada (ilustración real). Al abrir se funde con las capas de abajo, donde la
            tapa empieza a deslizarse; al cerrar aparece enseguida y tapa a la lata abierta. */}
        <motion.div
          className="tin__closed"
          style={{
            left: `${CLOSED.left}%`,
            top: `${CLOSED.top}%`,
            width: `${CLOSED.width}%`,
            height: `${CLOSED.height}%`,
          }}
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: reduce ? 0.01 : open ? 0.35 : 0.16, ease: 'easeOut' }}
        >
          <motion.button
            type="button"
            className="tin__closed-hit"
            style={{ clipPath: CLOSED_CLIP }}
            aria-label="Abrir la lata"
            aria-expanded={open}
            tabIndex={open ? -1 : 0}
            aria-hidden={open}
            whileHover={reduce ? undefined : { y: '-1.6%', scale: 1.012, rotate: -0.6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            onClick={onToggle}
          >
            <img src={CLOSED.image} alt="" draggable={false} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
