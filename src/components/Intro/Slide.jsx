import { motion } from 'motion/react'
import LineReveal from './LineReveal'

// Una slide: el texto sube línea por línea; al salir se desvanece.
export default function Slide({ slide, skip, onDone }) {
  return (
    <motion.div
      className="slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.45 } }}
    >
      <LineReveal segments={slide.segments} skip={skip} onDone={onDone} />
    </motion.div>
  )
}
