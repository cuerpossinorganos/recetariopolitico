import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Gate from './components/Intro/Gate'
import Intro from './components/Intro/Intro'
import Home from './components/Home/Home'
import { useAmbientSound } from './hooks/useAmbientSound'

// Etapas: 'gate' (entrada) → 'intro' (slides) → 'home' (página de inicio)
function App() {
  const [stage, setStage] = useState('gate')
  const sound = useAmbientSound()

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

  const handleReplay = useCallback(() => setStage('gate'), [])

  return (
    <AnimatePresence mode="wait">
      {stage === 'gate' && <Gate key="gate" onEnter={handleEnter} />}
      {stage === 'intro' && <Intro key="intro" sound={sound} onFinish={handleFinish} />}
      {stage === 'home' && <Home key="home" onReplay={handleReplay} />}
    </AnimatePresence>
  )
}

export default App
