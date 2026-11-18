// Sonido ambiente provisorio generado con Web Audio (sin archivos).
// Para usar audio propio, reemplazar el contenido de startAmbient/stopAmbient
// por un <audio> o un AudioBufferSourceNode manteniendo la misma API.

const TARGET_GAIN = 0.12

let ctx = null
let master = null
let active = false

function build() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return false

  ctx = new AudioCtx()
  master = ctx.createGain()
  master.gain.value = 0

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 700
  master.connect(filter)
  filter.connect(ctx.destination)

  // Oscilación lenta del filtro para que el sonido respire
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.08
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 250
  lfo.connect(lfoDepth)
  lfoDepth.connect(filter.frequency)
  lfo.start()

  ;[110, 164.81, 220.5].forEach((freq) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    osc.detune.value = (Math.random() - 0.5) * 12
    osc.connect(master)
    osc.start()
  })

  return true
}

export function startAmbient() {
  if (!ctx && !build()) return
  active = true
  ctx.resume()
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.setTargetAtTime(TARGET_GAIN, ctx.currentTime, 1.5)
}

export function stopAmbient() {
  if (!ctx) return
  active = false
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.6)

  const current = ctx
  setTimeout(() => {
    if (!active && ctx === current) current.suspend()
  }, 3000)
}
