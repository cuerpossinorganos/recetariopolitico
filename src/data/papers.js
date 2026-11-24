import permiso from '../assets/home/papel-permiso.webp'
import despensa from '../assets/home/papel-despensa.webp'

// Los dos papeles que salen del sobre. Cada uno se abre en grande para leerlo.
//   pose   dónde descansa dentro del sobre (en % del sobre) y cuánto se inclina respecto de él
//          cx, cy  centro del papel   ·   w  ancho   ·   rot  grados   ·   ratio  alto / ancho
//   lift   cuánto sale del sobre al abrirse (fracción del alto del papel)
//   El texto de cada papel: ambos se voltean y muestran su hoja con el diseño de las recetas
//   (PermisoSheet → data/stories/permiso.js · DespensaSheet → data/despensa.js).
export const papers = [
  {
    id: 'permiso',
    label: 'Introducción',
    title: 'Permiso de Puesto Fijo',
    image: permiso,
    pose: { cx: 54.41, cy: 24.54, w: 80, rot: -1.38, ratio: 1.31 },
    lift: 0.5,
  },
  {
    id: 'despensa',
    label: 'La despensa',
    title: 'La despensa',
    image: despensa,
    pose: { cx: 46.31, cy: 55.58, w: 67.97, rot: 9.62, ratio: 1.416 },
    lift: 0.52,
  },
]

// Medidas del sobre tal como se ve en el diseño (a 1920 px de ancho)
export const ENVELOPE = {
  ratio: 1100 / 1364, // ancho / alto de la imagen
  rot: 15.38, // inclinación de todo el sobre
  frontOpacity: 0.75, // la solapa de adelante es translúcida: se ven los papeles a través
}
