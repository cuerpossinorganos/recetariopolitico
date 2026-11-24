import { motion, useReducedMotion } from 'motion/react'
import glasses from '../../assets/home/lentes.webp'
import './Glasses.css'

const ROT = -119.3 // inclinación con la que descansan sobre la mesa (como en el diseño)

// Lentes olvidados sobre la mesa. No se pueden tocar ni abrir: solo se mueven un poco
// cuando el puntero pasa por encima, como si alguien los rozara.
export default function Glasses() {
  const reduce = useReducedMotion()

  // El contenedor no gira: así la sombra siempre cae hacia abajo, como la de las cards
  return (
    <div className="glasses" aria-hidden="true">
      <motion.img
        className="glasses__img"
        src={glasses}
        alt=""
        draggable={false}
        initial={{ rotate: ROT, x: 0, y: 0 }}
        animate={{ rotate: ROT, x: 0, y: 0 }}
        whileHover={reduce ? undefined : { rotate: ROT + 5, x: -9, y: 7 }}
        transition={{ type: 'spring', stiffness: 130, damping: 9, mass: 0.9 }}
      />
    </div>
  )
}
