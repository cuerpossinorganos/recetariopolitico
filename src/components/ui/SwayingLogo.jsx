import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import logo from '../../assets/logo.png'
import Logo from './Logo'
import './SwayingLogo.css'

const ASPECT = 2328 / 1081 // proporción del PNG del logo

// Cuánto se mueve el trazo, como fracción del alto del logo (0.0045 ≈ 2 px en un logo de 450 px).
// Subir para más movimiento, bajar para menos.
const AMPLITUDE = 0.0045

const VERTEX = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

// Cada punto del logo se desplaza un poco según un campo de ondas lento que
// cambia con el tiempo: los trazos se ondulan como ramas con una brisa suave.
// Los extremos (los zarcillos) se mueven un poco más que el centro.
const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_aspect;
uniform float u_amp;
in vec2 v_uv;
out vec4 outColor;

vec2 wind(vec2 p, float t) {
  float a = sin(p.x * 4.0 + t * 0.50 + 1.7 * sin(p.y * 3.4 - t * 0.31));
  float b = sin(p.y * 4.6 - t * 0.43 + 1.5 * sin(p.x * 3.0 + t * 0.27));
  float c = sin((p.x * 1.3 - p.y * 1.1) * 6.0 + t * 0.71);
  float d = sin((p.x * 0.9 + p.y * 1.4) * 7.0 - t * 0.62);
  return vec2(a + 0.5 * c, b + 0.5 * d);
}

void main() {
  vec2 p = v_uv * vec2(u_aspect, 1.0);
  float edge = smoothstep(0.1, 0.6, length((v_uv - 0.5) * vec2(u_aspect, 1.0) * 0.9));
  vec2 d = wind(p, u_time) * u_amp * (0.55 + 0.45 * edge);
  outColor = texture(u_tex, v_uv + vec2(d.x / u_aspect, d.y));
}`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// Logo con movimiento suave y continuo, como ramas movidas por el viento.
// Si el navegador no soporta WebGL2, o la persona pidió reducir el movimiento,
// se muestra el logo quieto.
export default function SwayingLogo({ className = '' }) {
  const canvasRef = useRef(null)
  const [active, setActive] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vertex || !fragment) return

    const program = gl.createProgram()
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    gl.uniform1i(gl.getUniformLocation(program, 'u_tex'), 0)
    gl.uniform1f(gl.getUniformLocation(program, 'u_aspect'), ASPECT)
    gl.uniform1f(gl.getUniformLocation(program, 'u_amp'), AMPLITUDE)
    gl.clearColor(0, 0, 0, 0)

    // El canvas toma el tamaño con el que se ve (con la densidad de pantalla, hasta 2x)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const start = performance.now()
    const draw = (now) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let raf = 0
    let texture = null
    let cancelled = false
    const frame = (now) => {
      draw(now)
      raf = requestAnimationFrame(frame)
    }

    const image = new Image()
    image.onload = () => {
      if (cancelled) return
      texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      resize()
      draw(performance.now()) // primer cuadro antes de ocultar el logo quieto
      setActive(true)
      raf = requestAnimationFrame(frame)
    }
    image.src = logo

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      if (texture) gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [reduce])

  return (
    <span className={`sway ${active ? 'is-active' : ''} ${className}`}>
      <Logo className="sway__still" />
      <canvas ref={canvasRef} className="sway__canvas" aria-hidden="true" />
    </span>
  )
}
