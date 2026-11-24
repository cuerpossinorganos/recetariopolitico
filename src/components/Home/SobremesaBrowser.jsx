import { sobremesa, sobremesaSheet } from '../../data/sobremesa'
import RecipeBrowser from './RecipeBrowser'
import TinSheet from './TinSheet'

// Las historias de Sobremesa (versión de noche): las mismas cards filtrables que las recetas.
const sheetOf = (card) => <TinSheet sheet={sobremesaSheet(card)} />

export default function SobremesaBrowser() {
  return <RecipeBrowser items={sobremesa} sheetOf={sheetOf} noun="historia" />
}
