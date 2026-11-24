import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contents } from '../../data/contents'
import RecipeBrowser from './RecipeBrowser'
import TinBrowser from './TinBrowser'
import './Contents.css'

const clamp = (min, v, max) => Math.min(max, Math.max(min, v))

// ---------- Interruptor día / noche ----------

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M5.4 18.6l1.8-1.8M16.8 7.2l1.8-1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M19.5 14.6A8.2 8.2 0 0 1 9.4 4.5a8.2 8.2 0 1 0 10.1 10.1Z" />
    </svg>
  )
}

function DayNightSwitch({ night, onToggle }) {
  return (
    <button
      type="button"
      className="tgl"
      role="switch"
      aria-checked={night}
      aria-label="Elegir lecturas de noche"
      onClick={onToggle}
    >
      <span className="tgl__icon tgl__icon--sun">
        <SunIcon />
      </span>
      <span className="tgl__icon tgl__icon--moon">
        <MoonIcon />
      </span>
      <span className="tgl__knob">
        <span className="tgl__face tgl__face--sun">
          <SunIcon />
        </span>
        <span className="tgl__face tgl__face--moon">
          <MoonIcon />
        </span>
      </span>
    </button>
  )
}

// ---------- Carpeta con pestañas ----------
// Medidas del diseño a 1920 px; todo se escala con el ancho de la pantalla (factor k).
const TAB_H = 59 // alto de la pestaña
const RADIUS = 12 // curvas
const TAB_W = 217 // ancho de la pestaña medido en la base
const SLANT = 36 // cuánto se inclina el costado derecho
const LEFTS = [62, 276] // dónde empieza cada pestaña (desde el borde izquierdo del panel)

// Contorno del panel + la pestaña activa, en un solo trazo
function activePath(W, H, k, slot) {
  const th = TAB_H * k
  const r = RADIUS * k
  const l = LEFTS[slot] * k
  const tr = l + (TAB_W - SLANT) * k // donde termina el borde de arriba de la pestaña
  const br = l + TAB_W * k // donde la inclinación toca el borde del panel
  return [
    `M ${br} ${th}`,
    `H ${W - 0.5}`,
    `V ${H - 0.5}`,
    'H 0.5',
    `V ${th + r}`,
    `Q 0.5 ${th} ${0.5 + r} ${th}`,
    `H ${l - r}`,
    `Q ${l} ${th} ${l} ${th - r}`,
    `V ${r}`,
    `Q ${l} 0.5 ${l + r} 0.5`,
    `H ${tr - r * 0.4}`,
    `Q ${tr} 0.5 ${tr + 3 * k} ${5 * k}`,
    `L ${br} ${th}`,
  ].join(' ')
}

// Pestaña que no está seleccionada: queda "detrás" y un poco más baja.
// Si está a la derecha de la activa es un paralelogramo inclinado igual que el costado de la activa;
// si está a la izquierda tiene el costado izquierdo recto.
const SIDE_LEFT = 257 // dónde empieza la pestaña de la derecha cuando no está activa
const SIDE_W = 171 // ancho de su borde de arriba

function inactivePath(k, slot, activeSlot) {
  const bottom = (TAB_H - 9) * k
  const rr = 6 * k
  if (slot > activeSlot) {
    const xl = SIDE_LEFT * k
    const xr = xl + SIDE_W * k
    const dx = 34 * k // cuánto se inclina
    return [
      `M ${xl + rr} 0.5`,
      `H ${xr - rr}`,
      `Q ${xr} 0.5 ${xr + 2 * k} ${4 * k}`,
      `L ${xr + dx - 1 * k} ${bottom - 5 * k}`,
      `Q ${xr + dx} ${bottom} ${xr + dx - 6 * k} ${bottom}`,
      `H ${xl + dx + 4 * k}`,
      `L ${xl - 1 * k} ${5 * k}`,
      `Q ${xl - 2 * k} 0.5 ${xl + rr} 0.5`,
      'Z',
    ].join(' ')
  }
  const r = RADIUS * k
  const l = LEFTS[slot] * k
  const tr = l + (TAB_W - SLANT) * k
  const sx = tr + 28 * k
  return [
    `M ${l + r} 0.5`,
    `H ${tr - r * 0.4}`,
    `Q ${tr} 0.5 ${tr + 3 * k} ${5 * k}`,
    `L ${sx} ${bottom - 5 * k}`,
    `Q ${sx + 2 * k} ${bottom} ${sx - 5 * k} ${bottom}`,
    `H ${l + 6 * k}`,
    `Q ${l} ${bottom} ${l} ${bottom - 6 * k}`,
    `V ${r}`,
    `Q ${l} 0.5 ${l + r} 0.5`,
    'Z',
  ].join(' ')
}

