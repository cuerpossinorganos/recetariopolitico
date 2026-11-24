import { despensa } from '../../data/despensa'
import './StoryPaper.css'
import './DespensaSheet.css'

// La hoja de "La despensa": el mismo papel, la misma letra y los mismos colores que las
// historias de las recetas (usa sus clases), con una tabla de las siete plantas.
// En pantallas angostas cada planta pasa a ser un bloque con sus datos uno debajo del otro.
export default function DespensaSheet() {
  const [cPlant, cOrigin, cNotice, cSay] = despensa.columns

  return (
    <article className="story despensa">
      <div className="story__in">
        <header className="story__head despensa__head">
          <h2 className="story__title">{despensa.title}</h2>
        </header>

        <section className="despensa__body">
          <table className="despensa__table">
            <thead>
              <tr>
                <th scope="col">{cPlant}</th>
                <th scope="col">{cOrigin}</th>
                <th scope="col">{cNotice}</th>
                <th scope="col">{cSay}</th>
              </tr>
            </thead>
            <tbody>
              {despensa.rows.map((row) => (
                <tr key={row.plant}>
                  <th scope="row" className="despensa__plant">
                    <strong>{row.plant}</strong>
                    <em>{row.latin}</em>
                  </th>
                  <td className="despensa__origin" data-label={cOrigin}>
                    {row.origin}
                  </td>
                  <td className="despensa__notice" data-label={cNotice}>
                    {row.notice}
                  </td>
                  <td className="despensa__say" data-label={cSay}>
                    {row.say}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="despensa__note">{despensa.note}</p>
        </section>

        <span className="story__grain" aria-hidden="true" />
      </div>
    </article>
  )
}
