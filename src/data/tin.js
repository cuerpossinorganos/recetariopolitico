import body from '../assets/home/lata/lata-cuerpo.webp'
import band from '../assets/home/lata/lata-banda.webp'
import lid from '../assets/home/lata/lata-tapa.webp'
import hoja from '../assets/home/lata/lata-hoja.webp'
import cuaderno from '../assets/home/lata/lata-cuaderno.webp'
import diccionario from '../assets/home/lata/lata-diccionario.webp'
import plano from '../assets/home/lata/lata-plano.webp'
import closedTin from '../assets/home/lata/lata-cerrada.webp'
import hojaCara from '../assets/home/lata/lata-hoja-cara.webp'
import cuadernoCara from '../assets/home/lata/lata-cuaderno-cara.webp'
import diccionarioCara from '../assets/home/lata/lata-diccionario-cara.webp'
import planoCara from '../assets/home/lata/lata-plano-cara.webp'

// Lata de galletas (pestaña 02 de día). La ilustración se separó en capas desde un solo PNG:
//   band  la lata sin contenido (para la lata cerrada)    body  la lata abierta, sin la tapa
//   lid   la tapa (se acomoda sobre la boca al cerrar)     items  los cuatro objetos, recortados
// Todo se mide en porcentaje del lienzo de la ilustración (1019 x 642 px).
export const TIN = {
  ratio: 1.58723, // ancho / alto del lienzo
  layers: { body, band, lid },
  // La tapa, cerrada: se mueve, gira y se achica un poco respecto de su sitio abierto.
  // Gira sobre su centro (lidOrigin, en porcentaje del lienzo).
  lidOrigin: [73.41, 62.62],
  lidClosed: { x: -39.843, y: -9.969, rotate: -11, scale: 0.96 },
  lidShape: [[55.54, 34.89], [52.31, 40.5], [49.17, 46.88], [47.99, 52.65], [47.89, 55.45], [48.09, 60.75], [49.75, 68.22], [52.5, 75.86], [54.37, 79.44], [58.1, 85.67], [60.75, 88.94], [67.71, 94.86], [71.64, 97.35], [76.55, 99.22], [83.02, 99.84], [86.85, 99.38], [88.22, 98.75], [89.7, 97.35], [90.58, 95.95], [90.78, 95.02], [94.7, 88.32], [97.25, 82.87], [98.82, 78.04], [99.71, 72.9], [99.9, 67.91], [99.21, 60.44], [97.45, 54.05], [94.7, 47.98], [90.87, 41.74], [85.57, 34.89], [81.75, 31.93], [77.13, 29.91], [70.76, 28.66], [65.06, 29.13], [58.98, 31.78]], // contorno de la tapa, para que solo responda donde está dibujada
  // La lata cerrada (ilustración propia, no una reconstrucción). Se pone sobre la lata armada con capas,
  // justo donde esta queda cuando la tapa está puesta, y se funde con ella al abrir.
  closedImage: {
    image: closedTin,
    left: 8.538,
    top: 24.567,
    width: 51.030,
    height: 69.713,
    shape: [[16.14, 11.7], [11.86, 15.38], [8.28, 19.55], [4.0, 26.44], [1.79, 32.21], [1.1, 38.14], [2.76, 71.31], [4.55, 75.64], [6.76, 79.33], [12.83, 85.9], [17.24, 89.26], [22.76, 92.63], [30.62, 95.99], [39.86, 98.4], [61.93, 98.56], [72.69, 95.67], [77.24, 93.91], [82.34, 91.19], [89.93, 85.42], [95.31, 78.85], [97.52, 73.56], [98.76, 45.19], [98.62, 35.58], [96.69, 29.01], [93.38, 22.44], [88.97, 16.83], [84.97, 13.14], [77.66, 8.17], [71.31, 5.29], [60.83, 2.24], [52.41, 1.28], [43.72, 1.6], [35.17, 3.04], [28.83, 4.97], [23.17, 7.37]], // contorno, para que solo responda donde está dibujada
  },
  // Al cerrar, la lata se corre a la derecha para quedar centrada (porcentaje del ancho del lienzo)
  closedShift: 15.8,
}

