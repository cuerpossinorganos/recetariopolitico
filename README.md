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
- `src/components/Home/`: página de inicio (`Home`), de arriba a abajo: encabezado, portada, mesa con la blonda y las 7 cards (`CardDeck`, visor que voltea y amplía la card `CardViewer`, hoja con la historia `StoryPaper`), lentes (`Glasses`, solo se mueven al pasar el puntero), "Sobre el proyecto" con el sobre y sus dos papeles (`Envelope` + `PaperViewer`) la zona Contenido con el switch día / noche (`Contents`; en la pestaña 01 de día van las recetas con filtros por categoría, `RecipeBrowser`; en la 02, la lata de galletas con sus cuatro objetos, `TinBrowser` + `Tin` + `TinSheet`; de noche, una sola pestaña con las tres historias de Sobremesa, `SobremesaBrowser`) y el pie de página con la suscripción (`SiteFooter`).
- `src/components/About/`: página aparte "Sobre el proyecto" (`AboutProject`). Su texto está en `src/data/about.js` (**pendiente**: hoy muestra un aviso). El encabezado (`Home/SiteHeader`) es el mismo en las dos páginas.
- `src/data/papers.js`: los dos papeles del sobre (imagen, posición dentro del sobre, cuánto salen al abrirse) y las medidas del sobre. Al abrirse, cada papel se voltea como una card y muestra su hoja con el diseño de las recetas: "Permiso de Puesto Fijo" (`PermisoSheet`, texto en `src/data/stories/permiso.js`, del PDF) y "La despensa" (`DespensaSheet`, texto en `src/data/despensa.js`).
- `src/data/tin.js`: la lata de galletas. Las imágenes están en `src/assets/home/lata/`. La lata CERRADA (`lata-cerrada.webp`) y la cara de cada objeto al sacarlo (`lata-<objeto>-cara.webp`) son las ilustraciones propias del cliente (de `elementos.jpg` y la lata cerrada, recortadas del fondo de papel). La lata ABIERTA se armó por capas a partir de un solo PNG (`lata de galletas.png`): cuerpo, banda, tapa y el recorte de cada objeto dentro de la lata; al abrir, la lata cerrada se funde con esas capas y la tapa se desliza. Si llegan las capas originales de la lata abierta, basta con cambiar esas imágenes y ajustar `lidClosed` / `closedShift` / `closedImage`. El texto de las cuatro hojas está en `src/data/lata.js` (de `Lata de galletas.pdf`) y se muestra con `TinSheet`; los dos planos son imágenes renderizadas del PDF (`plano-2.webp` y `plano-5.webp`, tinta sobre fondo transparente).
- `src/data/sobremesa.js`: las tres historias de la noche (La Taza, A las Once, Sin Novedad). Sus cards salieron del diseño (que estaba en versión clara): la ilustración se recortó de la captura y la etiqueta se rehízo en oscuro; las imágenes finales están en `src/assets/home/sobremesa/`. El texto de las tres historias está en el mismo archivo (`sobremesaStories`, de `sobremesa.pdf`) y se muestra con `TinSheet`. Las hojas de la lata y las de Sobremesa comparten ese componente: tipos de bloque `list`, `entries`, `prose`, `lexicon`, `plans`, `versions`, `form`, `heading` y `dialogue` (ver el comentario de `data/sobremesa.js` y `data/lata.js`).
- `src/data/footer.js` y `src/services/subscribe.js`: textos del pie de página y envío del correo. **Pendiente**: `subscribe` solo simula la respuesta, hay que conectarlo con el servicio de correo del proyecto.
- `src/data/contents.js`: lo que muestra la zona Contenido en cada modo (día / noche): pestañas, listas y minutos de lectura. **Pendiente**: la lista de la noche y la pestaña 02.
- `src/data/cards.js`: las 7 cards (número, título e imagen recortada a su silueta).
- `src/data/stories/`: la historia de cada planta (cara de atrás de la card), un archivo por planta con el texto extraído del PDF. `index.js` explica el formato (hechos, nota, ingredientes y bloques de preparación: pasos, texto corrido, teatro, dos recetas, recuadros) y los asocia con el id de cada card.
- `src/audio/` y `src/hooks/useAmbientSound.js`: sonido ambiente.
- `src/components/ui/`: logo (`Logo`) y logo con movimiento de viento para la pantalla de carga (`SwayingLogo`, WebGL; la intensidad se ajusta con `AMPLITUDE`).
- `src/assets/`: `logo.png` (vertical, intro), `logo-horizontal.svg` (portada), `monogram.svg` (encabezado y favicon), `cards/` (WebP) y `home/` (blonda con plato y cubiertos `mantel.webp`, sobre en dos capas `sobre-fondo` / `sobre-frente`, papeles, lentes). Los logos se pintan con CSS del color que haga falta.
- `public/`: favicon (`favicon.svg` con el monograma, más PNG de 32, 192 y el `apple-touch-icon`).

Etapas en `src/App.jsx`: `gate` → `intro` → `home`. Las páginas se eligen por el hash de la dirección: `#/sobre-el-proyecto` abre la página aparte (sin pasar por la intro) y cualquier otra cosa es el inicio; así funciona en cualquier hosting estático.

## Diseño

- Las cards se acomodan en abanico alrededor de la 003 (`CardDeck.jsx`: `arcRotate` / `arcLift` y las variables `--cx`, `--cy`, `--pitch-ratio` de `CardDeck.css`). Al arrastrar, el abanico rueda y la card más cercana queda en el centro.
- El inicio se maqueta con las medidas del diseño a 1920 px (`--vw` = 1/1920 del ancho de pantalla) y se reacomoda en una columna por debajo de 860 px.
- La blonda del fondo (`home/mantel.webp`) sale del diseño: se recortó con transparencia y se reconstruyó la esquina que tapaban los lentes. Para más nitidez en pantallas grandes conviene reemplazarla por la ilustración original en alta resolución.

- Tipografías: Lora (OFL) y DM Sans, empaquetadas con `@fontsource-variable`.
- Paleta: fondo `#593e0f`, cuadrícula `#4b350c`, crema `#f6dea0`, marrón del menú `#584038`.

## Controles de la intro

Clic o toque en cualquier parte, rueda del mouse, deslizar, o teclado (espacio, Enter, flechas). Si el texto aún está apareciendo, el primer gesto lo muestra completo y el siguiente avanza. Flecha izquierda o deslizar hacia abajo vuelve atrás.
