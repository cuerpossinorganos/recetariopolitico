import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import logo from '../../assets/logo.png'
import { copy } from '../../data/copy'
import SwayingLogo from '../ui/SwayingLogo'
import './Gate.css'

// Duración mínima de la "carga": la pantalla se queda lo justo para que
// el logo se lea, aunque los recursos estén listos antes.
const MIN_MS = 2400

// Precarga las tipografías y el logo antes de mostrar la intro.
function preload() {
  const fonts = [
    'italic 400 1em "Lora Variable"',
    '400 1em "Lora Variable"',
    '400 1em "DM Sans Variable"',
  ].map((f) => document.fonts.load(f, 'áéíóúñÁÉÍÓÚÑ').catch(() => {}))

  const image = new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = logo
  })

  return Promise.all([...fonts, image])
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// Pantalla de carga y entrada. Cuando llega a 100% aparece "Empezar con sonido";
// "Empezar sin sonido" se puede pedir en cualquier momento y entra al terminar la carga.
// El clic es el gesto que habilita el audio en el navegador.
export default function Gate({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [queued, setQueued] = useState(false)
  const ready = progress >= 100

  useEffect(() => {
    let raf = 0
    let assetsReady = false
    preload().then(() => {
      assetsReady = true
    })

    const t0 = performance.now()
    const tick = (now) => {
      let p = easeInOut(Math.min(1, (now - t0) / MIN_MS)) * 100
      // Si los recursos aún no cargaron, esperamos al 90%
      if (!assetsReady) p = Math.min(p, 90)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (ready && queued) onEnter(false)
  }, [ready, queued, onEnter])

  return (
    <motion.main
      className="gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="gate__logo-wrap">
        <SwayingLogo className="gate__logo" />
      </h1>

      <div className="gate__footer">
        <span className="gate__pct" aria-live="off">
          {Math.floor(progress)}%
        </span>

        <div className="gate__center">
          {ready && !queued && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              onClick={() => onEnter(true)}
            >
              {copy.startSound}
            </motion.button>
          )}
        </div>

        <button type="button" className="gate__muted" onClick={() => setQueued(true)}>
          {copy.startMuted}
        </button>
      </div>

      <div className="gate__bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </motion.main>
  )
}
