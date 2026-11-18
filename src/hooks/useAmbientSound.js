import { useCallback, useEffect, useState } from 'react'
import { startAmbient, stopAmbient } from '../audio/ambient'

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false)

  const enable = useCallback(() => {
    startAmbient()
    setEnabled(true)
  }, [])

  const disable = useCallback(() => {
    stopAmbient()
    setEnabled(false)
  }, [])

  const toggle = useCallback(() => {
    if (enabled) disable()
    else enable()
  }, [enabled, enable, disable])

  useEffect(() => stopAmbient, [])

  return { enabled, enable, disable, toggle }
}
