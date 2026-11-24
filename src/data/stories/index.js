import ruda from './ruda'
import manzanilla from './manzanilla'
import chilca from './chilca'
import nachag from './nachag'
import sunfo from './sunfo'
import romero from './romero'
import mashua from './mashua'

// Historias de cada planta (la cara de atrás de la card). La clave es el id de la card en cards.js.
//
//   number, title, subtitle   encabezado (subtitleGap? = espacio extra bajo el título, en unidades)
//   facts                     recuadro lateral (rinde, origen, tiempo…). Los valores van a mano;
//                             `\n` = salto de línea
//   note                      { label, title?, paragraphs: [{ text, tight? }] }
//                             `tight: true` = renglón aparte, sin espacio en blanco antes
//   ingredients               [{ qty, name, note? }]  (la nota es opcional y va en cursiva)
//   preparation               { label?, blocks: [...] }  bloques, en este orden:
//     { type: 'steps', label?, items: [texto | { text, appendix: { title, text | [párrafos] } }] }
//                             pasos numerados a mano; '' = paso en blanco
//     { type: 'prose', paragraphs: [{ text, tight? }] }          texto corrido
//     { type: 'script', items: [{ t, text }] }                   pieza de teatro; t = label | cast
//                                                                | line | dir | act
//     { type: 'recipes', items: [{ title, by, steps }] }         dos recetas en columnas
//     { type: 'box', label?, title?, paragraphs: [texto] }       recuadro (advertencia, etc.)
//   illustration              ilustración de la sección de ingredientes (opcional)
//
// Dentro de cualquier texto: **negrita**, *cursiva*, `monoespaciado` y ___ (espacio en blanco).

export const stories = {
  'ruda-al-hilo-rojo': ruda,
  'manzanilla-dicha-dos-veces': manzanilla,
  'chilca-cortada': chilca,
  'nachag-a-nueve-dias': nachag,
  'sunfo-atado-en-tres-nudos': sunfo,
  'romero-dos-recetas': romero,
  'mashua-que-se-vende-dos-veces': mashua,
}
