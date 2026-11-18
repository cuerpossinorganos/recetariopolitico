import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { slides } from '../../data/slides'
import { chapters } from '../../data/chapters'
import { copy } from '../../data/copy'
import Logo from '../ui/Logo'
import Menu from '../Menu/Menu'
import Slide from './Slide'
import './Intro.css'

// Tiempo mínimo entre acciones: evita saltarse slides por clics repetidos
// y da tiempo a que termine la transición.
const LOCK_MS = 650
// Un gesto de scroll (o su inercia) cuenta como una sola acción.
const WHEEL_GAP_MS = 140
const SWIPE_PX = 40

const pad = (n) => String(n).padStart(2, '0')

export default function Intro({ sound, onFinish }) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(false) // el texto ya terminó de aparecer
  const [skip, setSkip] = useState(false) // pedir que se muestre completo
  const [menuOpen, setMenuOpen] = useState(false)

  const lastMove = useRef(-Infinity)
  const lastWheel = useRef(-Infinity)
  const touchY = useRef(null)

  const slide = slides[index]
  const chapterIndex = chapters.findIndex((c) => c.id === slide.chapter)
  const chapter = chapters[chapterIndex]

  const goTo = useCallback((next) => {
    setIndex(next)
    setTyped(false)
    setSkip(false)
  }, [])

  const handleTyped = useCallback(() => setTyped(true), [])

  // Avanzar: si el texto aún está apareciendo, primero lo muestra completo; después pasa a la siguiente.
  const advance = useCallback(() => {
    const now = performance.now()
    if (menuOpen || now - lastMove.current < LOCK_MS) return

    if (!typed) {
      setSkip(true)
      lastMove.current = now - LOCK_MS + 350
      return
    }

    lastMove.current = now
    if (index + 1 >= slides.length) {
      onFinish()
      return
    }
    goTo(index + 1)
  }, [menuOpen, typed, index, onFinish, goTo])

  const retreat = useCallback(() => {
    const now = performance.now()
    if (menuOpen || index === 0 || now - lastMove.current < LOCK_MS) return
    lastMove.current = now
    goTo(index - 1)
  }, [menuOpen, index, goTo])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (menuOpen || e.repeat || e.target.closest?.('button, a')) return

      if ([' ', 'Enter', 'ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        advance()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        retreat()
      }
    }

    const onWheel = (e) => {
      const now = performance.now()
      const gap = now - lastWheel.current
      lastWheel.current = now
      if (gap < WHEEL_GAP_MS || Math.abs(e.deltaY) < 8) return
      if (e.deltaY > 0) advance()
      else retreat()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('wheel', onWheel)
    }
  }, [advance, retreat, menuOpen])

  const handleClick = (e) => {
    if (e.target.closest('button')) return
    advance()
  }

  const handleTouchStart = (e) => {
    touchY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchY.current === null) return
    const dy = touchY.current - e.changedTouches[0].clientY
    touchY.current = null
    if (Math.abs(dy) < SWIPE_PX) return
    if (dy > 0) advance()
    else retreat()
  }

  const handleSelectChapter = (id) => {
    if (id === 'prologo') goTo(0)
  }

  return (
    <>
      <motion.div
        className="intro"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="intro__header">
          <Logo className="intro__logo" />

          <button
            type="button"
            className="boxed intro__chapter"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label={copy.menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{pad(chapterIndex + 1)}</span>
            <span className="intro__rule" aria-hidden="true" />
            <span className="intro__chapter-name">{chapter.title}</span>
          </button>
        </header>

        <div className="intro__stage">
          <AnimatePresence mode="wait">
            <Slide key={slide.id} slide={slide} skip={skip} onDone={handleTyped} />
          </AnimatePresence>
        </div>

        <footer className="intro__footer">
          <div className="intro__progress">
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.month}
                className="intro__month"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {slide.month}
              </motion.span>
            </AnimatePresence>
            <span className="intro__bar" aria-hidden="true">
              <motion.i
                animate={{ scaleX: (index + 1) / slides.length }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </div>

          <p className="intro__hint">{copy.hint}</p>

          <div className="intro__tools">
            <button type="button" className="boxed" onClick={onFinish}>
              {copy.skip}
            </button>
            <button
              type="button"
              className="boxed"
              aria-pressed={sound.enabled}
              onClick={(e) => {
                sound.toggle()
                e.currentTarget.blur()
              }}
            >
              {sound.enabled ? copy.soundOn : copy.soundOff}
            </button>
          </div>
        </footer>
      </motion.div>

      <Menu
        open={menuOpen}
        current={slide.chapter}
        reached={['prologo']}
        onSelect={handleSelectChapter}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
