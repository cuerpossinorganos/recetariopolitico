import permiso from '../../data/stories/permiso'
import StoryPaper from './StoryPaper'

// La hoja del "Permiso de Puesto Fijo": la historia completa, con el mismo diseño que las recetas.
const card = { number: permiso.number, title: permiso.title }

export default function PermisoSheet() {
  return <StoryPaper story={permiso} card={card} />
}
