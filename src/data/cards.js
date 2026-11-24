import img001 from '../assets/cards/001.webp'
import img002 from '../assets/cards/002.webp'
import img003 from '../assets/cards/003.webp'
import img004 from '../assets/cards/004.webp'
import img005 from '../assets/cards/005.webp'
import img006 from '../assets/cards/006.webp'
import img007 from '../assets/cards/007.webp'

// Las 7 cards de recetas, en orden. Todas comparten la misma silueta.
//   image   PNG/WebP recortado a la silueta de la card (con transparencia)
//   plant   nombre corto de la planta (etiqueta de los filtros de Contenido)
//   story   (pendiente) contenido de la cara de atrás
export const CARD_RATIO = 0.507 // ancho / alto de la card

export const cards = [
  { id: 'ruda-al-hilo-rojo', plant: 'Ruda', number: '001', title: 'Ruda al hilo rojo', image: img001 },
  { id: 'manzanilla-dicha-dos-veces', plant: 'Manzanilla', number: '002', title: 'Manzanilla, dicha dos veces', image: img002 },
  { id: 'chilca-cortada', plant: 'Chilca', number: '003', title: 'Chilca cortada antes de que salga el sol', image: img003 },
  { id: 'nachag-a-nueve-dias', plant: 'Ñachag', number: '004', title: 'Ñachag a nueve días', image: img004 },
  { id: 'sunfo-atado-en-tres-nudos', plant: 'Sunfo', number: '005', title: 'Sunfo atado en tres nudos', image: img005 },
  { id: 'romero-dos-recetas', plant: 'Romero', number: '006', title: 'Romero, dos recetas que no se reconcilian', image: img006 },
  { id: 'mashua-que-se-vende-dos-veces', plant: 'Mashua', number: '007', title: 'Mashua, que se vende dos veces', image: img007 },
]
