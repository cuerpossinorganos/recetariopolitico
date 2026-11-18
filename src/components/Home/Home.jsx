import { motion } from 'motion/react'
import './Home.css'

// Página de inicio provisoria: acá va la historia completa.
export default function Home({ onReplay }) {
  return (
    <motion.main
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Recetario Político</h1>
      <p>Página de inicio: acá va la historia completa.</p>
      <button type="button" onClick={onReplay}>
        Volver a ver la intro
      </button>
    </motion.main>
  )
}
