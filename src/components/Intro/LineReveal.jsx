import { Fragment, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Tiempos de la animación (segundos)
const START_DELAY = 0.35 // espera antes de la primera línea
const STAGGER = 0.2 // diferencia entre una línea y la siguiente
const DURATION = 1.1 // lo que tarda cada línea en subir

// Muestra el texto línea por línea: cada línea sube desde abajo hacia su lugar.
//
// El texto fluye normalmente (se parte en las mismas líneas que tendrá al final).
// Después de pintarlo se mide a qué línea visual pertenece cada palabra y se le
// da un retraso según su línea, así el corte de líneas es siempre el real del
// navegador, en cualquier ancho de pantalla.
//
// `skip` en true muestra todo de golpe; `onDone` avisa cuando terminó.
export default function LineReveal({ segments, skip = false, onDone }) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const onDoneRef = useRef(onDone)
  const [finished, setFinished] = useState(false)
  const complete = finished || skip || reduce

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.style.setProperty('--start', `${START_DELAY}s`)
    root.style.setProperty('--stagger', `${STAGGER}s`)
    root.style.setProperty('--duration', `${DURATION}s`)

    // Asigna a cada palabra su número de línea (por su posición vertical)
    const measure = () => {
      let line = -1
      let prevTop = -Infinity
      root.querySelectorAll('.tw__w').forEach((el) => {
        if (el.offsetTop > prevTop + 2) {
          line++
          prevTop = el.offsetTop
        }
        el.style.setProperty('--line', line)
      })
      return line + 1
    }

    const lines = measure()
    root.classList.add('is-ready') // arranca la animación con los retrasos ya puestos

    const totalMs = (START_DELAY + (lines - 1) * STAGGER + DURATION) * 1000
    const timer = setTimeout(() => setFinished(true), totalMs)

    // Si cambia el ancho mientras se anima, se recalculan las líneas
    const observer = new ResizeObserver(() => {
      if (!root.classList.contains('is-done')) measure()
    })
    observer.observe(root)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [segments])

  useEffect(() => {
    if (complete) onDoneRef.current?.()
  }, [complete])

  return (
    <div ref={rootRef} className={complete ? 'tw is-done' : 'tw'}>
      <p className="sr-only">{segments.map((s) => s.text).join(' ')}</p>
      <div aria-hidden="true">
        {segments.map((seg, k) => (
          <p key={k} className={`tw__seg tw__seg--${seg.font ?? 'serif'}`}>
            {seg.text.split(' ').map((word, i, words) => (
              <Fragment key={i}>
                <span className="tw__w">
                  <span>{word}</span>
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
    </div>
  )
}
