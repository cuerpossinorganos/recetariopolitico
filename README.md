# Recetario Político

Sitio web de storytelling hecho con React + Vite. Al entrar hay una intro interactiva (clic para pasar de slide) y, al terminarla, se accede a la página de inicio con la historia completa.

## Desarrollo

```bash
npm install
npm run dev     # servidor local
npm run build   # build de producción
npm run lint
```

## Estructura

- `src/data/slides.js`: textos de cada slide de la intro (mes, capítulo y bloques de texto).
- `src/data/chapters.js`: índice del libro que se muestra en el menú tipo ticket.
- `src/data/copy.js`: textos de interfaz (botones, pistas).
- `src/components/Intro/`: pantalla de carga/entrada (`Gate`), motor de slides (`Intro`), slide (`Slide`) y animación del texto por líneas (`LineReveal`).
- `src/components/Menu/`: menú de capítulos en forma de ticket.
- `src/components/Home/`: página de inicio (provisoria).
- `src/audio/` y `src/hooks/useAmbientSound.js`: sonido ambiente.
- `src/components/ui/`: logo (`Logo`) y logo con movimiento de viento para la pantalla de carga (`SwayingLogo`, WebGL; la intensidad se ajusta con `AMPLITUDE`).
- `src/assets/logo.png`: logo (PNG con transparencia); se pinta con CSS del color que haga falta.

Etapas en `src/App.jsx`: `gate` → `intro` → `home`.

## Diseño

- Tipografías: Lora (OFL) y DM Sans, empaquetadas con `@fontsource-variable`.
- Paleta: fondo `#593e0f`, cuadrícula `#4b350c`, crema `#f6dea0`, marrón del menú `#584038`.

## Controles de la intro

Clic o toque en cualquier parte, rueda del mouse, deslizar, o teclado (espacio, Enter, flechas). Si el texto aún está apareciendo, el primer gesto lo muestra completo y el siguiente avanza. Flecha izquierda o deslizar hacia abajo vuelve atrás.