function Folder({ tabs, current, onSelect, children }) {
  const ref = useRef(null)
  const [dim, setDim] = useState({ w: 0, h: 0, k: 1 })

  useLayoutEffect(() => {
    const el = ref.current
    const measure = () =>
      setDim({
        w: el.clientWidth,
        h: el.clientHeight,
        k: clamp(0.62, window.innerWidth / 1920, 1.3),
      })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { w, h, k } = dim
  const activeSlot = tabs.findIndex((t) => t.id === current)

  return (
    <div className="folder" ref={ref}>
      {w > 0 && (
        <svg
          className="folder__outline"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          aria-hidden="true"
          focusable="false"
        >
          {tabs.map((t, i) => i !== activeSlot && <path key={t.id} d={inactivePath(k, i, activeSlot)} />)}
          <path d={activePath(w, h, k, activeSlot)} />
        </svg>
      )}

      <div className="folder__tabs" role="tablist" aria-label="Lecturas">
        {tabs.map((t, i) => {
          const behind = i > activeSlot // pestaña inactiva de la derecha
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={t.id === current}
              aria-controls="contents-panel"
              className="folder__tab"
              style={{
                left: (behind ? SIDE_LEFT + 4 : LEFTS[i]) * k,
                width: (behind ? SIDE_W + 18 : TAB_W - SLANT / 2) * k,
                paddingLeft: (behind ? 38 : 27) * k,
              }}
              onClick={() => onSelect(t.id)}
            >
              {t.id}
            </button>
          )
        })}
      </div>

      <div className="folder__panel" role="tabpanel" id="contents-panel" aria-labelledby={`tab-${current}`}>
        {children}
      </div>
    </div>
  )
}

// ---------- Sección ----------

export default function Contents() {
  const [mode, setMode] = useState('day') // 'day' | 'night'
  const [tabId, setTabId] = useState('01')
  const night = mode === 'night'
  const data = contents[mode]
  const tab = data.tabs.find((t) => t.id === tabId) ?? data.tabs[0]

  return (
    <section id="contenido" className="contents" data-mode={mode} aria-labelledby="contents-title">
      {/* Resplandor de arriba: uno por modo, se funden al cambiar */}
      <span className="contents__glow contents__glow--day" aria-hidden="true" />
      <span className="contents__glow contents__glow--night" aria-hidden="true" />

      <h2 id="contents-title" className="contents__title">
        Contenido
      </h2>

      <div className="contents__mode">
        <button
          type="button"
          className="contents__mode-label"
          aria-pressed={!night}
          onClick={() => setMode('day')}
        >
          Por el día
        </button>
        <DayNightSwitch night={night} onToggle={() => setMode(night ? 'day' : 'night')} />
        <button
          type="button"
          className="contents__mode-label"
          aria-pressed={night}
          onClick={() => setMode('night')}
        >
          Por la noche
        </button>
      </div>

      <p className="contents__time" aria-live="polite">
        {data.minutes ? `${data.minutes} minutos de lectura` : ''}
      </p>

      <Folder tabs={data.tabs} current={tab.id} onSelect={setTabId}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${mode}-${tab.id}`}
            className={`panel${tab.kind ? ` panel--${tab.kind}` : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {tab.heading && <h3 className="panel__heading">{tab.heading}</h3>}
            {tab.kind === 'recipes' ? (
              <RecipeBrowser />
            ) : tab.kind === 'tin' ? (
              <TinBrowser />
            ) : tab.items.length > 0 ? (
              <ul className="panel__list">
                {tab.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="panel__empty">Contenido por llegar.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </Folder>
    </section>
  )
}
