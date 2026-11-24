import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Gate from './components/Intro/Gate'
import Intro from './components/Intro/Intro'
import Home from './components/Home/Home'
import AboutProject from './components/About/AboutProject'
import { useAmbientSound } from './hooks/useAmbientSound'

// Páginas, por el hash de la dirección (funciona en cualquier hosting estático):
//   #/sobre-el-proyecto  →  página aparte "Sobre el proyecto"
//   cualquier otra cosa   →  inicio
const ABOUT_HASH = '#/sobre-el-proyecto'
const readRoute = () => (window.location.hash === ABOUT_HASH ? 'about' : 'home')

// Etapas del inicio: 'gate' (entrada) → 'intro' (slides) → 'home' (página de inicio).
// Quien llega directo a "Sobre el proyecto" no pasa por la entrada ni por la intro.
function App() {
  const [route, setRoute] = useState(readRoute)
  const [stage, setStage] = useState(() => (readRoute() === 'about' ? 'home' : 'gate'))
  const [homeFocus, setHomeFocus] = useState(null)
  const sound = useAmbientSound()

  // El botón "atrás" y los enlaces #/… cambian de página
  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const goHome = useCallback((focus = null) => {
    setHomeFocus(focus)
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    setRoute('home')
  }, [])

  const handleEnter = useCallback(
    (withSound) => {
      if (withSound) sound.enable()
      setStage('intro')
    },
    [sound],
  )

  const handleFinish = useCallback(() => {
    sound.disable()
    setStage('home')
  }, [sound])

  // Volver a ver la intro desde cualquier página
  const handleReplay = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setRoute('home')
    setStage('gate')
  }, [])

  const handleFocused = useCallback(() => setHomeFocus(null), [])

  return (
    <AnimatePresence mode="wait">
      {route === 'about' && (
        <AboutProject key="about" onReplay={handleReplay} onGoHome={goHome} />
      )}
      {route === 'home' && stage === 'gate' && <Gate key="gate" onEnter={handleEnter} />}
      {route === 'home' && stage === 'intro' && (
        <Intro key="intro" sound={sound} onFinish={handleFinish} />
      )}
      {route === 'home' && stage === 'home' && (
        <Home
          key="home"
          onReplay={handleReplay}
          focus={homeFocus}
          onFocused={handleFocused}
        />
      )}
    </AnimatePresence>
  )
}

export default App