// Los cuatro objetos, de atrás hacia adelante (el orden de apilado de la ilustración).
//   chip    texto de la categoría que lo abre      title   título de su hoja
//   face    ilustración del objeto al sacarlo de la lata (la que se ve en grande y se voltea)
//   shape   contorno del objeto (porcentaje de su propio recuadro): el área que responde al puntero
export const TIN_ITEMS = [
  {
    id: 'plano',
    chip: 'Plano del lugar',
    title: 'Plano del lugar',
    image: plano,
    left: 33.268,
    top: 25.234,
    width: 14.328,
    height: 30.218,
    ratio: 0.7526,
    face: { image: planoCara, ratio: 0.8347, width: 112.00 }, // cómo se ve al sacarlo (width = % del recuadro)
    shape: [[20.55, 1.55], [15.07, 13.92], [13.01, 27.84], [6.16, 37.11], [2.05, 40.21], [7.53, 45.88], [16.44, 59.28], [28.08, 83.51], [36.3, 96.39], [38.36, 97.42], [43.84, 97.42], [45.89, 90.21], [42.47, 81.44], [41.1, 65.98], [50.0, 60.31], [83.56, 47.42], [95.89, 39.69], [96.58, 38.14], [84.93, 19.59], [60.27, 18.04], [29.45, 3.61]],
  },
  {
    id: 'cuaderno',
    chip: 'Técnicas',
    title: 'Técnicas',
    image: cuaderno,
    left: 18.155,
    top: 33.333,
    width: 20.805,
    height: 39.72,
    ratio: 0.8314,
    face: { image: cuadernoCara, ratio: 0.8768, width: 112.00 }, // cómo se ve al sacarlo (width = % del recuadro)
    shape: [[63.68, 1.18], [55.19, 2.35], [52.36, 4.31], [35.85, 8.63], [16.51, 16.47], [7.55, 18.04], [1.42, 21.18], [5.19, 36.08], [15.09, 55.29], [36.79, 86.27], [45.28, 96.47], [48.11, 97.65], [46.7, 95.29], [46.7, 86.27], [48.58, 83.92], [48.58, 80.78], [50.94, 76.47], [50.0, 73.33], [51.89, 72.94], [51.89, 71.37], [55.66, 66.27], [58.02, 57.65], [61.79, 53.33], [63.21, 50.2], [62.74, 46.67], [64.62, 41.96], [66.98, 41.57], [67.45, 43.14], [70.28, 43.92], [70.75, 45.1], [76.42, 44.71], [79.25, 49.41], [83.96, 49.8], [84.43, 48.63], [88.21, 48.63], [90.57, 50.2], [94.81, 50.98], [96.23, 53.33], [97.17, 53.33], [91.51, 43.92], [86.32, 30.2], [78.77, 17.65], [67.45, 1.96]],
  },
  {
    id: 'diccionario',
    chip: 'Diccionario de brujas',
    title: 'Diccionario de brujas',
    image: diccionario,
    left: 38.96,
    top: 39.252,
    width: 10.893,
    height: 22.274,
    ratio: 0.7762,
    face: { image: diccionarioCara, ratio: 0.7375, width: 106.41 }, // cómo se ve al sacarlo (width = % del recuadro)
    shape: [[56.76, 2.1], [2.7, 26.57], [4.5, 48.25], [13.51, 70.63], [22.52, 78.32], [23.42, 84.62], [25.23, 86.01], [29.73, 86.01], [34.23, 81.12], [38.74, 81.12], [39.64, 87.41], [42.34, 90.91], [45.95, 90.91], [48.65, 86.71], [52.25, 86.71], [57.66, 94.41], [62.16, 94.41], [66.67, 92.31], [69.37, 97.2], [82.88, 97.2], [83.78, 60.84], [95.5, 25.17], [85.59, 10.49]],
  },
  {
    id: 'hoja',
    chip: 'Utensilios',
    title: 'Utensilios',
    image: hoja,
    left: 27.576,
    top: 49.377,
    width: 19.333,
    height: 27.57,
    ratio: 1.113,
    face: { image: hojaCara, ratio: 1.0471, width: 105.37 }, // cómo se ve al sacarlo (width = % del recuadro)
    shape: [[21.32, 2.26], [19.29, 9.04], [19.8, 14.12], [18.27, 18.64], [14.21, 24.86], [11.68, 37.29], [7.61, 44.63], [7.61, 46.89], [5.58, 47.46], [6.6, 51.98], [4.06, 58.19], [4.06, 62.71], [2.03, 66.1], [2.03, 79.1], [6.09, 86.44], [9.14, 89.83], [17.77, 95.48], [32.49, 97.18], [59.9, 96.05], [73.6, 93.22], [79.19, 93.22], [80.2, 91.53], [82.74, 91.53], [82.74, 81.92], [91.88, 57.63], [94.42, 57.06], [97.46, 46.33], [96.95, 38.98], [95.43, 38.42], [93.91, 40.11], [91.37, 40.11], [88.32, 33.9], [86.29, 33.9], [84.77, 37.29], [82.74, 37.29], [80.71, 33.9], [80.71, 29.38], [78.17, 29.38], [76.65, 32.77], [73.1, 33.33], [71.57, 31.64], [71.07, 26.55], [64.97, 25.42], [64.47, 22.6], [63.45, 22.6], [62.44, 20.34], [54.82, 19.21], [53.3, 15.82], [48.73, 14.69], [46.19, 12.43], [42.13, 12.43], [41.62, 14.12], [36.55, 13.56], [33.5, 6.78], [27.41, 7.34], [26.9, 5.65], [23.35, 3.95], [23.35, 2.26]],
  },
]

// Orden de las categorías (chips), como en el diseño
export const TIN_CHIP_ORDER = ['hoja', 'cuaderno', 'diccionario', 'plano']
