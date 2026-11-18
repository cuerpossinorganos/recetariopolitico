import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const BASE_MS = 26 // ms por letra
const BETWEEN_SEGMENTS_MS = 450
const PAUSES = { ',': 140, ';': 200, ':': 220, '.': 320, '?': 320, '!': 320 }

// Instante (ms desde el inicio) en que aparece cada letra. Tiene un pequeño
// ritmo irregular y pausas en la puntuación para que se sienta escrito a mano.
function buildTimes(segments, startDelay) {
  const times = []
  let t = startDelay
  segments.forEach((seg, s) => {
    if (s > 0) t += BETWEEN_SEGMENTS_MS
    for (let i = 0; i < seg.text.length; i++) {
      const ch = seg.text[i]
      const jitter = 0.7 + ((ch.charCodeAt(0) * 31 + i * 17) % 60) / 100
      times.push(t)
      t += BASE_MS * jitter + (PAUSES[ch] ?? 0)
    }
  })
  return times
}

// Escribe los segmentos de texto letra por letra.
// `skip` en true termina de escribir de golpe; `onDone` avisa cuando terminó.
export default function Typewriter({ segments, skip = false, onDone, startDelay = 500 }) {
  const reduce = useReducedMotion()
  const times = useMemo(() => buildTimes(segments, startDelay), [segments, startDelay])
  const starts = useMemo(
    () =>
      segments.map((_, k) =>
        segments.slice(0, k).reduce((sum, seg) => sum + seg.text.length, 0),
      ),
    [segments],
  )
  const total = times.length

  const [count, setCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const complete = finished || skip || reduce

  const raf = useRef(0)
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (complete) return

    const t0 = performance.now()
    let shown = 0
    const tick = (now) => {
      const elapsed = now - t0
      let n = shown
      while (n < total && times[n] <= elapsed) n++
      if (n !== shown) {
        shown = n
        setCount(n)
      }
      if (n >= total) {
        setFinished(true)
        return
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [complete, times, total])

  useEffect(() => {
    if (complete) onDoneRef.current?.()
  }, [complete])

  const visible = complete ? total : count

  return (
    <div className="tw">
      <p className="sr-only">{segments.map((s) => s.text).join(' ')}</p>
      <div aria-hidden="true">
        {segments.map((seg, k) => {
          const n = Math.max(0, Math.min(seg.text.length, visible - starts[k]))
          return (
            <p key={k} className={`tw__seg tw__seg--${seg.font ?? 'serif'}`}>
              <span>{seg.text.slice(0, n)}</span>
              {/* El resto ocupa su lugar (invisible) para que el texto no salte de línea al escribirse */}
              <span className="tw__ghost">{seg.text.slice(n)}</span>
            </p>
          )
        })}
      </div>
    </div>
  )
}
