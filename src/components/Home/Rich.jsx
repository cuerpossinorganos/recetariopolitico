import { Fragment } from 'react'

// Texto con formato mínimo: **negrita**, *cursiva*, `monoespaciado` y ___ (espacio en blanco).
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|___)/g

export default function Rich({ text }) {
  return text.split(INLINE).map((part, i) => {
    if (part === '___') return <span key={i} className="story__blank" aria-hidden="true" />
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
    return <Fragment key={i}>{part}</Fragment>
  })
}
