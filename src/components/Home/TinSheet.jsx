import './StoryPaper.css'
import './TinSheet.css'

// La hoja de cada objeto de la lata (lo que se lee al abrirlo). El diseño es el de las recetas;
// el contenido está pendiente (la usuaria lo enviará).
export default function TinSheet({ title }) {
  return (
    <article className="story tin-sheet">
      <div className="story__in">
        <header className="story__head tin-sheet__head">
          <p className="story__num">Lata de galletas</p>
          <h2 className="story__title">{title}</h2>
        </header>

        <section className="tin-sheet__body">
          <p className="tin-sheet__pending">El contenido de esta hoja llega pronto.</p>
        </section>

        <span className="story__grain" aria-hidden="true" />
      </div>
    </article>
  )
}
